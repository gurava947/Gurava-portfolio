export const LAYOUT_AREAS = [
  {
    id: "projectCards",
    attribute: "layoutProjectCards",
    label: "Project cards",
    note: "Featured and catalog project cards",
  },
  {
    id: "certificateCards",
    attribute: "layoutCertificateCards",
    label: "Certificate cards",
    note: "Certificate shelf cards",
  },
  {
    id: "projectPages",
    attribute: "layoutProjectPages",
    label: "Project pages",
    note: "Project hero, preview and description",
  },
  {
    id: "internalPages",
    attribute: "layoutInternalPages",
    label: "Other internal pages",
    note: "Catalog and certificate page structure",
  },
];

const ALL_AREAS = Object.freeze(LAYOUT_AREAS.map((area) => area.id));

export const LAYOUT_PATTERNS = [
  {
    id: "default",
    label: "Current default",
    note: "Keep the supplied layout untouched.",
    areas: ALL_AREAS,
  },
  {
    id: "single-column",
    label: "Single column",
    note: "One focused reading column.",
    areas: ALL_AREAS,
  },
  {
    id: "two-column",
    label: "Two column",
    note: "Balanced pairs that stack on small screens.",
    areas: ALL_AREAS,
  },
  {
    id: "grid",
    label: "Grid",
    note: "Even, scannable card tracks.",
    areas: ["projectCards", "certificateCards"],
  },
  {
    id: "f-pattern",
    label: "F-pattern",
    note: "Wide lead row, then a strong left edge.",
    areas: ["projectCards", "projectPages"],
  },
  {
    id: "z-pattern",
    label: "Z-pattern",
    note: "Alternating left and right anchors.",
    areas: ["projectPages", "internalPages"],
  },
  {
    id: "split-screen",
    label: "Split screen",
    note: "Two equal regions side by side.",
    areas: ["projectPages", "internalPages"],
  },
  {
    id: "magazine",
    label: "Magazine",
    note: "Feature lead plus supporting columns.",
    areas: ["projectCards", "certificateCards", "projectPages", "internalPages"],
  },
  {
    id: "asymmetrical",
    label: "Asymmetrical",
    note: "Uneven spans with a deliberate rhythm.",
    areas: ["projectCards", "certificateCards"],
  },
  {
    id: "holy-grail",
    label: "Holy grail",
    note: "Side rails around a wide content lane.",
    areas: ["projectPages", "internalPages"],
  },
  {
    id: "masonry",
    label: "Masonry",
    note: "Staggered columns that follow content height.",
    areas: ["projectCards", "certificateCards"],
  },
  {
    id: "hero-landing",
    label: "Hero landing",
    note: "Full-width lead with supporting content.",
    areas: ["projectCards", "projectPages", "internalPages"],
  },
  {
    id: "full-screen",
    label: "Full-screen",
    note: "Viewport-height hero on large screens.",
    areas: ["projectPages", "internalPages"],
  },
];

const PATTERN_BY_ID = new Map(LAYOUT_PATTERNS.map((pattern) => [pattern.id, pattern]));
const AREA_IDS = new Set(ALL_AREAS);

export const DEFAULT_LAYOUT_SETTINGS = Object.freeze(
  Object.fromEntries(ALL_AREAS.map((areaId) => [areaId, "default"])),
);

export function isLayoutArea(areaId) {
  return AREA_IDS.has(areaId);
}

export function getLayoutPattern(patternId) {
  return PATTERN_BY_ID.get(patternId) || null;
}

export function isLayoutPatternSuitable(patternId, areaId) {
  const pattern = PATTERN_BY_ID.get(patternId);
  return Boolean(pattern && AREA_IDS.has(areaId) && pattern.areas.includes(areaId));
}

export function getLayoutPatternsForArea(areaId) {
  if (!AREA_IDS.has(areaId)) return [];
  return LAYOUT_PATTERNS.filter((pattern) => pattern.areas.includes(areaId));
}

export function getPatternAreas(patternId) {
  const pattern = PATTERN_BY_ID.get(patternId);
  if (!pattern) return [];
  return ALL_AREAS.filter((areaId) => pattern.areas.includes(areaId));
}

export function normalizeLayoutSettings(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_LAYOUT_SETTINGS };
  ALL_AREAS.forEach((areaId) => {
    if (isLayoutPatternSuitable(source[areaId], areaId)) normalized[areaId] = source[areaId];
  });
  return normalized;
}

export function sameLayoutSettings(first = {}, second = {}) {
  return ALL_AREAS.every((areaId) => (first?.[areaId] || "default") === (second?.[areaId] || "default"));
}
