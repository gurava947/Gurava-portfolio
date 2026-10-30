/* 3D Stage settings.

   Two rules shape everything below.

   1. `off` is the default and it is a real value, not a missing one. While it is selected the site
      imports no engine, renders no canvas and paints pixel-for-pixel the flat design it shipped with.
      That keeps the 3D work inside the script byte budget in lighthouserc.cjs: Three.js is only ever
      fetched by a visitor who asks for it.
   2. Every number here is a *request*. The engine clamps it again against MAX_PIXEL_RATIO and the
      instance ceiling before it touches WebGL, so a stored value from an older build, a hand-edited
      localStorage entry, or a slider dragged to its stop can never make the stage unbounded. */

import { blendOver, contrastRatio, normalizeHexColor, towardLegible } from "../utils/stageColor";

export const MAX_PIXEL_RATIO = 2;
export const MAX_INSTANCES = 2400;

export const THREE_3D_KINDS = Object.freeze({
  particles: "particles",
  grid: "grid",
  shelf: "shelf",
});

/* Ten styles. Two of them are named in the brief and are deliberately different in kind:
   `swarm` is the interactive, dynamic particle system; `shelf` is the fixed 3D layout that holds the
   projects. The rest are variations the same two builders produce with different geometry, motion
   and arrangement, so the panel offers real choice without ten bespoke render paths. */
export const THREE_3D_STYLES = [
  // `size` is the world radius an instance has at the middle of the size dial. The sphere styles sit
  // near half a unit because they are particles: any larger and a default-density field overlaps
  // itself into sheets, which reads as a wallpaper rather than as depth.
  {
    id: "swarm",
    label: "Interactive swarm",
    note: "The dynamic particle system — instances drift and part around the pointer.",
    scene: { kind: "particles", arrangement: "field", shape: "sphere", speed: 1, size: 0.55, spread: 1, links: false },
  },
  {
    id: "shelf",
    label: "Project shelf",
    note: "A fixed 3D layout: every project sits on one instanced deck, camera locked.",
    scene: { kind: "shelf", arrangement: "deck", shape: "card", speed: 0.4, size: 1, spread: 1, links: false },
  },
  {
    id: "constellation",
    label: "Constellation",
    note: "Slow drifting points joined by links, the way a star chart is drawn.",
    scene: { kind: "particles", arrangement: "field", shape: "sphere", speed: 0.45, size: 0.4, spread: 1.25, links: true },
  },
  {
    id: "vortex",
    label: "Vortex",
    note: "Instances spiral into a centre that keeps its distance from the page copy.",
    scene: { kind: "particles", arrangement: "vortex", shape: "sphere", speed: 1.35, size: 0.48, spread: 0.85, links: false },
  },
  {
    id: "rings",
    label: "Orbit rings",
    note: "Concentric orbits at three tilts — reads as motion without any turbulence.",
    scene: { kind: "particles", arrangement: "orbit", shape: "sphere", speed: 0.8, size: 0.45, spread: 1, links: false },
  },
  {
    id: "helix",
    label: "Helix drift",
    note: "Two winding strands that scroll past each other, each instance its own colour.",
    scene: { kind: "particles", arrangement: "helix", shape: "sphere", speed: 0.9, size: 0.5, spread: 1.1, links: false },
  },
  {
    id: "curtain",
    label: "Aurora curtain",
    note: "A wave front of tall, thin instances — movement across the page, never in front of it.",
    scene: { kind: "particles", arrangement: "wave", shape: "ribbon", speed: 0.55, size: 1.4, spread: 1.35, links: false },
  },
  {
    id: "ripple",
    label: "Ripple field",
    note: "A grid of columns driven by a sine height field, like a topographic water tank.",
    scene: { kind: "grid", arrangement: "grid", shape: "box", speed: 0.7, size: 0.9, spread: 1, links: false },
  },
  {
    id: "lattice",
    label: "Crystal lattice",
    note: "A cubic lattice of octahedra turning on two axes at once.",
    scene: { kind: "grid", arrangement: "grid3d", shape: "octahedron", speed: 0.35, size: 1.1, spread: 1, links: false },
  },
  {
    id: "prism",
    label: "Prism scatter",
    note: "Tetrahedra thrown across the depth of the scene and left to spin where they fell.",
    scene: { kind: "grid", arrangement: "scatter", shape: "tetrahedron", speed: 0.5, size: 1.2, spread: 1.5, links: false },
  },
];

export const DEFAULT_THREE_3D_STYLE_ID = "off";

export const THREE_3D_STYLE_OPTIONS = [
  { id: "off", label: "Off", note: "The flat design exactly as it ships.", scene: null },
  ...THREE_3D_STYLES,
];

export const THREE_3D_LIMITS = Object.freeze({
  count: Object.freeze({ min: 120, max: 1800, step: 40 }),
  speed: Object.freeze({ min: 0, max: 250, step: 10 }),
  size: Object.freeze({ min: 2, max: 16, step: 1 }),
  depth: Object.freeze({ min: 1, max: 9, step: 1 }),
  brightness: Object.freeze({ min: 20, max: 100, step: 5 }),
  pixelRatioCap: Object.freeze({ min: 1, max: MAX_PIXEL_RATIO, step: 0.25 }),
  // One dial per surface, and it is a percentage of the instance budget rather than a count: the
  // absolute number a visitor dials in stays meaningful when they move between pages.
  surfacePresence: Object.freeze({ min: 0, max: 150, step: 5 }),
});

/* The surfaces the single site canvas modulates itself between.

   One canvas covers the whole site, so "different on each surface" has to be a parameter change
   rather than a second scene. Density is the honest lever: it is free to change per frame because an
   InstancedMesh draws however many instances you ask it to, and it is the quantity the frame cost is
   proportional to. Depth follows it, because a thin field on a busy page reads as flat.

   `page` is the fallback for every route without a declared surface — project detail, playground, 404
   — and it exists so the stage never has to invent a profile for a region it was not told about. */
export const THREE_3D_SURFACES = Object.freeze([
  Object.freeze({
    id: "hero",
    label: "Landing",
    note: "The full field: this region has no copy beside the canvas for particles to obscure.",
    defaultPresence: 100,
  }),
  Object.freeze({
    id: "projects",
    label: "Projects",
    note: "Thinned so a wall of cards stays the subject and the stage stays the background.",
    defaultPresence: 70,
  }),
  Object.freeze({
    id: "certificates",
    label: "Certificates",
    note: "A little more depth for the artwork tiles, at a density that leaves the credentials readable.",
    defaultPresence: 85,
  }),
  Object.freeze({
    id: "page",
    label: "Every other page",
    note: "The default for any route that does not declare a surface of its own.",
    defaultPresence: 55,
  }),
]);

export const DEFAULT_THREE_3D_SURFACE_PRESENCE = Object.freeze(
  THREE_3D_SURFACES.reduce((map, surface) => ({ ...map, [surface.id]: surface.defaultPresence }), {}),
);

/* The three stops of the stage's colour ramp. Empty means "take the theme's", which is what shipped
   before this control existed, so an untouched store still renders the palette the Look studio picks. */
export const THREE_3D_COLOR_KEYS = Object.freeze(["primary", "secondary", "accent"]);
export const DEFAULT_THREE_3D_COLORS = Object.freeze({ primary: "", secondary: "", accent: "" });

/* The frame-rate governor.

   These are engine constants, not preferences: the panel turns the governor on or off, and the engine
   decides with them. The target is derived from the display rather than assumed — `stage3d` measures
   the shortest frame interval it has seen, which on a vsync-locked page is the refresh period, and
   asks for a frame budget of `targetMultiplier` times that. So a 60Hz screen starts degrading around
   33ms of work per frame and a 120Hz screen around 16ms, which is the part of "adapt to the refresh
   rate" a browser can actually observe: it cannot change the panel's rate, only whether it keeps up.

   `floor` is how far density may be cut before the stage stays there; `step` is multiplicative so one
   correction on a 1800-instance field removes the same proportion of work as on a 200-instance one.
   `settleMs` is the hysteresis: without it, one slow frame while the catalogue paints would start a
   slide, because recovering density makes the next frame slow again. */
export const THREE_3D_GOVERNOR = Object.freeze({
  targetMultiplier: 2,
  minTargetFrameMs: 16.7,
  maxTargetFrameMs: 33,
  step: 0.12,
  floor: 0.35,
  ceiling: 1,
  samplesPerWindow: 45,
  settleMs: 800,
});

export const DEFAULT_THREE_3D = Object.freeze({
  style: DEFAULT_THREE_3D_STYLE_ID,
  count: 720,
  speed: 100,
  size: 6,
  depth: 5,
  brightness: 60,
  pixelRatioCap: MAX_PIXEL_RATIO,
  pointer: true,
  scrim: true,
  reveal: true,
  adaptive: true,
  colors: DEFAULT_THREE_3D_COLORS,
  surfaces: DEFAULT_THREE_3D_SURFACE_PRESENCE,
});

const NUMBER_KEYS = ["count", "speed", "size", "depth", "brightness", "pixelRatioCap"];
const BOOLEAN_KEYS = ["pointer", "scrim", "reveal", "adaptive"];
const STYLE_IDS = new Set(THREE_3D_STYLE_OPTIONS.map(({ id }) => id));

function clampStep(value, { min, max, step }, fallback) {
  if (value === null || value === undefined || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  // `speed` and `brightness` are whole percentages and `size` a small integer, so most steps are
  // integral. The one fractional step is the pixel-ratio ceiling, and rounding its product at 1e-6
  // keeps the tail a float step can leave out of the persisted settings — `sameThree3d` compares the
  // normalised numbers with `===`, and `0.30000000000000004 !== 0.3` would read as an unsaved change.
  const snapped = Math.round(number / step) * step;
  return Math.min(max, Math.max(min, Math.round(snapped * 1e6) / 1e6));
}

function normalizeColors(value) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const colors = { ...DEFAULT_THREE_3D_COLORS };
  THREE_3D_COLOR_KEYS.forEach((key) => {
    colors[key] = normalizeHexColor(source[key]);
  });
  return colors;
}

function normalizeSurfaces(value) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const surfaces = { ...DEFAULT_THREE_3D_SURFACE_PRESENCE };
  THREE_3D_SURFACES.forEach(({ id, defaultPresence }) => {
    surfaces[id] = clampStep(source[id], THREE_3D_LIMITS.surfacePresence, defaultPresence);
  });
  return surfaces;
}

export function normalizeThree3d(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_THREE_3D };
  NUMBER_KEYS.forEach((key) => {
    normalized[key] = clampStep(source[key], THREE_3D_LIMITS[key], DEFAULT_THREE_3D[key]);
  });
  BOOLEAN_KEYS.forEach((key) => {
    if (typeof source[key] === "boolean") normalized[key] = source[key];
  });
  normalized.style = STYLE_IDS.has(source.style) ? source.style : DEFAULT_THREE_3D.style;
  // Nested groups are rebuilt rather than merged, so a stored object cannot smuggle an unknown key
  // through to the engine, and an absent one (every store written before this existed) lands on the
  // default instead of `undefined`.
  normalized.colors = normalizeColors(source.colors);
  normalized.surfaces = normalizeSurfaces(source.surfaces);
  // The cap is a ceiling on the device ratio, not a target: the engine still takes the minimum of
  // this and `devicePixelRatio`. Values above MAX_PIXEL_RATIO are unreachable through the slider,
  // but a hand-edited store must not be able to ask for a 3x buffer.
  normalized.pixelRatioCap = Math.min(normalized.pixelRatioCap, MAX_PIXEL_RATIO);
  return normalized;
}

export function sameThree3d(first, second) {
  const left = normalizeThree3d(first);
  const right = normalizeThree3d(second);
  return NUMBER_KEYS.every((key) => left[key] === right[key])
    && BOOLEAN_KEYS.every((key) => left[key] === right[key])
    && left.style === right.style
    && THREE_3D_COLOR_KEYS.every((key) => left.colors[key] === right.colors[key])
    && THREE_3D_SURFACES.every(({ id }) => left.surfaces[id] === right.surfaces[id]);
}

export function isThree3dActive(value = {}) {
  return normalizeThree3d(value).style !== "off";
}

export function getThree3dStyle(styleId) {
  const id = STYLE_IDS.has(styleId) ? styleId : DEFAULT_THREE_3D_STYLE_ID;
  return THREE_3D_STYLE_OPTIONS.find((style) => style.id === id) || THREE_3D_STYLE_OPTIONS[0];
}

export function getThree3dScene(value = {}) {
  return getThree3dStyle(normalizeThree3d(value).style).scene;
}

/* The one place the device ratio is decided. Kept pure so the two guarantees the brief asks for —
   never above 2, never above what the device actually has — are testable without a GL context. */
export function resolvePixelRatio(devicePixelRatio, cap = MAX_PIXEL_RATIO) {
  const ratio = Number(devicePixelRatio);
  const safe = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  return Math.min(safe, Number(cap) || 1, MAX_PIXEL_RATIO);
}

/* Instances are the whole cost model of the stage: one InstancedMesh per scene, so the ceiling is
   applied here rather than in the render loop. */
export function resolveInstanceCount(value = {}) {
  const { count } = normalizeThree3d(value);
  return Math.min(count, MAX_INSTANCES);
}

/* How loud the stage is on one surface.

   Density is the presence itself — the engine draws `presence/100` of the instance budget, and the
   cost of a frame is proportional to the instance count, so this dial is a direct request for that
   fraction of the work. Depth follows it on a compressive curve rather than linearly: a field thinned
   to 40% still needs most of its parallax or it reads as a flat pattern behind the cards, and the
   `depthFloor` is what keeps that from happening at the low end. */
const DEPTH_FLOOR = 0.55;

export function getThree3dSurfaceFactor(value = {}, surfaceId) {
  const { surfaces } = normalizeThree3d(value);
  const surface = THREE_3D_SURFACES.some(({ id }) => id === surfaceId) ? surfaceId : "page";
  const presence = surfaces[surface];
  const density = presence / 100;
  return { surface, presence, density, depth: DEPTH_FLOOR + (1 - DEPTH_FLOOR) * density };
}

/* The shipped ink of the page, per mode, as the stylesheet declares it in styles/theme.css. The guard
   below compares against these rather than against the theme palette, because what has to stay
   readable is the copy that sits on top of the canvas — and that copy is a token, not a preference. */
export const STAGE_PAGE_INK = Object.freeze({
  light: Object.freeze({ background: "#f1f5fb", text: "#172033" }),
  dark: Object.freeze({ background: "#070b14", text: "#f8fafc" }),
});

/* The fraction of a pixel the instances can paint over the page at full alpha, per mode.

   Normal blending in light mode draws at 0.82-0.9; dark mode switches to additive blending at 0.45
   per instance, which accumulates where the field is dense — so the honest worst case is the shipped
   material alpha, not the average. Multiplied by the brightness dial, which is the canvas element's
   own opacity, this is how much of the background the ramp is actually replacing. */
const STAGE_WASH_ALPHA = Object.freeze({ light: 0.9, dark: 0.45 });
const STAGE_MIN_CONTRAST = 4.5;

/* The user's three colours, guarded against the page they will sit behind.

   Two properties are worth stating because they are the reason this function exists:

   - Only colours the visitor actually picked are corrected. The theme palette is curated and has been
     checked as a whole, so an untouched store renders exactly what shipped — the guard can never make
     a difference to someone who did not ask for one.
   - The stricter the brightness dial, the stricter the guard: the same hue that is a whisper at 20%
     canvas opacity is a wash at 100%, and readability has to be judged at the setting it will be seen
     under rather than at the default.

   `adjusted` names which stops were pulled back, so the panel can say so instead of silently
   overriding a colour the visitor chose. */
export function resolveThree3dPalette(value = {}, themePalette = {}) {
  const settings = normalizeThree3d(value);
  const mode = themePalette.mode === "dark" ? "dark" : "light";
  const ink = STAGE_PAGE_INK[mode];
  const coverage = (settings.brightness / 100) * STAGE_WASH_ALPHA[mode];
  const adjusted = [];
  const palette = { mode, primary: "", secondary: "", accent: "" };
  THREE_3D_COLOR_KEYS.forEach((key) => {
    const chosen = settings.colors[key];
    if (!chosen) {
      palette[key] = themePalette[key] || "";
      return;
    }
    const legible = towardLegible({
      color: chosen,
      background: ink.background,
      text: ink.text,
      minimum: STAGE_MIN_CONTRAST,
      coverage,
    });
    palette[key] = legible.color;
    if (legible.adjusted) adjusted.push(key);
  });
  return { ...palette, coverage, adjusted };
}

/* What the worst user colour would do to the copy, reported to one decimal. The panel uses this to
   show the consequence of a choice before it is applied, and it is the same arithmetic the guard
   enforces, so the number and the behaviour cannot drift apart. */
export function describeThree3dLegibility(value = {}, themePalette = {}) {
  const settings = normalizeThree3d(value);
  const mode = themePalette.mode === "dark" ? "dark" : "light";
  const ink = STAGE_PAGE_INK[mode];
  const coverage = (settings.brightness / 100) * STAGE_WASH_ALPHA[mode];
  const picked = THREE_3D_COLOR_KEYS.filter((key) => settings.colors[key]);
  if (!picked.length) return null;
  const resolved = resolveThree3dPalette(settings, { ...themePalette, mode });
  const ratios = picked
    .map((key) => contrastRatio(blendOver(resolved[key], ink.background, coverage), ink.text))
    .filter((ratio) => Number.isFinite(ratio));
  return {
    coverage,
    worstRatio: ratios.length ? Math.min(...ratios) : null,
    adjusted: resolved.adjusted,
  };
}

export const THREE_3D_ATTRIBUTE_NAMES = Object.freeze([
  "data-three3d",
  "data-three3d-kind",
  "data-three3d-scrim",
  "data-three3d-pointer",
]);

export function getThree3dAttributes(value = {}) {
  const settings = normalizeThree3d(value);
  if (!isThree3dActive(settings)) return {};
  const scene = getThree3dScene(settings);
  return {
    "data-three3d": settings.style,
    "data-three3d-kind": scene.kind,
    "data-three3d-scrim": String(settings.scrim),
    "data-three3d-pointer": String(scene.kind === "particles" && settings.pointer),
  };
}

/* The custom properties this feature owns. useTheme writes the ones that are present and removes the
   rest, so a value from a previous choice can never outlive the style that asked for it. */
export const THREE_3D_VARIABLE_NAMES = Object.freeze(["--three3d-brightness"]);

export function getThree3dVariables(value = {}) {
  const settings = normalizeThree3d(value);
  if (!isThree3dActive(settings)) return {};
  // Brightness is the one control that must not cost a rebuild, so it is published as a custom
  // property for the stylesheet to put on the canvas — the compositor applies it, the scene keeps its
  // buffers. The fallback in three-3d-studio.css is the same 0.6 this default maps to, so a stage that
  // never had its property written still reads the shipped value.
  return { "--three3d-brightness": `${settings.brightness / 100}` };
}

/* What the panel shows under the preview: the instance count the stage will allocate and the device
   ratio it will be allowed to reach. The ratio is passed in rather than read from `window` so this
   stays a pure function of its arguments. */
export function describeThree3d(value = {}, devicePixelRatio = 1) {
  const settings = normalizeThree3d(value);
  if (!isThree3dActive(settings)) return "3D off — the flat design is live";
  const scene = getThree3dScene(settings);
  const summary = [
    `${resolveInstanceCount(settings)} instances`,
    `${resolvePixelRatio(devicePixelRatio, settings.pixelRatioCap)}x max`,
    `${settings.speed}% speed`,
  ];
  if (scene.kind === "shelf") summary.push("fixed layout");
  if (scene.kind === "particles" && settings.pointer) summary.push("pointer-reactive");
  if (settings.adaptive && scene.kind !== "shelf") summary.push("frame-adaptive");
  const pickedColors = THREE_3D_COLOR_KEYS.filter((key) => settings.colors[key]).length;
  if (pickedColors) summary.push(`${pickedColors} custom colour${pickedColors === 1 ? "" : "s"}`);
  return `${getThree3dStyle(settings.style).label} · ${summary.join(" · ")}`;
}
