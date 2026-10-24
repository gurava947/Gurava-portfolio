import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { createApp } from "../app.js";
import { DATABASE_NAME, openDatabase } from "../db/connection.js";
import { migrateDatabase } from "../db/migrate.js";
import { seedDatabase, projectSeed } from "../db/seed.js";
import { createProjectRepository } from "../repositories/projectRepository.js";
import { createSettingsRepository } from "../repositories/settingsRepository.js";
import { createPortfolioRepository } from "../repositories/portfolioRepository.js";

let database;
let server;
let baseUrl;

beforeEach(async () => {
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
  });
  server = app.listen(0, "127.0.0.1");
  await new Promise((resolve, reject) => {
    server.once("listening", resolve);
    server.once("error", reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
  if (server) await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  server = undefined;
  if (database) database.close();
  database = undefined;
});

test("seeds the Python Playground catalog and remains idempotent", () => {
  const count = database.prepare("SELECT count(*) AS total FROM projects").get().total;
  assert.equal(count, 1);
  assert.deepEqual(projectSeed.map((project) => project.id), ["python-playground"]);
  seedDatabase(database);
  assert.equal(database.prepare("SELECT count(*) AS total FROM projects").get().total, 1);
  assert.equal(database.prepare("SELECT count(*) AS total FROM projects WHERE id = 'python-playground'").get().total, 1);
  assert.equal(database.prepare("SELECT count(*) AS total FROM projects WHERE id = 'obsolete-static-seed'").get().total, 0);
  assert.equal(database.prepare("SELECT count(*) AS total FROM project_technologies").get().total, projectSeed.reduce((sum, project) => sum + project.technologies.length, 0));
});

test("upgrades a version-one database to normalized categories without losing data", () => {
  database.exec(`
    DROP TRIGGER projects_category_id_required_insert;
    DROP TRIGGER projects_category_id_required_update;
    DROP INDEX idx_projects_category_id;
    ALTER TABLE projects DROP COLUMN category_id;
    ALTER TABLE card_settings DROP COLUMN max_width;
    ALTER TABLE card_settings DROP COLUMN min_height;
    ALTER TABLE card_settings DROP COLUMN mobile_image_height;
    ALTER TABLE card_settings DROP COLUMN tablet_image_height;
    ALTER TABLE card_settings DROP COLUMN desktop_image_height;
    ALTER TABLE card_settings DROP COLUMN hover_highlight;
    ALTER TABLE card_settings DROP COLUMN border_top_color;
    ALTER TABLE card_settings DROP COLUMN border_right_color;
    ALTER TABLE card_settings DROP COLUMN border_bottom_color;
    ALTER TABLE card_settings DROP COLUMN border_left_color;
    PRAGMA user_version = 1;
  `);

  migrateDatabase(database);

  assert.equal(database.prepare("PRAGMA user_version").get().user_version, 3);
  assert.equal(database.prepare("SELECT count(*) AS total FROM projects").get().total, 1);
  assert.equal(database.prepare("SELECT count(*) AS total FROM projects WHERE category_id IS NULL").get().total, 0);
  assert.deepEqual(database.prepare("PRAGMA foreign_key_check").all(), []);
  assert.ok(database.prepare("PRAGMA table_info(card_settings)").all().some((column) => column.name === "max_width"));
  assert.ok(database.prepare("PRAGMA table_info(card_settings)").all().some((column) => column.name === "mobile_image_height"));
});

test("upgrades a version-two database with safe responsive card heights", () => {
  database.exec(`
    ALTER TABLE card_settings DROP COLUMN mobile_image_height;
    ALTER TABLE card_settings DROP COLUMN tablet_image_height;
    ALTER TABLE card_settings DROP COLUMN desktop_image_height;
    PRAGMA user_version = 2;
  `);

  migrateDatabase(database);

  const settings = database.prepare("SELECT mobile_image_height, tablet_image_height, desktop_image_height FROM card_settings WHERE id = 1").get();
  assert.equal(database.prepare("PRAGMA user_version").get().user_version, 3);
  assert.deepEqual({ ...settings }, {
    mobile_image_height: 150,
    tablet_image_height: 175,
    desktop_image_height: 190,
  });
});

test("returns the Python Playground catalog and its Python category", async () => {
  const response = await fetch(`${baseUrl}/api/projects?limit=20`);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.data.total, 1);
  assert.equal(result.data.items.length, 1);
  const project = result.data.items[0];
  assert.equal(project.id, "python-playground");
  assert.equal(project.title, "Python Playground");
  assert.equal(project.category_name, "Python");
  assert.equal(project.component_key, "python-playground");
  assert.equal(project.data.initialCode, "text = input()\nprint(text)\n");
  assert.equal(project.data.tests.cases[0].input, "Hello World");
  assert.equal(project.data.tests.cases[0].expectedOutput, "Hello World");
  assert.deepEqual(project.technologies, ["Python 3.10", "JavaScript", "Pyodide", "Test cases"]);

  const noMatch = await fetch(`${baseUrl}/api/projects?q=azure&limit=20`);
  assert.equal((await noMatch.json()).data.total, 0);

  const match = await fetch(`${baseUrl}/api/projects?q=playground`);
  assert.equal((await match.json()).data.total, 1);

  const categoriesResponse = await fetch(`${baseUrl}/api/categories`);
  const categories = await categoriesResponse.json();
  assert.deepEqual(categories.data, [{ name: "Python", display_order: 0 }]);
});

test("serves the Python Playground with theme, certificate, and profile settings from local SQLite", async () => {
  const response = await fetch(`${baseUrl}/api/portfolio`);
  assert.equal(response.status, 200);
  const portfolio = (await response.json()).data;
  assert.equal(portfolio.totalProjects, 1);
  assert.equal(portfolio.projects.length, 1);
  const project = portfolio.projects[0];
  assert.equal(project.id, "python-playground");
  assert.equal(project.route, "/projects/python-playground");
  assert.equal(project.categoryFilter, "Python");
  assert.equal(project.categorySlug, "python");
  assert.equal(project.data.initialCode, "text = input()\nprint(text)\n");
  assert.equal(project.data.tests.cases[0].input, "Hello World");
  assert.equal(project.data.tests.cases[0].expectedOutput, "Hello World");
  assert.deepEqual(portfolio.categories, [{ label: "Python", slug: "python" }]);
  assert.deepEqual(portfolio.devices, []);
  assert.equal(portfolio.settings.profile.defaultValues.email, "guravak947@gmail.com");
  assert.equal(portfolio.certificates.length, 1);
  const certificate = portfolio.certificates[0];
  assert.equal(certificate.courseTitle, "Programming Foundations with Python");
  assert.equal(certificate.certificateId, "EIZVZKKIMS");
  assert.equal(certificate.route, "/certificates/programming-foundations-with-python");
  assert.equal(certificate.issueDate, "April 29, 2026");
  assert.equal(certificate.performance.length, 4);
  assert.equal(certificate.performance.find((item) => item.key === "score").value, "206/210");
  assert.equal(certificate.performance.find((item) => item.key === "percentage").value, "98.1%");
  assert.equal(certificate.attempts.length, 1);
  assert.equal(certificate.attempts[0].result, "Excellent");
  assert.equal(certificate.topics.length, 5);
  const certificateNavigation = portfolio.navigation.find((item) => item.slot === "certificate");
  assert.equal(certificateNavigation.label, "Certificates");
  assert.equal(certificateNavigation.href, certificate.route);
  assert.ok(portfolio.theme.presets.dark);
});

test("seeds card appearance defaults to match the static reference", async () => {
  const response = await fetch(`${baseUrl}/api/settings`);
  assert.equal(response.status, 200);
  const { cardUI } = (await response.json()).data;
  assert.equal(cardUI.radius, 22);
  assert.equal(cardUI.borderColor, "#c8d1c1");
  assert.equal(cardUI.backgroundColor, "theme");
  assert.equal(cardUI.textColor, "theme");
  assert.equal(cardUI.fontFamily, "arial");
  assert.equal(cardUI.mobileImageHeight, 160);
  assert.equal(cardUI.hoverHighlight, "medium");
  assert.equal(cardUI.transitionDuration, 275);
  assert.equal(cardUI.transitionEasing, "standard");
});

test("validates settings patches, persists accepted values and rejects unsafe values", async () => {
  const accepted = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cardUI: {
        radius: 18,
        backgroundColor: "theme",
        textColor: "theme",
        fontFamily: "georgia",
        maxWidth: 460,
        mobileImageHeight: 160,
        tabletImageHeight: 185,
        desktopImageHeight: 205,
      },
      animation: { scrollReveal: true, entranceIntensity: "subtle" },
    }),
  });
  assert.equal(accepted.status, 200);
  const settings = (await accepted.json()).data;
  assert.equal(settings.cardUI.topLeftRadius, 18);
  assert.equal(settings.cardUI.maxWidth, 460);
  assert.equal(settings.cardUI.mobileImageHeight, 160);
  assert.equal(settings.cardUI.tabletImageHeight, 185);
  assert.equal(settings.cardUI.desktopImageHeight, 205);
  assert.equal(settings.cardUI.fontFamily, "georgia");
  assert.equal(settings.animation.scrollReveal, true);

  seedDatabase(database);
  const afterReseed = await fetch(`${baseUrl}/api/settings`);
  const reseededSettings = (await afterReseed.json()).data.cardUI;
  assert.equal(reseededSettings.maxWidth, 460);
  assert.equal(reseededSettings.mobileImageHeight, 160);

  const rejected = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardUI: { fontFamily: "url(javascript:alert(1))" } }),
  });
  assert.equal(rejected.status, 400);
  assert.equal((await rejected.json()).error.code, "REQUEST_ERROR");

  const outOfRangeHeight = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardUI: { mobileImageHeight: 999 } }),
  });
  assert.equal(outOfRangeHeight.status, 400);

  const invalidContrast = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardUI: { backgroundColor: "#ffffff", textColor: "#fefefe" } }),
  });
  assert.equal(invalidContrast.status, 400);
});

test("updates theme-following card colors when only the theme mode changes", async () => {
  const response = await fetch(`${baseUrl}/api/settings`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ theme: { mode: "dark" } }),
  });
  assert.equal(response.status, 200);
  const settings = (await response.json()).data;
  assert.equal(settings.theme.mode, "dark");
  assert.equal(settings.cardUI.backgroundColor, "theme");
  assert.equal(settings.cardUI.textColor, "theme");
  assert.equal(settings.cardUI.borderTopColor, "theme");
});

test("returns bounded client errors and no internal exception details", async () => {
  const invalidLimit = await fetch(`${baseUrl}/api/projects?limit=100000`);
  assert.equal(invalidLimit.status, 400);
  const missingProject = await fetch(`${baseUrl}/api/projects/does-not-exist`);
  assert.equal(missingProject.status, 404);
  assert.deepEqual((await missingProject.json()).error, {
    code: "REQUEST_ERROR",
    message: "Project not found.",
  });
});
