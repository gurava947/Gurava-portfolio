import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { after, before, test } from "node:test";
import { createApp } from "../app.js";
import { DATABASE_NAME, openDatabase } from "../db/connection.js";
import { migrateDatabase } from "../db/migrate.js";
import { seedDatabase } from "../db/seed.js";
import { createProjectRepository } from "../repositories/projectRepository.js";
import { createSettingsRepository } from "../repositories/settingsRepository.js";
import { createPortfolioRepository } from "../repositories/portfolioRepository.js";

// The guards around the local API are the difference between "a settings server on my laptop" and
// "a settings server anyone on my network can write to". Each test builds its own app with the bind
// address, token and budget the scenario describes, so the behaviour being pinned is the mounted
// chain in app.js rather than the middleware in isolation.
let database;
let server;
let baseUrl;

async function startApp(appOptions = {}) {
  if (server) await stopApp();
  database = openDatabase(":memory:");
  migrateDatabase(database);
  seedDatabase(database);
  const app = createApp({
    database: {
      projectRepository: createProjectRepository(database),
      settingsRepository: createSettingsRepository(database),
      portfolioRepository: createPortfolioRepository(database),
    },
    databaseName: DATABASE_NAME,
    staticDirectory: false,
    ...appOptions,
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolveListen, rejectListen) => {
    server.once("listening", resolveListen);
    server.once("error", rejectListen);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
  return baseUrl;
}

async function stopApp() {
  if (server) await new Promise((closeResolve) => server.close(closeResolve));
  server = undefined;
  if (database) database.close();
  database = undefined;
}

const patchSettings = (extraHeaders = {}) => fetch(`${baseUrl}/api/settings`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json", ...extraHeaders },
  body: JSON.stringify({ theme: { mode: "dark" } }),
});

before(async () => { await startApp(); });
after(async () => { await stopApp(); });

test("answers every response with the hardening headers and no framework banner", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  assert.equal(response.headers.get("x-powered-by"), null);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("referrer-policy"), "no-referrer");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("cross-origin-resource-policy"), "same-origin");
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
  assert.match(response.headers.get("permissions-policy"), /camera=\(\)/);
  assert.match(response.headers.get("strict-transport-security"), /max-age=63072000/);
  assert.match(response.headers.get("content-security-policy"), /^default-src 'self'/);
});

test("refuses inline and remote scripts, allowing only same-origin wasm compilation", async () => {
  const policy = (await fetch(`${baseUrl}/api/health`)).headers.get("content-security-policy");
  const directives = new Map(policy.split("; ").map((entry) => [entry.slice(0, entry.indexOf(" ")), entry.slice(entry.indexOf(" ") + 1)]));
  assert.equal(directives.get("default-src"), "'self'");
  assert.equal(directives.get("object-src"), "'none'");
  assert.equal(directives.get("base-uri"), "'self'");
  assert.equal(directives.get("form-action"), "'self'");
  assert.equal(directives.get("frame-ancestors"), "'self'");
  assert.equal(directives.get("worker-src"), "'self' blob:");
  // The Pyodide bundle is committed under public/playground/pyodide, so no executable code and no
  // runtime fetch needs a third-party origin. 'wasm-unsafe-eval' is the only concession.
  assert.equal(directives.get("script-src"), "'self' 'wasm-unsafe-eval'");
  assert.equal(directives.get("connect-src"), "'self'");
});

test("keeps the local Content-Security-Policy identical to the one Vercel serves", async () => {
  const vercel = JSON.parse(readFileSync(resolve(import.meta.dirname, "..", "..", "vercel.json"), "utf8"));
  const globalHeaders = vercel.headers.find((entry) => entry.source === "/(.*)").headers;
  const vercelPolicy = globalHeaders.find((entry) => entry.key === "Content-Security-Policy").value;
  assert.equal((await fetch(`${baseUrl}/api/health`)).headers.get("content-security-policy"), vercelPolicy);
});

test("budgets reads and writes separately and says when to retry", async () => {
  await startApp({ rateLimit: { read: 2, write: 1 } });
  assert.equal((await fetch(`${baseUrl}/api/health`)).status, 200);
  assert.equal((await fetch(`${baseUrl}/api/health`)).status, 200);

  const blocked = await fetch(`${baseUrl}/api/health`);
  assert.equal(blocked.status, 429);
  assert.equal((await blocked.json()).error.code, "RATE_LIMITED");
  assert.match(blocked.headers.get("retry-after"), /^\d+$/);

  assert.equal((await patchSettings()).status, 200);
  const blockedWrite = await patchSettings();
  assert.equal(blockedWrite.status, 429);
  assert.equal((await blockedWrite.json()).error.code, "RATE_LIMITED");
});

test("does not let a forged forwarded-for header buy a fresh read budget", async () => {
  await startApp({ rateLimit: { read: 2 } });
  for (const client of ["203.0.113.7", "198.51.100.9"]) {
    assert.equal((await fetch(`${baseUrl}/api/health`, { headers: { "X-Forwarded-For": client } })).status, 200);
  }
  const stillSameClient = await fetch(`${baseUrl}/api/health`, { headers: { "X-Forwarded-For": "203.0.113.7" } });
  assert.equal(stillSameClient.status, 429);
});

test("locks writes while the server is bound somewhere reachable from outside", async () => {
  await startApp({ bindHost: "0.0.0.0" });
  assert.equal((await fetch(`${baseUrl}/api/health`)).status, 200);
  const locked = await patchSettings();
  assert.equal(locked.status, 403);
  assert.equal((await locked.json()).error.code, "WRITE_LOCKED");

  await startApp({ bindHost: "localhost" });
  assert.equal((await patchSettings()).status, 200);
});

test("requires the configured bearer token before it will change settings", async () => {
  await startApp({ bindHost: "0.0.0.0", writeToken: "local-dev-secret" });

  const missing = await patchSettings();
  assert.equal(missing.status, 401);
  assert.equal((await missing.json()).error.code, "UNAUTHORIZED");

  const wrong = await patchSettings({ Authorization: "Bearer local-dev-secre" });
  assert.equal(wrong.status, 401);

  const wrongScheme = await patchSettings({ Authorization: "Basic bG9jYWwtZGV2LXNlY3JldA==" });
  assert.equal(wrongScheme.status, 401);

  const accepted = await patchSettings({ Authorization: "Bearer local-dev-secret" });
  assert.equal(accepted.status, 200);
  assert.equal((await accepted.json()).data.theme.mode, "dark");
});

test("accepts the Origin of the page it serves and rejects every other one", async () => {
  await startApp();

  const crossSite = await patchSettings({ Origin: "https://evil.example" });
  assert.equal(crossSite.status, 403);
  assert.equal((await crossSite.json()).error.code, "FORBIDDEN_ORIGIN");

  // A host that resolves to loopback but is not the loopback interface is a different site identity.
  const lookalike = await patchSettings({ Origin: "http://127.0.0.1.nip.io:3000" });
  assert.equal(lookalike.status, 403);
  assert.equal((await lookalike.json()).error.code, "FORBIDDEN_ORIGIN");

  // An opaque origin (file:// or a sandboxed frame) has no host and is refused.
  const opaque = await patchSettings({ Origin: "null" });
  assert.equal(opaque.status, 403);

  const sameOrigin = await patchSettings({ Origin: baseUrl });
  assert.equal(sameOrigin.status, 200);

  // Vite runs the page on 3000 and proxies /api to 3001 with changeOrigin, so the Host header the API
  // sees is not the page's port. The host identity still matches, so the write is accepted.
  const throughVite = await patchSettings({ Origin: "http://127.0.0.1:3000" });
  assert.equal(throughVite.status, 200);
  const throughLocalhostSpelling = await patchSettings({ Origin: "http://localhost:5173" });
  assert.equal(throughLocalhostSpelling.status, 200);
});

test("matches a public origin against the host the request is answered on", async () => {
  await startApp();

  const forwarded = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://portfolio.example",
      "X-Forwarded-Host": "portfolio.example",
    },
    body: JSON.stringify({ animation: { scrollReveal: true } }),
  });
  assert.equal(forwarded.status, 200);

  const wrongPublicOrigin = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://attacker.example",
      "X-Forwarded-Host": "portfolio.example",
    },
    body: JSON.stringify({ animation: { scrollReveal: true } }),
  });
  assert.equal(wrongPublicOrigin.status, 403);
  assert.equal((await wrongPublicOrigin.json()).error.code, "FORBIDDEN_ORIGIN");
});

test("refuses an oversized settings body without evaluating it", async () => {
  await startApp({ rateLimit: { write: 50 } });
  const oversized = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardUI: { fontFamily: "a".repeat(64 * 1024) } }),
  });
  assert.equal(oversized.status, 413);
  assert.equal((await oversized.json()).error.code, "PAYLOAD_TOO_LARGE");
});

test("keeps an unknown API route out of the app shell and off the write surface", async () => {
  const unknown = await fetch(`${baseUrl}/api/nope`);
  assert.equal(unknown.status, 404);
  assert.equal((await unknown.json()).error.code, "NOT_FOUND");

  const unknownWrite = await fetch(`${baseUrl}/api/nope`, { method: "DELETE" });
  assert.equal(unknownWrite.status, 404);
});
