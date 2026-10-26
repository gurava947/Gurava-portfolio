import { createHash } from "node:crypto";
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import sharp from "sharp";

const ROOT = resolve(".");
const SOURCE = join(ROOT, "catalog", "source");
const PUBLIC = join(ROOT, "public");
const DATA_ROOT = join(PUBLIC, "data");
const ASSET_ROOT = join(PUBLIC, "assets");
const COMPONENT_TARGET = join(ROOT, "src", "projects");

const REMOTE_ASSET_PATTERN = /^https?:\/\/(d2clawv67efefq\.cloudfront\.net|assets\.ccbp\.in|new-assets\.ccbp\.in|media-content\.ccbp\.in)\//;
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif", ".svg"]);
const RESIZABLE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const MAX_FULL_WIDTH = 1680;
const MAX_THUMB_WIDTH = 1080;

const staticProjects = JSON.parse(readFileSync(join(SOURCE, "projects-static.json"), "utf8"));
const responsiveProjects = JSON.parse(readFileSync(join(SOURCE, "projects-responsive.json"), "utf8"));
const responsiveMetadata = JSON.parse(readFileSync(join(SOURCE, "metadata-responsive.json"), "utf8"));
const site = JSON.parse(readFileSync(join(SOURCE, "site.json"), "utf8"));
const certificates = JSON.parse(readFileSync(join(SOURCE, "certificates.json"), "utf8"));
const pythonProject = JSON.parse(readFileSync(join(ROOT, "backend", "db", "projects", "python-playground.json"), "utf8"));

const staticModules = {
  TodoList: ["TodoList/index.jsx"],
  ChatData: ["Chat/index.jsx"],
  CodingPractice: ["CodingPractice/index.jsx"],
  FoodOrder: ["FoodOrder/index.jsx"],
  BootstrapBackgroundButtons: ["BootstrapBackgroundButtons/index.jsx"],
  AdvancedTechnologies: ["AdvancedTechnologies/index.jsx"],
  NewsPage: ["NewsPage/index.jsx"],
  HotelBooking: ["HotelBooking/index.jsx"],
  CricketerPage: ["CricketerPage/index.jsx"],
  CovidCare: ["CovidCare/index.jsx"],
  GoaPage: ["GoaPage/index.jsx"],
  MobileSpecifications: ["MobileSpecifications/index.jsx"],
  ConferencePage: ["ConferencePage/index.jsx"],
  QuizQuestion: ["QuizQuestion/index.jsx"],
  PodcastPage: ["PodcastPage/index.jsx"],
  MusicPage: ["MusicPage/MusicPage.jsx"],
  BookStore: ["BookStore/index.jsx"],
  MyProjects: ["MyProjects/index.jsx"],
  FavoriteStores: ["FavoriteStores/index.jsx"],
  Foundations: ["Foundations/index.jsx"],
  YogaPage: ["YogaPage/index.jsx"],
  FlatsPage: ["FlatsPage/index.jsx"],
  ArticlesPage: ["ArticlesPage/index.jsx"],
  IntroductionHtmlCss: ["IntroductionHtmlCss/IntroductionHtmlCss.jsx"],
  CssBoxModel: ["CssBoxModel/CssBoxModel.jsx"],
  ScubaDiving: ["ScubaDiving/ScubaDiving.jsx"],
  ViewportWidth: ["ViewportWidth/ViewportWidth.jsx"],
  ViewportHeight: ["ViewportHeight/ViewportHeight.jsx"],
  BoxModelButtons: ["BoxModelButtons/BoxModelButtons.jsx"],
  ViewportWidthScale: ["ViewportWidthScale/ViewportWidthScale.jsx"],
  FlexboxProperties1: ["FlexboxProperties1/index.jsx"],
  FlexboxProperties2: ["FlexboxProperties2/index.jsx"],
  HtmlImages: ["HtmlImages/index.jsx"],
  CssBoxModelMargin: ["CssBoxModelMargin/index.jsx"],
  BootstrapCarousels: ["BootstrapCarousels/index.jsx"],
  BootstrapEmbed: ["BootstrapEmbed/index.jsx"],
  AnimalsIntegration: ["AnimalsIntegration/index.jsx"],
  HobbiesLists: ["HobbiesLists/index.jsx"],
  HtmlHyperlinks: ["HtmlHyperlinks/index.jsx"],
};

const responsiveModules = {
  "responsive-color-palette": ["ResponsiveColorPalette/index.jsx"],
  "food-munch-navbar": ["FoodMunchNavbar/index.jsx"],
  "profile-page": ["ProfilePage/index.jsx"],
  "todo-list": ["TodoList/index.jsx"],
  "css-type-selector": ["CssTypeSelector/index.jsx"],
  "specificity-practice-four": ["SpecificityPracticeFour/index.jsx"],
  "custom-navbar": ["CustomNavbar/index.jsx"],
  "specificity-practice-five": ["SpecificityPracticeFive/index.jsx"],
  "specificity-practice-six": ["SpecificityPracticeSix/index.jsx"],
  "vr-website-navbar-banner": ["VrWebsiteNavbarBanner/index.jsx"],
  "vr-website-features": ["VrWebsiteFeatures/index.jsx"],
  "vr-website-kit": ["VrWebsiteKit/index.jsx"],
  "vr-website-contact-us-section": ["VrWebsiteContactUsSection/index.jsx"],
  "vr-website-products": ["VrWebsiteProducts/index.jsx"],
  "vr-website-footer-section": ["VrWebsiteFooterSection/index.jsx"],
  "portfolio-website-navbar-banner": ["PortfolioWebsiteNavbarBanner/index.jsx"],
  "portfolio-about-me-skills": ["PortfolioPracticeSections/index.jsx", "PortfolioAboutMeSkills"],
  "portfolio-projects-section": ["PortfolioPracticeSections/index.jsx", "PortfolioProjectsSection"],
  "portfolio-services-section": ["PortfolioPracticeSections/index.jsx", "PortfolioServicesSection"],
  "portfolio-work-done-section": ["PortfolioPracticeSections/index.jsx", "PortfolioWorkDoneSection"],
  "portfolio-testimonials-section": ["PortfolioPracticeSections/index.jsx", "PortfolioTestimonialsSection"],
  "portfolio-footer-section": ["PortfolioPracticeSections/index.jsx", "PortfolioFooterSection"],
  "ecommerce-website-navbar-banner": ["EcommerceWebsiteNavbarBanner/index.jsx"],
  "responsive-features-section": ["ResponsiveCourseSections/index.jsx", "ResponsiveFeaturesSection"],
  "responsive-tools-section": ["ResponsiveCourseSections/index.jsx", "DesignToolsSection"],
  "responsive-design-deliver-section": ["ResponsiveCourseSections/index.jsx", "DesignDeliverSection"],
  "responsive-logos-section": ["ResponsiveCourseSections/index.jsx", "LogosSection"],
  "design-tool-navbar-banner": ["ResponsiveCourseSections/index.jsx", "DesignToolNavbarBanner"],
  "ecommerce-footer-section": ["ResponsiveCourseSections/index.jsx", "EcommerceFooterSection"],
  "ecommerce-contact-us-section": ["ResponsiveCourseSections/index.jsx", "EcommerceContactUsSection"],
  "ecommerce-explore-section": ["ResponsiveCourseSections/index.jsx", "EcommerceExploreSection"],
  "ecommerce-trending-blogs-section": ["ResponsiveCourseSections/index.jsx", "EcommerceTrendingBlogsSection"],
  "ecommerce-offers-section": ["ResponsiveCourseSections/index.jsx", "EcommerceOffersSection"],
  "ecommerce-products-section": ["ResponsiveCourseSections/index.jsx", "EcommerceProductsSection"],
  "ecommerce-services-section": ["ResponsiveCourseSections/index.jsx", "EcommerceServicesSection"],
};

const staticDevices = [
  { id: "small", label: "Phone", range: "< 768px", width: 360, height: 640, frameBorder: 7 },
  { id: "medium", label: "Tablet", range: "≥ 768px", width: 768, height: 1024, frameBorder: 6 },
  { id: "large", label: "Desktop", range: "≥ 1200px", width: 1200, height: 760, frameBorder: 2 },
];

const responsiveDevices = responsiveMetadata.devices.map((device) => ({
  ...device,
  label: device.label.replace("Extra Small", "Phone").replace("Extra Large", "Wide"),
}));

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shortHash(value) {
  return createHash("sha1").update(value).digest("hex").slice(0, 8);
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function collectRemoteUrls(value, output) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/https?:\/\/[^\s"'<>)\]]+/g)) {
      const url = match[0].replace(/[,;]$/, "");
      if (REMOTE_ASSET_PATTERN.test(url)) output.add(url);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectRemoteUrls(entry, output));
    return;
  }
  if (value && typeof value === "object") Object.values(value).forEach((entry) => collectRemoteUrls(entry, output));
}

function collectCssUrls(directory, output) {
  for (const path of walk(directory).filter((file) => file.endsWith(".css"))) {
    collectRemoteUrls(readFileSync(path, "utf8"), output);
  }
}

function remoteSourceName(url) {
  const basename = decodeURIComponent(new URL(url).pathname.split("/").pop() || "asset").replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${shortHash(url)}-${basename}`;
}

function remoteOutputPath(url) {
  const sourceName = remoteSourceName(url);
  const extension = extname(sourceName).toLowerCase();
  const suffix = extension === ".gif" || extension === ".svg" ? extension : ".webp";
  return `/assets/media/${sourceName.slice(0, -extension.length)}${suffix}`;
}

async function writeOptimizedImage(sourcePath, destinationPath, maxWidth, quality = 80) {
  mkdirSync(dirname(destinationPath), { recursive: true });
  await sharp(sourcePath, { animated: false })
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality, effort: 5 })
    .toFile(destinationPath);
}

async function buildRemoteAssets(urls) {
  const urlMap = new Map();
  const outputDirectory = join(ASSET_ROOT, "media");
  mkdirSync(outputDirectory, { recursive: true });
  let missing = 0;
  let inputBytes = 0;
  let outputBytes = 0;
  for (const url of urls) {
    const sourceName = remoteSourceName(url);
    const sourcePath = join(SOURCE, "assets", "remote", sourceName);
    if (!existsSync(sourcePath)) {
      missing += 1;
      urlMap.set(url, "");
      continue;
    }
    const outputUrl = remoteOutputPath(url);
    const destinationPath = join(PUBLIC, outputUrl.replace(/\//g, sep));
    const extension = extname(sourceName).toLowerCase();
    inputBytes += statSync(sourcePath).size;
    if (extension === ".gif" || extension === ".svg") {
      mkdirSync(dirname(destinationPath), { recursive: true });
      copyFileSync(sourcePath, destinationPath);
    } else {
      await writeOptimizedImage(sourcePath, destinationPath, MAX_FULL_WIDTH);
    }
    outputBytes += statSync(destinationPath).size;
    urlMap.set(url, outputUrl);
  }
  return { urlMap, missing, inputBytes, outputBytes };
}

function responsiveAssetEntries() {
  const sourceRoot = join(SOURCE, "assets", "responsive");
  return walk(sourceRoot).map((sourcePath) => {
    const rel = relative(sourceRoot, sourcePath).replace(/\\/g, "/");
    const extension = extname(rel).toLowerCase();
    const publicPath = extension === ".svg" ? `/assets/responsive/${rel}` : `/assets/responsive/${rel.slice(0, -extension.length)}.webp`;
    return { sourcePath, publicPath, extension };
  });
}

async function buildResponsiveAssets() {
  const localMap = new Map();
  const entries = responsiveAssetEntries();
  let inputBytes = 0;
  let outputBytes = 0;
  for (const entry of entries) {
    const destinationPath = join(PUBLIC, entry.publicPath.replace(/\//g, sep));
    inputBytes += statSync(entry.sourcePath).size;
    if (IMAGE_EXTENSIONS.has(entry.extension)) {
      if (entry.extension === ".svg") {
        mkdirSync(dirname(destinationPath), { recursive: true });
        copyFileSync(entry.sourcePath, destinationPath);
      } else {
        await writeOptimizedImage(entry.sourcePath, destinationPath, MAX_FULL_WIDTH);
      }
      localMap.set(`/${relative(join(SOURCE, "assets", "responsive"), entry.sourcePath).replace(/\\/g, "/")}`, entry.publicPath);
      outputBytes += statSync(destinationPath).size;
    }
  }
  return { localMap, entries, inputBytes, outputBytes };
}

function buildStaticLocalAssets() {
  const localMap = new Map();
  const sourceRoot = join(SOURCE, "assets", "static");
  const destinationRoot = join(ASSET_ROOT, "static");
  mkdirSync(destinationRoot, { recursive: true });
  for (const sourcePath of walk(sourceRoot)) {
    const name = relative(sourceRoot, sourcePath).replace(/\\/g, "/");
    const publicPath = `/assets/static/${name}`;
    copyFileSync(sourcePath, join(destinationRoot, name));
    localMap.set(`/${name}`, publicPath);
  }
  return localMap;
}

function rewriteStrings(value, map) {
  if (typeof value === "string") {
    let next = value;
    for (const [from, to] of map) {
      if (!from || from === to) continue;
      next = next.split(from).join(to);
    }
    return next;
  }
  if (Array.isArray(value)) return value.map((entry) => rewriteStrings(entry, map));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, rewriteStrings(entry, map)]));
  }
  return value;
}

function copyComponents(sourceName, targetName, replacementMap) {
  const source = join(SOURCE, "components", sourceName);
  const target = join(COMPONENT_TARGET, targetName);
  rmSync(target, { recursive: true, force: true });
  cpSync(source, target, { recursive: true });
  for (const path of walk(target).filter((file) => file.endsWith(".css"))) {
    const original = readFileSync(path, "utf8");
    const rewritten = rewriteStrings(original, replacementMap);
    if (rewritten !== original) writeFileSync(path, rewritten);
  }
}

async function makeThumbnail(projectId, imagePath) {
  if (!imagePath || !imagePath.startsWith("/assets/")) return imagePath;
  const sourcePath = join(PUBLIC, imagePath.replace(/\//g, sep));
  if (!existsSync(sourcePath)) return "";
  const extension = extname(sourcePath).toLowerCase();
  if (extension === ".svg") return imagePath;
  if (!IMAGE_EXTENSIONS.has(extension)) return imagePath;
  const thumbnailPath = join(ASSET_ROOT, "thumbs", `${projectId}.webp`);
  await writeOptimizedImage(sourcePath, thumbnailPath, MAX_THUMB_WIDTH, 84);
  return `/assets/thumbs/${projectId}.webp`;
}

function normalizeProject(seed, collection, options) {
  const isPython = collection === "python";
  const technologyList = Array.isArray(seed.technologies)
    ? seed.technologies
      .filter(Boolean)
      .map((technology) => technology === "Responsive design" ? "Responsive Design" : technology)
    : [];
  const data = isPython ? seed.data : seed.data || {};
  const image = options.resolveImage(seed.image || "");
  const previewModule = options.previewModule;
  const initialCode = isPython && typeof data.initialCode === "string" ? data.initialCode.trimEnd() : "";
  return {
    id: seed.id,
    title: seed.title,
    collection,
    cardCode: initialCode.split("\n").slice(0, 5).join("\n"),
    cardOutput: isPython ? data.tests?.cases?.[0]?.expectedOutput || "" : "",
    collectionLabel: options.collectionLabel,
    category: seed.category,
    categoryLabel: seed.category_label || seed.category,
    categorySlug: slugify(seed.category),
    description: seed.description,
    technologies: technologyList,
    image,
    imageAlt: seed.image_alt || `${seed.title} supplied project preview`,
    practiceLabel: isPython ? "Python playground" : seed.category_label || `Practice ${String(seed.display_order ?? 0).padStart(2, "0")}`,
    sortOrder: options.sortOrder,
    previewType: isPython ? "python" : "react",
    language: isPython ? data.language || "Python 3.10" : "React",
    live: true,
    route: `/projects/${seed.id}`,
    data,
    previewModule,
    exportName: options.exportName || "",
    deviceSet: isPython ? null : options.deviceSet,
  };
}

function publicFileForUrl(url, maps) {
  if (!url) return "";
  if (maps.urlMap.has(url)) return maps.urlMap.get(url);
  if (maps.localMap.has(url)) return maps.localMap.get(url);
  if (url.startsWith("/")) return url;
  return "";
}

async function main() {
  const startedAt = Date.now();
  rmSync(DATA_ROOT, { recursive: true, force: true });
  rmSync(ASSET_ROOT, { recursive: true, force: true });
  mkdirSync(DATA_ROOT, { recursive: true });
  mkdirSync(ASSET_ROOT, { recursive: true });
  mkdirSync(join(DATA_ROOT, "projects"), { recursive: true });

  const remoteUrls = new Set();
  for (const seed of [...staticProjects, ...responsiveProjects]) collectRemoteUrls(seed, remoteUrls);
  collectCssUrls(join(SOURCE, "components", "static"), remoteUrls);
  collectCssUrls(join(SOURCE, "components", "responsive"), remoteUrls);

  const remote = await buildRemoteAssets(remoteUrls);
  const responsive = await buildResponsiveAssets();
  const staticLocal = buildStaticLocalAssets();
  const localMap = new Map([...responsive.localMap, ...staticLocal]);
  const replacementMap = new Map([...remote.urlMap, ...localMap]);
  replacementMap.set("https://media-content.ccbp.in/certificates/share/WRNJZMEOAK.png", "/assets/certificates/static-website-certificate.webp");
  replacementMap.set("https://media-content.ccbp.in/certificates/share/RAGAIXEQCX.png", "/assets/certificates/responsive-website-certificate.webp");

  copyComponents("static", "static", replacementMap);
  copyComponents("responsive", "responsive", replacementMap);

  const certificateDirectory = join(ASSET_ROOT, "certificates");
  mkdirSync(certificateDirectory, { recursive: true });
  await writeOptimizedImage(join(SOURCE, "assets", "certificates", "static-website-certificate.png"), join(certificateDirectory, "static-website-certificate.webp"), 1400, 88);
  await writeOptimizedImage(join(SOURCE, "assets", "certificates", "responsive-website-certificate.png"), join(certificateDirectory, "responsive-website-certificate.webp"), 1400, 88);
  await writeOptimizedImage(join(SOURCE, "assets", "certificates", "alumni.png"), join(certificateDirectory, "alumni.webp"), 1200, 84);
  const pythonCertificate = join(PUBLIC, "programming-foundations-with-python-certificate.png");
  if (existsSync(pythonCertificate)) copyFileSync(pythonCertificate, join(certificateDirectory, "programming-foundations-with-python-certificate.png"));
  for (const name of ["static-website-certificate.pdf", "responsive-website-certificate.pdf"]) {
    copyFileSync(join(SOURCE, "assets", "certificates", name), join(certificateDirectory, name));
  }

  const normalizedPython = normalizeProject(pythonProject, "python", {
    collectionLabel: "Python",
    sortOrder: 0,
    previewModule: "",
    deviceSet: null,
    resolveImage: () => "",
  });
  const normalizedResponsive = responsiveProjects.map((seed, index) => {
    const mapping = responsiveModules[seed.component_key];
    if (!mapping) throw new Error(`No preview mapping for responsive project "${seed.id}" (${seed.component_key}).`);
    const [file, exportName] = mapping;
    if (!existsSync(join(COMPONENT_TARGET, "responsive", file))) throw new Error(`Missing responsive component file ${file}.`);
    return normalizeProject(seed, "responsive", {
      collectionLabel: "Responsive Web",
      sortOrder: 100 + (seed.display_order ?? index),
      previewModule: `responsive/${file}`,
      exportName,
      deviceSet: "responsive",
      resolveImage: (url) => publicFileForUrl(url, { urlMap: remote.urlMap, localMap }),
    });
  });
  const normalizedStatic = staticProjects.map((seed, index) => {
    const mapping = staticModules[seed.component_key];
    if (!mapping) throw new Error(`No preview mapping for static project "${seed.id}" (${seed.component_key}).`);
    const [file, exportName] = mapping;
    if (!existsSync(join(COMPONENT_TARGET, "static", file))) throw new Error(`Missing static component file ${file}.`);
    return normalizeProject(seed, "static", {
      collectionLabel: "Static Web",
      sortOrder: 200 + (seed.display_order ?? index),
      previewModule: `static/${file}`,
      exportName,
      deviceSet: "static",
      resolveImage: (url) => publicFileForUrl(url, { urlMap: remote.urlMap, localMap }),
    });
  });

  const allProjects = [normalizedPython, ...normalizedResponsive, ...normalizedStatic];
  for (const project of allProjects) {
    project.thumbnail = await makeThumbnail(project.id, project.image);
    project.data = rewriteStrings(project.data, replacementMap);
  }

  const normalizedCertificates = certificates.map((certificate) => ({
    ...certificate,
    assets: certificate.assets.map((asset) => ({
      ...asset,
      url: replacementMap.get(asset.url) || asset.url,
    })),
    pdfUrl: certificate.certificatePdfUrl,
  }));

  const collectionCounts = allProjects.reduce((counts, project) => {
    counts[project.collection] = (counts[project.collection] || 0) + 1;
    return counts;
  }, {});
  const collections = ["python", "responsive", "static"].map((id) => ({
    id,
    label: site.collectionsPage[id].label,
    description: site.collectionsPage[id].description,
    count: collectionCounts[id] || 0,
  }));

  const categoryMap = new Map();
  const technologyMap = new Map();
  for (const project of allProjects) {
    if (!categoryMap.has(project.category)) {
      categoryMap.set(project.category, {
        label: project.category,
        slug: project.categorySlug,
        count: 0,
        collections: new Set(),
      });
    }
    const category = categoryMap.get(project.category);
    category.count += 1;
    category.collections.add(project.collection);
    for (const technology of project.technologies) {
      technologyMap.set(technology, (technologyMap.get(technology) || 0) + 1);
    }
  }
  const categories = [...categoryMap.values()]
    .map((category) => ({ ...category, collections: [...category.collections] }))
    .sort((left, right) => left.label.localeCompare(right.label));
  const technologies = [...technologyMap.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));

  const summaries = allProjects.map(({ data, ...project }) => project);
  const catalog = {
    version: 2,
    counts: {
      projects: allProjects.length,
      certificates: normalizedCertificates.length,
      collections: collectionCounts,
    },
    collections,
    categories,
    technologies,
    devices: { responsive: responsiveDevices, static: staticDevices },
    projects: summaries,
    certificates: normalizedCertificates,
    site,
  };

  writeFileSync(join(DATA_ROOT, "catalog.json"), `${JSON.stringify(catalog)}\n`);
  writeFileSync(join(DATA_ROOT, "certificates.json"), `${JSON.stringify(normalizedCertificates)}\n`);
  for (const project of allProjects) {
    writeFileSync(join(DATA_ROOT, "projects", `${project.id}.json`), `${JSON.stringify(project)}\n`);
  }

  const catalogBytes = statSync(join(DATA_ROOT, "catalog.json")).size;
  const projectDetailBytes = allProjects.reduce((total, project) => total + statSync(join(DATA_ROOT, "projects", `${project.id}.json`)).size, 0);
  const generatedAssets = walk(ASSET_ROOT).reduce((total, path) => total + statSync(path).size, 0);
  console.log(`Catalog: ${allProjects.length} projects (${collections.map((entry) => `${entry.label} ${entry.count}`).join(", ")}) and ${normalizedCertificates.length} certificates.`);
  console.log(`Remote assets: ${remoteUrls.size} URLs, ${remote.missing} unavailable, ${(remote.inputBytes / 1048576).toFixed(1)} MB -> ${(remote.outputBytes / 1048576).toFixed(1)} MB.`);
  console.log(`Responsive assets: ${(responsive.inputBytes / 1048576).toFixed(1)} MB -> ${(responsive.outputBytes / 1048576).toFixed(1)} MB.`);
  console.log(`Generated assets total: ${(generatedAssets / 1048576).toFixed(1)} MB. Catalog JSON: ${(catalogBytes / 1024).toFixed(0)} KB. Detail JSON total: ${(projectDetailBytes / 1024).toFixed(0)} KB.`);
  console.log(`Finished in ${((Date.now() - startedAt) / 1000).toFixed(1)}s.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
