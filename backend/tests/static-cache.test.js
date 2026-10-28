import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { after, before, test } from "node:test";
import { createApp } from "../app.js";
import { DATABASE_NAME, openDatabase } from "../db/connection.js";
import { migrateDatabase } from "../db/migrate.js";
import { seedDatabase } from "../db/seed.js";
import { createProjectRepository } from "../repositories/projectRepository.js";
import { createSettingsRepository } from "../repositories/settingsRepository.js";
import { createPortfolioRepository } from "../repositories/portfolioRepository.js";

// A publish rewrites data/catalog.json in place — same URL, new bytes. These tests pin the
// response headers that decide whether a returning visitor sees the new records or a stale copy.
let database;
let server;
let baseUrl;
let staticRoot;
let previousNodeEnv;

before(async () => {
  previousNodeEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  staticRoot = join(tmpdir(), `portfolio-static-${process.pid}-${Date.now()}`);
  await mkdir(join(staticRoot, "data", "projects"), { recursive: true });
  await mkdir(join(staticRoot, "assets"), { recursive: true });
  await writeFile(join(staticRoot, "index.html"), "<!doctype html><title>Practice.folio</title>");
  await writeFile(join(staticRoot, "data", "catalog.json"), JSON.stringify({ version: 2, hello: "new" }));
  await writeFile(join(staticRoot, "data", "projects", "p-1.json"), JSON.stringify({ id: "p-1" }));
  await writeFile(join(staticRoot, "assets", "index-abcd1234.js"), "console.log(1)");

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
    staticDirectory: staticRoot,
  });
  server = createServer(app);
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server) await new Promise((resolve) => server.close(resolve));
  if (database) database.close();
  if (staticRoot) await rm(staticRoot, { recursive: true, force: true });
  if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
  else process.env.NODE_ENV = previousNodeEnv;
});

async function cacheControl(path) {
  const response = await fetch(`${baseUrl}${path}`);
  assert.equal(response.status, 200, `${path} should be served`);
  return response.headers.get("cache-control");
}

test("revalidates the catalog and project data instead of holding a stale copy", async () => {
  assert.equal(await cacheControl("/data/catalog.json"), "public, max-age=0, must-revalidate");
  assert.equal(await cacheControl("/data/projects/p-1.json"), "public, max-age=0, must-revalidate");
});

test("revalidates the HTML shell so a deploy stops serving the previous build", async () => {
  assert.equal(await cacheControl("/index.html"), "public, max-age=0, must-revalidate");
});

test("keeps content-hashed bundles immutable", async () => {
  assert.equal(await cacheControl("/assets/index-abcd1234.js"), "public, max-age=31536000, immutable");
});
