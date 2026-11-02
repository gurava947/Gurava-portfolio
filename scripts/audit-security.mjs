// The security gate CI runs before a build is allowed to ship: dependency advisories, a credential
// scan of the working tree, a credential scan of everything this repository has ever committed, and
// a check that the files a running server owns (SQLite data, logs, the production bundle) are not
// being tracked.
//
// Exits non-zero with a report. Toggles for local use:
//   AUDIT_SKIP_DEPENDENCIES=1  skip `npm audit` (an offline machine cannot reach the advisory API)
//   AUDIT_SKIP_HISTORY=1       skip the git-history sweep
import { spawn } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

// Each signature carries a JavaScript regex for the working-tree pass and a POSIX-ERE string for the
// `git grep` history pass, because git grep has no PCRE by default on every platform.
const SIGNATURES = [
  { label: "private key block", js: /-----BEGIN (?:RSA |EC |OPENSSH |PGP |DSA )?PRIVATE KEY-----/, grep: "-----BEGIN (RSA |EC |OPENSSH |PGP |DSA )?PRIVATE KEY-----" },
  { label: "AWS access key id", js: /\b(?:AK|AS)IA[0-9A-Z]{16}\b/, grep: "(AK|AS)IA[0-9A-Z]{16}" },
  { label: "GitHub token", js: /\b(?:gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,})\b/, grep: "(gh[pousr]_[A-Za-z0-9]{36}|github_pat_[A-Za-z0-9_]{40,})" },
  { label: "Slack token", js: /\bxox[baprs]-[0-9A-Za-z-]{10,}\b/, grep: "xox[baprs]-[0-9A-Za-z-]{10,}" },
  { label: "Google API key", js: /\bAIza[0-9A-Za-z_-]{35}\b/, grep: "AIza[0-9A-Za-z_-]{35}" },
  { label: "Google OAuth secret", js: /\bya23\.[A-Za-z0-9_]{30,}\b/, grep: "ya23\\.[A-Za-z0-9_]{30,}" },
  { label: "Stripe credential", js: /\b[rsp]k_(?:live|test)_[0-9A-Za-z]{20,}\b/, grep: "[rsp]k_(live|test)_[0-9A-Za-z]{20,}" },
  { label: "npm access token", js: /\bnpm_[A-Za-z0-9]{36}\b/, grep: "npm_[A-Za-z0-9]{36}" },
  { label: "OpenAI or Anthropic key", js: /\bsk-(?:ant|proj)-[A-Za-z0-9_-]{20,}\b|\bsk-[A-Za-z0-9_-]{20,}T3BlbkFJ[A-Za-z0-9_-]{20,}\b/, grep: "sk-(ant|proj)-[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{20,}T3BlbkFJ[A-Za-z0-9_-]{20,}" },
  { label: "JSON web token", js: /\beyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/, grep: "eyJ[A-Za-z0-9_-]{8,}\\.eyJ[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}" },
  { label: "Sent token in a URL", js: /[?&](?:access_token|api_key|apikey|token|secret|password)=[^&"'\s]{12,}/, grep: "[?&](access_token|api_key|apikey|token|secret|password)=[^& ]{12,}" },
];

// An assignment with a long literal behind it is how a hand-written secret usually looks. The name has
// to say secret, and the value has to be long enough that a placeholder, a CSS class or a test fixture
// does not trip it.
const GENERIC_ASSIGNMENT = /(?:api[_-]?key|apikey|secret|token|passwd|password|client[_-]?secret)["']?\s*[:=]\s*["'][^"'\s]{24,}["']/i;
const PLACEHOLDER_VALUE = /(your|example|placeholder|changeme|replace|dummy|sample|xxxx|<.*>|\.\.\.|process\.env|import\.meta|test[-_]?token|undefined|null)/i;

// Vendored third-party bundles are minified noise for every pattern above; the catalogue JSON is
// generated from the seeds and repeats project copy that reads like an assignment.
const IGNORED_PATH = /(^|[/\\])(node_modules|dist|build|coverage|\.venv|venv|__pycache__|sweep-check)[/\\]|[/\\]pyodide[^/\\]*\.(?:js|data|whl)$|^public[/\\]playground[/\\]|\.min\.(?:js|css)$|\.map$|^data[/\\]|^src[/\\]data[/\\]|package-lock\.json$|[/\\]\.git[/\\]/;
const BINARY_SUFFIX = /\.(?:png|jpe?g|gif|webp|avif|ico|bmp|tiff?|pdf|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|ogg|glb|gltf|zip|gz|tgz|whl|data|db|db-wal|db-shm|sqlite3?|pyc|so|dll|dylib|exe|node)$/i;
const MAX_FILE_BYTES = 2 * 1024 * 1024;

// Server-owned state and build output must never be in the repository: the SQLite file holds whatever
// a local session wrote, and .env by definition holds the values that must not leave the machine.
const FORBIDDEN_TRACKED = /(^|[/\\])\.env([.-]|$)|\.db(-wal|-shm)?$|\.sqlite3?$|(^|[/\\])logs?[/\\]|\.log$|^dist[/\\]|(^|[/\\])\.npmrc$|(^|[/\\])id_rsa$|\.pem$|\.key$/;

function run(command, args, options = {}) {
  return new Promise((resolveRun) => {
    const child = spawn(command, args, { cwd: ROOT, ...options });
    const chunks = [];
    const errChunks = [];
    child.stdout.on("data", (chunk) => chunks.push(chunk));
    child.stderr.on("data", (chunk) => errChunks.push(chunk));
    // A missing tool is a finding for the caller to report, not a crash for the audit itself.
    child.on("error", (error) => resolveRun({ code: 127, stdout: "", stderr: error.message }));
    child.on("close", (code) => {
      const stdout = Buffer.concat(chunks).toString("utf8");
      const stderr = Buffer.concat(errChunks).toString("utf8");
      // `npm audit` answers 1 when it finds advisories, which is information rather than a failure here.
      resolveRun({ code, stdout, stderr });
    });
  });
}

async function gitLines(args, separator = "\n") {
  const { code, stdout } = await run("git", args);
  if (code !== 0) return null;
  return stdout.split(separator).filter(Boolean);
}

// npm on Windows is a batch file, which Node only allows a shell to start. The command is assembled
// from constants in this script, so nothing external ever reaches it.
function runNpm(args) {
  if (process.platform !== "win32") return run("npm", args);
  return run(`npm ${args.join(" ")}`, [], { shell: true });
}

function mask(line) {
  const trimmed = line.trim().slice(0, 160);
  return trimmed.replace(/(["']?)([A-Za-z0-9_\-+/=]{12,})(["']?)/g, (match, open, value, close) =>
    `${open}${value.slice(0, 6)}…${value.length - 6} chars${close}`);
}

async function scanWorkingTree(findings) {
  const files = [];
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!IGNORED_PATH.test(`${relative(ROOT, path)}/`)) walk(path);
        continue;
      }
      files.push(path);
    }
  };
  walk(ROOT);

  let scanned = 0;
  for (const file of files) {
    const repoPath = relative(ROOT, file).replaceAll("\\", "/");
    if (IGNORED_PATH.test(repoPath) || BINARY_SUFFIX.test(repoPath)) continue;
    let size;
    try {
      size = statSync(file).size;
    } catch {
      continue;
    }
    if (size > MAX_FILE_BYTES) continue;
    let text;
    try {
      text = readFileSync(file, "utf8");
    } catch {
      continue;
    }
    scanned += 1;
    if (text.includes("\0")) continue;
    text.split("\n").forEach((line, index) => {
      for (const signature of SIGNATURES) {
        if (signature.js.test(line)) findings.push({ kind: `credential (${signature.label})`, repoPath, line: index + 1, text: mask(line) });
      }
      if (GENERIC_ASSIGNMENT.test(line) && !PLACEHOLDER_VALUE.test(line)) {
        findings.push({ kind: "credential (hardcoded secret-looking value)", repoPath, line: index + 1, text: mask(line) });
      }
    });
  }
  return { scanned };
}

async function scanHistory(findings) {
  const revisions = await gitLines(["rev-list", "--all"]);
  if (!revisions) return { commits: 0, skipped: "not a git repository" };
  // A shallow clone or a rewritten history still shows every commit reachable from the refs here.
  const scoped = revisions.slice(-400);
  const args = ["grep", "-I", "-n", "--no-color", "-E"];
  for (const signature of SIGNATURES) args.push("-e", signature.grep);
  args.push(...scoped, "--", ":(exclude)public/playground", ":(exclude,glob)**/pyodide*", ":(exclude,glob)*.min.js", ":(exclude)package-lock.json");
  const { code, stdout } = await run("git", args);
  if (code > 1) return { commits: scoped.length, skipped: "git grep could not run" };

  const seen = new Set();
  let hits = 0;
  for (const row of stdout.split("\n")) {
    // <revision>:<path>:<line>:<content>
    const match = /^([0-9a-f]{40}):(.+?):(\d+):(.*)$/.exec(row);
    if (!match) continue;
    const [, , repoPath, lineNumber, content] = match;
    hits += 1;
    const key = `${repoPath}:${lineNumber}`;
    if (seen.has(key)) continue;
    seen.add(key);
    findings.push({ kind: "credential in git history", repoPath, line: Number(lineNumber), text: mask(content) });
  }
  return { commits: scoped.length, hits };
}

async function scanTrackedPaths(findings) {
  const tracked = await gitLines(["ls-files", "-z"], "\0");
  if (!tracked) return { tracked: 0, skipped: "not a git repository" };
  for (const repoPath of tracked) {
    if (FORBIDDEN_TRACKED.test(repoPath)) findings.push({ kind: "exposed file tracked in git", repoPath, text: "server state, a key store or an environment file is committed" });
  }
  // A template is meant to be committed, so only a real .env (or .env.local, .env.production…) that
  // the ignore rules do not cover is a risk of accidentally publishing secrets.
  const strayEnv = readdirSync(ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile() && /^\.env(?:[.-][^.]*)?$/.test(entry.name) && !/(?:example|sample|template)$/i.test(entry.name))
    .map((entry) => entry.name);
  for (const fileName of strayEnv) {
    const { code } = await run("git", ["check-ignore", "--quiet", fileName]);
    if (code === 1) findings.push({ kind: "untracked environment file", repoPath: fileName, text: "present locally and not covered by .gitignore" });
  }
  return { tracked: tracked.length, envFiles: strayEnv.length };
}

async function auditDependencies(findings) {
  const { stdout, stderr } = await runNpm(["audit", "--json", "--omit=dev"]);
  let report;
  try {
    report = JSON.parse(stdout);
  } catch {
    findings.push({ kind: "dependency audit", repoPath: "package.json", text: (stderr || stdout || "npm audit produced no JSON").slice(0, 400) });
    return { counts: null, failed: true };
  }
  const counts = report.metadata?.vulnerabilities || {};
  const critical = (counts.critical || 0) + (counts.high || 0);
  const moderate = (counts.moderate || 0) + (counts.low || 0) + (counts.info || 0);
  if (critical > 0 || (moderate > 0 && process.env.AUDIT_ALLOW_NON_CRITICAL !== "1")) {
    findings.push({ kind: "dependency advisory", repoPath: "package.json", text: `${critical} high/critical, ${moderate} low/moderate advisory packages (npm audit --omit=dev). See \`npm audit\`.` });
  }
  return { counts };
}

const findings = [];
console.log("Security audit");
console.log("──────────────");

const dependencyRun = process.env.AUDIT_SKIP_DEPENDENCIES === "1"
  ? { skipped: "AUDIT_SKIP_DEPENDENCIES=1" }
  : await auditDependencies(findings);
console.log(`npm audit: ${dependencyRun?.skipped ? `skipped (${dependencyRun.skipped})` : `critical ${dependencyRun?.counts?.critical ?? 0}, high ${dependencyRun?.counts?.high ?? 0}, moderate ${dependencyRun?.counts?.moderate ?? 0}, low ${dependencyRun?.counts?.low ?? 0}`}`);

const trackedRun = await scanTrackedPaths(findings);
console.log(`tracked files: ${trackedRun.tracked ?? 0}${trackedRun.skipped ? ` (${trackedRun.skipped})` : ""}`);

const treeRun = await scanWorkingTree(findings);
console.log(`working tree: ${treeRun.scanned} source files scanned`);

if (process.env.AUDIT_SKIP_HISTORY !== "1") {
  const historyRun = await scanHistory(findings);
  console.log(`git history: ${historyRun.commits ?? 0} commits scanned${historyRun.skipped ? ` (${historyRun.skipped})` : ""}`);
} else {
  console.log("git history: skipped (AUDIT_SKIP_HISTORY=1)");
}

const unique = [];
const seenKeys = new Set();
for (const finding of findings) {
  const key = `${finding.kind}|${finding.repoPath}|${finding.line ?? 0}`;
  if (seenKeys.has(key)) continue;
  seenKeys.add(key);
  unique.push(finding);
}

if (!unique.length) {
  console.log("\nNo credentials, exposed files or blocking advisories found.");
  process.exit(0);
}

console.log(`\n${unique.length} finding${unique.length === 1 ? "" : "s"}:`);
for (const finding of unique) {
  console.log(`\n• ${finding.kind} — ${posix.join(".", finding.repoPath)}${finding.line ? `:${finding.line}` : ""}`);
  console.log(`  ${finding.text}`);
}
process.exit(1);
