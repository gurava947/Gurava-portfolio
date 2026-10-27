import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const bootstrapPackage = JSON.parse(readFileSync(join(projectRoot, "node_modules/bootstrap/package.json"), "utf8"));
const sourcePath = join(projectRoot, "node_modules/bootstrap/dist/css/bootstrap.min.css");
const destinationPath = join(projectRoot, "src/styles/bootstrap-shim.css");

const SOURCE_ROOTS = ["src/App.jsx", "src/index.jsx", "src/components", "src/hooks", "src/services", "src/utils", "src/config"];

function listSourceFiles(path) {
  const absolute = join(projectRoot, path);
  const stats = statSync(absolute);
  if (stats.isFile()) return [path];
  return readdirSync(absolute).flatMap((entry) => listSourceFiles(join(path, entry)));
}

const files = SOURCE_ROOTS.flatMap(listSourceFiles).filter((file) => /\.(jsx|js)$/.test(file) && !/\.test\./.test(file));

const usedClasses = new Set();
const classAttribute = /className\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\}|\{([^}]*)\})/g;
const classListCall = /classList\.(?:add|toggle)\(\s*["']([^"']+)["']/g;
for (const file of files) {
  const text = readFileSync(join(projectRoot, file), "utf8");
  for (const match of text.matchAll(classAttribute)) {
    const raw = match[1] ?? match[2] ?? match[3] ?? match[4] ?? "";
    const literal = match[4]
      ? [...raw.matchAll(/["'`]([^"'`]*)["'`]/g)].map((entry) => entry[1]).join(" ")
      : raw.replace(/\$\{[^}]*\}/g, " ");
    for (const token of literal.split(/[^A-Za-z0-9_-]+/)) {
      if (token) usedClasses.add(token);
    }
  }
  for (const match of text.matchAll(classListCall)) usedClasses.add(match[1]);
}

const classesInSelector = (selector) => [...selector.matchAll(/\.(-?[A-Za-z_][\w-]*)/g)].map((entry) => entry[1]);
const alwaysKeep = new Set(["font-face", "keyframes", "charset"]);

// Bootstrap groups element and class selectors (e.g. `h1..h6,.h1..h6`), so a rule cannot be
// kept or dropped as a whole: drop only the selectors whose classes are all unused.
function splitSelectorList(selector) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const char of selector) {
    if (char === "(") depth += 1;
    else if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
    } else current += char;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

const root = postcss.parse(readFileSync(sourcePath, "utf8"));
let kept = 0;
let dropped = 0;

function filterRules(container) {
  container.each((node) => {
    if (node.type === "rule") {
      const survivors = splitSelectorList(node.selector).filter((selector) => {
        const classes = classesInSelector(selector);
        return classes.length === 0 || classes.some((name) => usedClasses.has(name));
      });
      if (survivors.length === 0) {
        node.remove();
        dropped += 1;
      } else {
        node.selector = survivors.join(",");
        kept += 1;
      }
      return;
    }
    if (node.type === "atrule") {
      if (alwaysKeep.has(node.name) || !node.nodes) {
        kept += 1;
        return;
      }
      filterRules(node);
      if (node.nodes.length === 0) {
        node.remove();
        dropped += 1;
      }
    }
  });
}

filterRules(root);
root.walkComments((comment) => {
  if (/sourceMappingURL/.test(comment.text)) comment.remove();
});

const header = [
  `/* Filtered subset of Bootstrap ${bootstrapPackage.version} CSS.`,
  " * Keeps reboot, root variables and only the rules whose class names appear in the",
  " * main app sources; preview pages load the full stylesheet instead.",
  " * Regenerate with: npm run bootstrap:shim",
  " */",
  "",
].join("\n");
// @charset is only honoured as the first bytes of the file, so it must precede the header.
const charsetRule = root.nodes.find((node) => node.type === "atrule" && node.name === "charset");
const charset = charsetRule ? `@charset ${charsetRule.params};\n` : "";
charsetRule?.remove();
const css = charset + header + root.toString();
writeFileSync(destinationPath, css, "utf8");

const bytes = Buffer.byteLength(css);
console.log(`Bootstrap shim: ${kept} rules kept, ${dropped} removed, ${(bytes / 1024).toFixed(1)} KB from ${(readFileSync(sourcePath).length / 1024).toFixed(1)} KB.`);
