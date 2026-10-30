/* 3D Stage settings.

   Two rules shape everything below.

   1. `off` is the default and it is a real value, not a missing one. While it is selected the site
      imports no engine, renders no canvas and paints pixel-for-pixel the flat design it shipped with.
      That keeps the 3D work inside the script byte budget in lighthouserc.cjs: Three.js is only ever
      fetched by a visitor who asks for it.
   2. Every number here is a *request*. The engine clamps it again against MAX_PIXEL_RATIO and the
      instance ceiling before it touches WebGL, so a stored value from an older build, a hand-edited
      localStorage entry, or a slider dragged to its stop can never make the stage unbounded. */

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
});

const NUMBER_KEYS = ["count", "speed", "size", "depth", "brightness", "pixelRatioCap"];
const BOOLEAN_KEYS = ["pointer", "scrim", "reveal"];
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
    && left.style === right.style;
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
  return `${getThree3dStyle(settings.style).label} · ${summary.join(" · ")}`;
}
