// The layout settings behind every card strip: the suggestion rail on the home page, the "More from"
// rail on a project page, the catalogue's scrolling band and the 3D collection shelf. Those strips
// used to be separate strips of poster tiles that ran together into one long surface, and only the
// home one answered to anyone. These settings turn them into separate cards and give the visitor the
// five numbers that actually decide how a rail feels: how wide a card is, how tall, the space between
// them, how many sit in view, and the padding around the row.
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

// The same five numbers now decide every card strip on the site — the rail on the home page, the
// "same shelf" on a project, the catalog's scrolling results and the 3D collection shelf — so the
// maths lives here once instead of in each component.
//
// Two prefixes come out of it. `--rail-*` is written inline on a rail that was handed its settings as
// a prop, which is how the studio preview moves before anything else on the page does. `--fr-*` is
// published on `<html>` once per settings change, so a strip whose stylesheet never met the config
// can still read the visitor's choices. They are deliberately different names: the catalog rail
// already declares its own `--rail-gap`, and a rule that reads the property it declares is a cycle
// that silently drops the value.

function railVariables(settings, prefix) {
  return {
    [`${prefix}-card-width`]: `${settings.cardWidth}px`,
    [`${prefix}-card-height`]: `${settings.cardHeight}px`,
    [`${prefix}-gap`]: `${settings.gap}px`,
    [`${prefix}-padding`]: `${settings.padding}px`,
    [`${prefix}-cards-per-view`]: String(settings.cardsPerView),
    // Cards-per-view shares the visible width; with none picked, the typed width is the card.
    [`${prefix}-basis`]: settings.cardsPerView > 0
      ? `calc((100% - ${settings.gap * (settings.cardsPerView - 1)}px) / ${settings.cardsPerView})`
      : `min(${settings.cardWidth}px, 100%)`,
    [`${prefix}-grid`]: settings.cardsPerView > 0
      ? `repeat(${settings.cardsPerView}, minmax(0, 1fr))`
      : `repeat(auto-fill, minmax(min(${settings.cardWidth}px, 100%), 1fr))`,
  };
}

export function getFeatureRailLocalVariables(value = {}) {
  return railVariables(normalizeFeatureRail(value), "--rail");
}

// What goes on the root is only what the visitor actually chose. A number that still equals the
// shipped one stays off, so the strip's own fallback keeps being the design — the same rule the 3D
// shelf follows with `getShelf3dStyles`, and the reason a studio nobody opened cannot resize a
// phone's two-column catalog to 300px tiles. `--rail-cols` is on the list because the catalog grid
// counts its columns from it, and a picked count has to be able to be taken back off again.
export const FEATURE_RAIL_ROOT_VARIABLES = Object.freeze([
  "--fr-card-width",
  "--fr-card-basis",
  "--fr-card-height",
  "--fr-gap",
  "--fr-padding",
  "--fr-cards-per-view",
  "--fr-basis",
  "--fr-grid",
  "--rail-cols",
]);

export function getFeatureRailRootVariables(value = {}) {
  const settings = normalizeFeatureRail(value);
  const variables = {};
  if (settings.cardWidth !== DEFAULT_FEATURE_RAIL.cardWidth) {
    variables["--fr-card-width"] = `${settings.cardWidth}px`;
    // A typed width is only a card size when no count was picked; with a count, the count owns the
    // width and the number the visitor typed is what the columns are divided by.
    if (settings.cardsPerView === 0) variables["--fr-card-basis"] = `min(${settings.cardWidth}px, 100%)`;
  }
  if (settings.cardHeight !== DEFAULT_FEATURE_RAIL.cardHeight) {
    variables["--fr-card-height"] = `${settings.cardHeight}px`;
  }
  if (settings.gap !== DEFAULT_FEATURE_RAIL.gap) variables["--fr-gap"] = `${settings.gap}px`;
  if (settings.padding !== DEFAULT_FEATURE_RAIL.padding) variables["--fr-padding"] = `${settings.padding}px`;
  if (settings.cardsPerView > 0) {
    variables["--fr-cards-per-view"] = String(settings.cardsPerView);
    variables["--fr-basis"] = `calc((100% - ${settings.gap * (settings.cardsPerView - 1)}px) / ${settings.cardsPerView})`;
    variables["--fr-grid"] = `repeat(${settings.cardsPerView}, minmax(0, 1fr))`;
    // The catalog grid counts its columns from --rail-cols, in the stylesheet and in the paging code
    // that reads the count back off the laid-out track. An inline value on the root outranks the
    // per-device numbers in theme.css, so one property steers both halves of that strip at once.
    variables["--rail-cols"] = String(settings.cardsPerView);
  }
  return variables;
}

// Layout and the three chrome switches travel as attributes because a stylesheet cannot branch on a
// number. `off` is spelled out rather than leaving the attribute away: a strip reading
// `[data-fr-arrows="off"]` then never has to guess whether an absent attribute meant "on" or "never
// rendered at all".
export function getFeatureRailRootAttributes(value = {}) {
  const settings = normalizeFeatureRail(value);
  return {
    "data-fr-layout": settings.layout,
    "data-fr-wrap": settings.wrap ? "on" : "off",
    "data-fr-tall": settings.cardHeight > 0 ? "on" : "off",
    "data-fr-arrows": settings.arrows ? "on" : "off",
    "data-fr-indicators": settings.indicators ? "on" : "off",
    "data-fr-drag": settings.drag ? "on" : "off",
  };
}
