import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { createApp } from "./app.js";
import { isReachableFromOutside } from "./middleware/writeGuard.js";
import { DATABASE_NAME, DATABASE_PATH, openDatabase } from "./db/connection.js";
import { migrateDatabase } from "./db/migrate.js";
import { seedDatabase } from "./db/seed.js";
import { createProjectRepository } from "./repositories/projectRepository.js";
import { createSettingsRepository } from "./repositories/settingsRepository.js";
import { createPortfolioRepository } from "./repositories/portfolioRepository.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const database = openDatabase(DATABASE_PATH);

try {
  migrateDatabase(database);
  seedDatabase(database);
} catch (error) {
  database.close();
  throw error;
}

const appDatabase = {
  projectRepository: createProjectRepository(database),
  settingsRepository: createSettingsRepository(database),
  portfolioRepository: createPortfolioRepository(database),
};
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
// An empty API_WRITE_TOKEN keeps the guard in loopback-only mode: writes work for the owner's browser
// and stay locked the moment the server is bound to an interface other machines can reach.
const writeToken = String(process.env.API_WRITE_TOKEN || "").trim();
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT must be an integer between 1 and 65535.");
const app = createApp({ database: appDatabase, databaseName: DATABASE_NAME, bindHost: host, writeToken });

const server = app.listen(port, host, () => {
  console.log(`${packageJson.name} local API and app running at http://${host}:${port}`);
  console.log(`SQLite database "${DATABASE_NAME}" at ${DATABASE_PATH}`);
  if (writeToken) console.log("Settings writes require an API_WRITE_TOKEN bearer token; the browser page does not send one.");
  else if (isReachableFromOutside(host)) {
    console.warn(`This process is reachable from ${host}. PATCH /api/settings needs API_WRITE_TOKEN, so the page cannot write settings while it is exposed.`);
  }
});

function shutdown(signal) {
  console.log(`${signal} received; closing local server.`);
  server.close((error) => {
    database.close();
    if (error) {
      console.error("Unable to close the local server cleanly.", error);
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
