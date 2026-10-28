/* 3D Settings for the collection shelf.

   Every value here has a default that matches the shipped stylesheet exactly, and
   getShelf3dStyles() only emits a custom property when the user has moved away from that default.
   The CSS keeps its own responsive measures as the var() fallback, so a visitor who never opened
   the Studio sees the shelf pixel-for-pixel as before. */

export const SHELF_3D_LAYOUT_PRESETS = [
  {
    id: "single",
    label: "Single window",
    note: "One large window at a time — the shelf as it ships.",
    layout: { columns: 1, rows: 1, cardWidth: 720, cardHeight: 476, gap: 22 },
  },
  {
    id: "pair",
    label: "Pair",
    note: "Two windows side by side, each still wide enough for its label.",
    layout: { columns: 2, rows: 1, cardWidth: 560, cardHeight: 468, gap: 24 },
  },
  {
    id: "strip",
    label: "Film strip",
    note: "Three narrow windows in a row, the way prints hang on a rail.",
    layout: { columns: 3, rows: 1, cardWidth: 420, cardHeight: 440, gap: 18 },
  },
  {
    id: "gallery",
    label: "2 × 2 gallery",
    note: "Four windows on two rows, paged sideways a full page at a time.",
    layout: { columns: 2, rows: 2, cardWidth: 520, cardHeight: 388, gap: 20 },
  },
  {
    id: "wall",
    label: "Collection wall",
    note: "Three across, two deep — the densest the shelf can be.",
    layout: { columns: 3, rows: 2, cardWidth: 420, cardHeight: 372, gap: 16 },
  },
];

export const SHELF_3D_MODELS = [
  {
    id: "deck",
    label: "Stacked deck",
    note: "Rear panes pushed back and up-right, the shipped look.",
    values: { tilt: 9, lift: 2, depth: 34, panes: true },
  },
  {
    id: "vitrine",
    label: "Vitrine",
    note: "A deeper case: steeper angle and more room behind the front print.",
    values: { tilt: 15, lift: 5, depth: 56, panes: true },
  },
  {
    id: "flatbed",
    label: "Flatbed",
    note: "Prints laid flat with a shallow shadow — almost no perspective.",
    values: { tilt: 0, lift: 0, depth: 16, panes: true },
  },
  {
    id: "frame",
    label: "Single frame",
    note: "One centred print, no rear panes at all.",
    values: { tilt: 4, lift: 2, depth: 0, panes: false },
  },
];

export const SHELF_3D_DENSITIES = [
  { id: "compact", label: "Compact", gap: 12 },
  { id: "balanced", label: "Balanced", gap: 22 },
  { id: "airy", label: "Airy", gap: 34 },
];

export const SHELF_3D_LIMITS = Object.freeze({
  columns: Object.freeze({ min: 1, max: 3, step: 1 }),
  rows: Object.freeze({ min: 1, max: 2, step: 1 }),
  cardWidth: Object.freeze({ min: 260, max: 880, step: 10 }),
  cardHeight: Object.freeze({ min: 320, max: 640, step: 4 }),
  gap: Object.freeze({ min: 8, max: 48, step: 2 }),
  tilt: Object.freeze({ min: 0, max: 18, step: 1 }),
  lift: Object.freeze({ min: 0, max: 8, step: 1 }),
  depth: Object.freeze({ min: 0, max: 80, step: 2 }),
  perspective: Object.freeze({ min: 500, max: 1600, step: 20 }),
});

export const DEFAULT_SHELF_3D = Object.freeze({
  columns: 1,
  rows: 1,
  cardWidth: 720,
  cardHeight: 476,
  gap: 22,
  model: "deck",
  tilt: 9,
  lift: 2,
  depth: 34,
  perspective: 900,
  panes: true,
  reflection: true,
  stack: true,
});

const NUMBER_KEYS = ["columns", "rows", "cardWidth", "cardHeight", "gap", "tilt", "lift", "depth", "perspective"];
const BOOLEAN_KEYS = ["panes", "reflection", "stack"];
const MODEL_IDS = new Set(SHELF_3D_MODELS.map(({ id }) => id));

function clampStep(value, { min, max, step }, fallback) {
  if (value === null || value === undefined || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  const snapped = Math.round(number / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

export function normalizeShelf3d(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_SHELF_3D };
  NUMBER_KEYS.forEach((key) => {
    normalized[key] = clampStep(source[key], SHELF_3D_LIMITS[key], DEFAULT_SHELF_3D[key]);
  });
  BOOLEAN_KEYS.forEach((key) => {
    if (typeof source[key] === "boolean") normalized[key] = source[key];
  });
  normalized.model = MODEL_IDS.has(source.model) ? source.model : DEFAULT_SHELF_3D.model;
  return normalized;
}

export function sameShelf3d(first, second) {
  const left = normalizeShelf3d(first);
  const right = normalizeShelf3d(second);
  return NUMBER_KEYS.every((key) => left[key] === right[key])
    && BOOLEAN_KEYS.every((key) => left[key] === right[key])
    && left.model === right.model;
}

export function getShelf3dLayoutPreset(values) {
  const settings = normalizeShelf3d(values);
  const match = SHELF_3D_LAYOUT_PRESETS.find(({ layout }) => Object.entries(layout).every(([key, value]) => settings[key] === value));
  return match || null;
}

export function getShelf3dModel(modelId) {
  return SHELF_3D_MODELS.find(({ id }) => id === modelId) || SHELF_3D_MODELS[0];
}

/* The sliders are the source of truth for a model's numbers, so the pressed chip is found by
   matching them back — a fine-tuned deck still reads as the deck it came from. */
export function getShelf3dActiveModel(values) {
  const settings = normalizeShelf3d(values);
  const match = SHELF_3D_MODELS.find(({ values: modelValues }) => (
    modelValues.tilt === settings.tilt
    && modelValues.lift === settings.lift
    && modelValues.depth === settings.depth
    && modelValues.panes === settings.panes
  ));
  return match || null;
}

export function getShelf3dDensity(values) {
  const { gap } = normalizeShelf3d(values);
  const match = SHELF_3D_DENSITIES.find((density) => density.gap === gap);
  return match || null;
}

export function isShelf3dGrid(values) {
  const { columns, rows } = normalizeShelf3d(values);
  return columns > 1 || rows > 1;
}

export function getShelf3dStyles(value = {}) {
  const settings = normalizeShelf3d(value);
  const styles = {};
  if (settings.cardWidth !== DEFAULT_SHELF_3D.cardWidth) styles["--shelf-3d-card-width"] = `${settings.cardWidth}px`;
  if (settings.cardHeight !== DEFAULT_SHELF_3D.cardHeight) styles["--shelf-3d-card-height"] = `${settings.cardHeight}px`;
  if (settings.gap !== DEFAULT_SHELF_3D.gap) styles["--shelf-3d-gap"] = `${settings.gap}px`;
  if (settings.tilt !== DEFAULT_SHELF_3D.tilt) {
    styles["--shelf-3d-tilt"] = `${-settings.tilt}deg`;
    styles["--shelf-3d-tilt-open"] = `${-(Math.round(settings.tilt * 0.6667 * 10) / 10)}deg`;
  }
  if (settings.lift !== DEFAULT_SHELF_3D.lift) styles["--shelf-3d-lift"] = `${settings.lift}deg`;
  if (settings.depth !== DEFAULT_SHELF_3D.depth) styles["--shelf-3d-depth"] = `${-settings.depth}px`;
  if (settings.perspective !== DEFAULT_SHELF_3D.perspective) styles["--shelf-3d-perspective"] = `${settings.perspective}px`;
  if (isShelf3dGrid(settings)) {
    styles["--shelf-3d-columns"] = String(settings.columns);
    styles["--shelf-3d-rows"] = String(settings.rows);
  }
  return styles;
}

export function getShelf3dAttributes(value = {}) {
  const settings = normalizeShelf3d(value);
  const attributes = {};
  if (isShelf3dGrid(settings)) attributes["data-shelf-3d-grid"] = "true";
  if (!settings.panes) attributes["data-shelf-3d-panes"] = "off";
  if (!settings.reflection) attributes["data-shelf-3d-reflection"] = "off";
  if (!settings.stack) attributes["data-shelf-3d-stack"] = "off";
  return attributes;
}
