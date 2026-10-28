// Visitor-specific "Look" settings: overall style direction, hero title animation,
// background pattern and the 3D brand mark. Like the other studio groups this stays in
// the browser only — it is presentation, so it never goes to the settings API.

export const LOOK_PRESETS = [
  {
    id: "practice",
    label: "Soft practice",
    note: "The light, airy look the site ships with.",
  },
  {
    id: "cinematic",
    label: "Dark cinematic",
    note: "Poster-first hero with deep contrast and glow.",
  },
];

export const HERO_TEXT_STYLES = [
  { id: "static", label: "Static", note: "No entrance motion on the title." },
  { id: "rise", label: "Rise", note: "Words lift in one after another." },
  { id: "shimmer", label: "Shimmer", note: "A slow light band travels across the words." },
  { id: "wave", label: "Wave", note: "Words drift up and down in a rolling wave." },
  { id: "mask", label: "Mask reveal", note: "Each word slides out from behind a mask." },
];

export const BACKGROUND_PATTERNS = [
  { id: "none", label: "Clean", note: "Theme gradients only." },
  { id: "grid", label: "Grid", note: "A hairline grid that slowly drifts." },
  { id: "dots", label: "Dots", note: "A fine dot field with a soft vignette." },
  { id: "beams", label: "Beams", note: "Wide light beams that sweep the page." },
  { id: "mesh", label: "Mesh", note: "Three drifting colour pools behind everything." },
];

export const FEATURED_STYLES = [
  { id: "grid", label: "Grid", note: "The supplied home grid." },
  { id: "rail", label: "Poster rail", note: "A snap-scrolling shelf of tall posters." },
  { id: "poster", label: "Wide posters", note: "A slower rail with landscape posters." },
];

const PRESET_IDS = new Set(LOOK_PRESETS.map(({ id }) => id));
const HERO_TEXT_IDS = new Set(HERO_TEXT_STYLES.map(({ id }) => id));
const PATTERN_IDS = new Set(BACKGROUND_PATTERNS.map(({ id }) => id));
const FEATURED_IDS = new Set(FEATURED_STYLES.map(({ id }) => id));

// Saved settings from before this group existed have no `look` key, so normalizeSiteLook
// hands them the shipped default below: the hero animates and the grid shows on first
// load after this upgrade. Visitors can switch any of it off in Card Studio -> Site look.
export const DEFAULT_SITE_LOOK = Object.freeze({
  preset: "practice",
  heroText: "rise",
  background: "grid",
  logo3d: true,
  featured: "grid",
});

export function normalizeSiteLook(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    preset: PRESET_IDS.has(source.preset) ? source.preset : DEFAULT_SITE_LOOK.preset,
    heroText: HERO_TEXT_IDS.has(source.heroText) ? source.heroText : DEFAULT_SITE_LOOK.heroText,
    background: PATTERN_IDS.has(source.background) ? source.background : DEFAULT_SITE_LOOK.background,
    logo3d: typeof source.logo3d === "boolean" ? source.logo3d : DEFAULT_SITE_LOOK.logo3d,
    featured: FEATURED_IDS.has(source.featured) ? source.featured : DEFAULT_SITE_LOOK.featured,
  };
}

export function sameSiteLook(first, second) {
  const left = normalizeSiteLook(first);
  const right = normalizeSiteLook(second);
  return left.preset === right.preset
    && left.heroText === right.heroText
    && left.background === right.background
    && left.logo3d === right.logo3d
    && left.featured === right.featured;
}

export function getLookPreset(presetId) {
  return LOOK_PRESETS.find(({ id }) => id === presetId) || LOOK_PRESETS[0];
}

export function getHeroTextStyle(styleId) {
  return HERO_TEXT_STYLES.find(({ id }) => id === styleId) || HERO_TEXT_STYLES[0];
}

export function getBackgroundPattern(patternId) {
  return BACKGROUND_PATTERNS.find(({ id }) => id === patternId) || BACKGROUND_PATTERNS[0];
}

export function getFeaturedStyle(styleId) {
  return FEATURED_STYLES.find(({ id }) => id === styleId) || FEATURED_STYLES[0];
}

const HERO_TEXT_PACING = {
  static: { stagger: 0, duration: 0 },
  rise: { stagger: 55, duration: 620 },
  shimmer: { stagger: 0, duration: 0 },
  wave: { stagger: 90, duration: 2600 },
  mask: { stagger: 70, duration: 560 },
};

export function getSiteLookVariables(look) {
  const settings = normalizeSiteLook(look);
  const pacing = HERO_TEXT_PACING[settings.heroText] || HERO_TEXT_PACING.rise;
  return {
    "--look-hero-stagger": `${pacing.stagger}ms`,
    "--look-hero-duration": `${pacing.duration}ms`,
    "--look-pattern-opacity": settings.background === "none" ? "0" : "1",
    "--look-logo-depth": settings.logo3d ? "1" : "0",
  };
}
