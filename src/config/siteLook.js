// Visitor-specific "Look" settings: overall style direction, hero title animation,
// background pattern, the gradient the whole page is washed in, and the 3D brand mark.
// Like the other studio groups this stays in the browser only — it is presentation, so it
// never goes to the settings API.

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

// Ten headline motions. Everything here animates `transform`, `opacity`, `clip-path` or a
// background position only — no layout property — because the hero title reflows the whole page.
export const HERO_TEXT_STYLES = [
  { id: "static", label: "Static", note: "No entrance motion on the title." },
  { id: "rise", label: "Rise", note: "Words lift in one after another." },
  { id: "shimmer", label: "Shimmer", note: "A slow light band travels across the words." },
  { id: "wave", label: "Wave", note: "Words drift up and down in a rolling wave." },
  { id: "mask", label: "Mask reveal", note: "Each word slides out from behind a mask." },
  { id: "cascade", label: "Cascade", note: "Words fall into place from above, slightly turned." },
  { id: "focus", label: "Focus in", note: "Words sharpen out of a blur, one after another." },
  { id: "slide", label: "Slide", note: "Words glide in from the right and settle." },
  { id: "pop", label: "Pop", note: "Words spring in with a small overshoot." },
  { id: "neon", label: "Neon pulse", note: "The title keeps breathing a soft glow." },
];

// Twelve background fields, all painted on one fixed layer behind the page. Anything that needs
// a blur filter is kept to two of them (beams, mesh) because a full-viewport blur is the single
// most expensive paint on a low-end phone.
export const BACKGROUND_PATTERNS = [
  { id: "none", label: "Clean", note: "Theme gradients only." },
  { id: "grid", label: "Grid", note: "A hairline grid that slowly drifts." },
  { id: "dots", label: "Dots", note: "A fine dot field with a soft vignette." },
  { id: "beams", label: "Beams", note: "Wide light beams that sweep the page." },
  { id: "mesh", label: "Mesh", note: "Three drifting colour pools behind everything." },
  { id: "blueprint", label: "Blueprint", note: "Fine engineering grid with heavier major lines." },
  { id: "diagonal", label: "Diagonal", note: "Quiet diagonal hairlines across the page." },
  { id: "rings", label: "Rings", note: "Concentric rings spreading from the top corner." },
  { id: "stardust", label: "Stardust", note: "Three scales of specks, drifting slowly." },
  { id: "aurora", label: "Aurora", note: "Soft vertical curtains of light that lean and lift." },
  { id: "spotlight", label: "Spotlight", note: "One wide pool that breathes behind the content." },
  { id: "prism", label: "Prism", note: "A slow conic sweep through the gradient colours." },
];

// The gradient the page, its surfaces and the pattern are washed in. "theme" keeps the visitor's
// own primary/secondary/accent, so the existing colour pickers still win by default.
export const LOOK_GRADIENTS = [
  { id: "theme", label: "Theme", note: "Follows your theme colours." },
  { id: "sunset", label: "Sunset", note: "Coral into amber into rose." },
  { id: "ocean", label: "Ocean", note: "Deep blue into teal." },
  { id: "forest", label: "Forest", note: "Moss into pine with a lime edge." },
  { id: "grape", label: "Grape", note: "Violet into indigo with a magenta tip." },
  { id: "ember", label: "Ember", note: "Orange into crimson, low and hot." },
  { id: "candy", label: "Candy", note: "Pink into sky, bright and soft." },
  { id: "graphite", label: "Graphite", note: "Neutral steel, no hue at all." },
];

export const FEATURED_STYLES = [
  { id: "grid", label: "Grid", note: "The supplied home grid." },
  { id: "rail", label: "Poster rail", note: "A snap-scrolling shelf of tall posters." },
  { id: "poster", label: "Wide posters", note: "A slower rail with landscape posters." },
];

// Section headings (not the hero title, which has its own motion group). Each of these is a
// treatment on the heading itself, so it has to survive every gradient and both themes — which
// rules out anything that paints over the glyphs without a colour fallback.
export const HEADLINE_STYLES = [
  { id: "plain", label: "Plain", note: "Solid colour, no treatment." },
  { id: "underline", label: "Drawn rule", note: "A gradient rule draws itself under the heading." },
  { id: "marker", label: "Marker", note: "A highlighter swipe sits behind the words." },
  { id: "gradient", label: "Gradient fill", note: "The heading is painted with the look gradient." },
  { id: "glow", label: "Soft glow", note: "A coloured halo sits behind the letters." },
  { id: "etched", label: "Etched", note: "A fine shadow gives the letters a pressed edge." },
];

const PRESET_IDS = new Set(LOOK_PRESETS.map(({ id }) => id));
const HERO_TEXT_IDS = new Set(HERO_TEXT_STYLES.map(({ id }) => id));
const PATTERN_IDS = new Set(BACKGROUND_PATTERNS.map(({ id }) => id));
const GRADIENT_IDS = new Set(LOOK_GRADIENTS.map(({ id }) => id));
const FEATURED_IDS = new Set(FEATURED_STYLES.map(({ id }) => id));
const HEADLINE_IDS = new Set(HEADLINE_STYLES.map(({ id }) => id));

// Saved settings from before this group existed have no `look` key, so normalizeSiteLook
// hands them the shipped default below: the hero animates and the grid shows on first
// load after this upgrade. Visitors can switch any of it off in Card Studio -> Site look.
export const DEFAULT_SITE_LOOK = Object.freeze({
  preset: "practice",
  heroText: "rise",
  background: "grid",
  gradient: "theme",
  heading: "underline",
  textFx: true,
  logo3d: true,
  featured: "grid",
});

export function normalizeSiteLook(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    preset: PRESET_IDS.has(source.preset) ? source.preset : DEFAULT_SITE_LOOK.preset,
    heroText: HERO_TEXT_IDS.has(source.heroText) ? source.heroText : DEFAULT_SITE_LOOK.heroText,
    background: PATTERN_IDS.has(source.background) ? source.background : DEFAULT_SITE_LOOK.background,
    gradient: GRADIENT_IDS.has(source.gradient) ? source.gradient : DEFAULT_SITE_LOOK.gradient,
    heading: HEADLINE_IDS.has(source.heading) ? source.heading : DEFAULT_SITE_LOOK.heading,
    textFx: typeof source.textFx === "boolean" ? source.textFx : DEFAULT_SITE_LOOK.textFx,
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
    && left.gradient === right.gradient
    && left.heading === right.heading
    && left.textFx === right.textFx
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

export function getLookGradient(gradientId) {
  return LOOK_GRADIENTS.find(({ id }) => id === gradientId) || LOOK_GRADIENTS[0];
}

export function getFeaturedStyle(styleId) {
  return FEATURED_STYLES.find(({ id }) => id === styleId) || FEATURED_STYLES[0];
}

export function getHeadlineStyle(styleId) {
  return HEADLINE_STYLES.find(({ id }) => id === styleId) || HEADLINE_STYLES[0];
}

// How long each word waits for the previous one, and how long its own animation runs. The two
// infinite motions (wave, neon) keep a long duration; the entrance ones stay under a second so
// the hero never looks like it is still arriving after the page has settled.
const HERO_TEXT_PACING = {
  static: { stagger: 0, duration: 0 },
  rise: { stagger: 55, duration: 620 },
  shimmer: { stagger: 0, duration: 0 },
  wave: { stagger: 90, duration: 2600 },
  mask: { stagger: 70, duration: 560 },
  cascade: { stagger: 65, duration: 700 },
  focus: { stagger: 75, duration: 640 },
  slide: { stagger: 60, duration: 560 },
  pop: { stagger: 55, duration: 520 },
  neon: { stagger: 0, duration: 3200 },
};

export function getSiteLookVariables(look) {
  const settings = normalizeSiteLook(look);
  const pacing = HERO_TEXT_PACING[settings.heroText] || HERO_TEXT_PACING.rise;
  return {
    "--look-hero-stagger": `${pacing.stagger}ms`,
    "--look-hero-duration": `${pacing.duration}ms`,
    "--look-pattern-opacity": settings.background === "none" ? "0" : "1",
    "--look-wash-opacity": settings.preset === "cinematic" ? "1" : "0.85",
    "--look-logo-depth": settings.logo3d ? "1" : "0",
  };
}
