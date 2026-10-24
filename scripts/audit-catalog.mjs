import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const catalog = JSON.parse(readFileSync(join(ROOT, "public/data/catalog.json"), "utf8"));
const staticSeed = JSON.parse(readFileSync(join(ROOT, "catalog/source/projects-static.json"), "utf8"));
const responsiveSeed = JSON.parse(readFileSync(join(ROOT, "catalog/source/projects-responsive.json"), "utf8"));
const pythonSeed = JSON.parse(readFileSync(join(ROOT, "backend/db/projects/python-playground.json"), "utf8"));
const seeds = new Map([pythonSeed, ...responsiveSeed, ...staticSeed].map((seed) => [seed.id, seed]));

const issues = [];
const add = (level, id, field, message) => issues.push({ level, id, field, message });
const required = ["id", "title", "description", "category", "collectionLabel", "collection", "previewType", "route", "imageAlt", "practiceLabel"];
const ids = new Set();
const routes = new Set();
const detailFiles = new Set(readdirSync(join(ROOT, "public/data/projects")).map((file) => file.replace(/\.json$/, "")));

const httpAssets = (value, path = "data") => {
  if (typeof value === "string") {
    if (/^https?:\/\/(d2clawv67efefq\.cloudfront\.net|assets\.ccbp\.in|new-assets\.ccbp\.in|media-content\.ccbp\.in)\//.test(value)) {
      add("warn", "catalog", path, `Remote supplied asset URL remains: ${value.slice(0, 110)}`);
    }
    return;
  }
  if (Array.isArray(value)) return value.forEach((entry, index) => httpAssets(entry, `${path}[${index}]`));
  if (value && typeof value === "object") Object.entries(value).forEach(([key, entry]) => httpAssets(entry, `${path}.${key}`));
};

for (const project of catalog.projects) {
  const id = project.id;
  if (ids.has(id)) add("error", id, "id", "Duplicate project id");
  ids.add(id);
  if (routes.has(project.route)) add("error", id, "route", "Duplicate route");
  routes.add(project.route);
  for (const field of required) {
    if (!project[field]) add("error", id, field, `Missing ${field}`);
  }
  if (!Array.isArray(project.technologies) || project.technologies.length === 0) {
    add("error", id, "technologies", "No technologies listed");
  }
  if (!Array.isArray(project.technologies) || new Set(project.technologies).size !== project.technologies.length) {
    add("error", id, "technologies", "Duplicate technologies");
  }
  if (project.previewType === "react") {
    if (!project.previewModule) add("error", id, "previewModule", "React project without preview module");
    if (!project.deviceSet) add("error", id, "deviceSet", "React project without device set");
  }
  if (project.previewType === "python" && project.thumbnail) add("error", id, "thumbnail", "Python project should not have a generated thumbnail");
  if (project.thumbnail) {
    const file = join(ROOT, "public", project.thumbnail.replace(/^\//, ""));
    if (!existsSync(file)) add("error", id, "thumbnail", `Thumbnail missing: ${project.thumbnail}`);
  } else if (project.previewType !== "python") {
    add("error", id, "thumbnail", "No thumbnail for a React project");
  }
  if (project.image) {
    const file = join(ROOT, "public", project.image.replace(/^\//, ""));
    if (!existsSync(file)) add("error", id, "image", `Image missing: ${project.image}`);
  }
  if (!detailFiles.has(id)) add("error", id, "detail", "Detail JSON missing");
  else {
    const detail = JSON.parse(readFileSync(join(ROOT, "public/data/projects", `${id}.json`), "utf8"));
    for (const field of ["title", "description", "category", "collection", "previewType", "route", "thumbnail"]) {
      if (detail[field] !== project[field]) add("error", id, field, `Summary/detail mismatch: ${JSON.stringify(project[field])} vs ${JSON.stringify(detail[field])}`);
    }
    if (!detail.data || typeof detail.data !== "object") add("error", id, "detail.data", "Missing project data object");
    httpAssets(detail.data, "data");
  }
  const seed = seeds.get(id);
  if (!seed) {
    add("error", id, "source", "No source seed for project");
  } else {
    for (const [seedKey, catKey] of [["title", "title"], ["description", "description"], ["category", "category"], ["image_alt", "imageAlt"]]) {
      if (seed[seedKey] !== project[catKey]) add("error", id, catKey, `Source mismatch (${seedKey}): ${JSON.stringify(seed[seedKey])} vs ${JSON.stringify(project[catKey])}`);
    }
    const seedTech = Array.isArray(seed.technologies) ? seed.technologies : [];
    if (JSON.stringify(seedTech) !== JSON.stringify(project.technologies)) add("error", id, "technologies", "Technologies differ from source seed");
  }
}

for (const id of detailFiles) if (!ids.has(id)) add("error", id, "detail", "Orphan detail JSON without catalog project");
for (const id of seeds.keys()) if (!ids.has(id)) add("error", id, "catalog", "Source seed not included in catalog");

if (catalog.counts.projects !== catalog.projects.length) add("error", "catalog", "counts.projects", "Project count mismatch");
for (const collection of catalog.collections) {
  const actual = catalog.projects.filter((project) => project.collection === collection.id).length;
  if (collection.count !== actual) add("error", collection.id, "count", `Collection count ${collection.count} vs actual ${actual}`);
  if (catalog.counts.collections[collection.id] !== actual) add("error", collection.id, "counts.collections", "Collection counts mismatch");
}

for (const category of catalog.categories) {
  const actual = catalog.projects.filter((project) => project.category === category.label).length;
  if (category.count !== actual) add("error", category.slug, "count", `Category count ${category.count} vs actual ${actual}`);
}

for (const technology of catalog.technologies) {
  const actual = catalog.projects.filter((project) => project.technologies.includes(technology.label)).length;
  if (technology.count !== actual) add("error", technology.label, "count", `Technology count ${technology.count} vs actual ${actual}`);
}

const duplicateTitles = Object.entries(catalog.projects.reduce((acc, project) => {
  acc[project.title] = (acc[project.title] || 0) + 1;
  return acc;
}, {})).filter(([, count]) => count > 1);
for (const [title] of duplicateTitles) add("warn", title, "title", "Duplicate project title");

const summaries = catalog.projects.reduce((acc, project) => {
  acc[project.collection] = (acc[project.collection] || 0) + 1;
  return acc;
}, {});

const countsByLevel = issues.reduce((acc, issue) => {
  acc[issue.level] = (acc[issue.level] || 0) + 1;
  return acc;
}, {});

console.log(JSON.stringify({
  projects: catalog.projects.length,
  details: detailFiles.size,
  seeds: seeds.size,
  byCollection: summaries,
  certificates: catalog.certificates.length,
  categories: catalog.categories.length,
  technologies: catalog.technologies.length,
  countsByLevel,
  issues,
}, null, 2));
if ((countsByLevel.error || 0) > 0) process.exitCode = 1;
