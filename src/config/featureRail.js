// The suggestion rail under the featured projects — the one that reads "Browse all 200 builds".
// It used to be a single continuous strip of poster tiles that ran together into one long surface.
// These settings turn it into separate cards and give the visitor the five numbers that actually
// decide how a rail feels: how wide a card is, how tall, the space between them, how many sit in
// view, and the padding around the row.
//
// Like the other studio groups this stays in the browser: it is presentation, and the settings API
// has no opinion about it.

export const RAIL_LAYOUTS = [
  { id: "carousel", label: "Carousel", note: "One row you scroll through, a card at a time or a page at a time." },
  { id: "grid", label: "Grid", note: "As many cards as fit, wrapping onto new rows." },
  { id: "list", label: "List", note: "One card per row, full width, no scrolling." },
];

export const RAIL_LIMITS = Object.freeze({
  cardWidth: Object.freeze({ min: 180, max: 560, step: 10 }),
  cardHeight: Object.freeze({ min: 0, max: 560, step: 10 }),
  gap: Object.freeze({ min: 0, max: 48, step: 2 }),
  cardsPerView: Object.freeze({ min: 0, max: 6, step: 1 }),
  padding: Object.freeze({ min: 0, max: 48, step: 2 }),
});

// `cardHeight: 0` and `cardsPerView: 0` are choices, not absences: the card takes the height its
// own content needs, and the width takes the number you typed rather than a share of the viewport.
export const DEFAULT_FEATURE_RAIL = Object.freeze({
  layout: "carousel",
  cardWidth: 300,
  cardHeight: 0,
  gap: 18,
  cardsPerView: 0,
  padding: 8,
  arrows: true,
  indicators: true,
  drag: true,
  wrap: false,
});

const LAYOUT_IDS = new Set(RAIL_LAYOUTS.map((layout) => layout.id));

function bounded(value, { min, max }, fallback) {
  // An absent key is not zero: a saved group with `cardHeight: null` means "never chosen", while a
  // slider handing over "0" means the visitor put it there on purpose.
  if (value === null || value === undefined || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}

export function normalizeFeatureRail(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_FEATURE_RAIL };
  if (LAYOUT_IDS.has(source.layout)) normalized.layout = source.layout;
  normalized.cardWidth = bounded(source.cardWidth, RAIL_LIMITS.cardWidth, normalized.cardWidth);
  normalized.cardHeight = bounded(source.cardHeight, RAIL_LIMITS.cardHeight, normalized.cardHeight);
  normalized.gap = bounded(source.gap, RAIL_LIMITS.gap, normalized.gap);
  normalized.cardsPerView = bounded(source.cardsPerView, RAIL_LIMITS.cardsPerView, normalized.cardsPerView);
  normalized.padding = bounded(source.padding, RAIL_LIMITS.padding, normalized.padding);
  ["arrows", "indicators", "drag", "wrap"].forEach((key) => {
    if (typeof source[key] === "boolean") normalized[key] = source[key];
  });
  // A rail that wraps is not a rail you scroll, so the two cannot be on at the same time. Grid and
  // list always wrap; carousel only does when you ask it to. The arrows, dots and drag stay as the
  // visitor left them — a wrapped row simply has nothing to scroll, so it hides them itself.
  if (normalized.layout !== "carousel") normalized.wrap = true;
  return normalized;
}

export function sameFeatureRail(first = {}, second = {}) {
  return Object.keys(DEFAULT_FEATURE_RAIL)
    .every((key) => normalizeFeatureRail(first)[key] === normalizeFeatureRail(second)[key]);
}
