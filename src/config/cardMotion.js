export const SHELF_MOTION_PRESETS = [
  {
    id: "studio",
    label: "Studio",
    note: "The shelf exactly as it ships today.",
    motion: "Existing hover",
  },
  {
    id: "stack",
    label: "Stacked glass",
    note: "Rear panes fan out and trail the card as it slides.",
    motion: "Stacked reveal",
  },
  {
    id: "reflect",
    label: "Reflection",
    note: "A mirror gloss and prism edge travel across the glass.",
    motion: "Mirror gloss",
  },
  {
    id: "slide",
    label: "Subtle slide",
    note: "Cards settle in sideways, then step aside on hover.",
    motion: "Lateral slide",
  },
  {
    id: "fade",
    label: "Soft fade",
    note: "A quiet opacity and scale settle without travel.",
    motion: "Fade and settle",
  },
  {
    id: "glass",
    label: "Glass highlight",
    note: "A light sweep crosses the frosted glass.",
    motion: "Sheen sweep",
  },
  {
    id: "depth",
    label: "Depth",
    note: "Layered shadow and a gentle 3D lift.",
    motion: "Layered depth",
  },
];

export const MOTION_INTENSITIES = ["subtle", "medium", "strong"];

export const SHELF_MOTION_LIMITS = Object.freeze({
  duration: Object.freeze({ min: 120, max: 600, step: 20 }),
  delay: Object.freeze({ min: 0, max: 160, step: 10 }),
});

export const DEFAULT_SHELF_MOTION = Object.freeze({
  preset: "studio",
  intensity: "medium",
  duration: 320,
  delay: 60,
});

const PRESET_IDS = new Set(SHELF_MOTION_PRESETS.map(({ id }) => id));

const LEVELS = {
  subtle: { shift: 10, tilt: 2, glow: 0.45, scale: 1.004, fadeScale: 0.975 },
  medium: { shift: 16, tilt: 3.5, glow: 0.7, scale: 1.008, fadeScale: 0.985 },
  strong: { shift: 24, tilt: 5, glow: 1, scale: 1.012, fadeScale: 0.99 },
};

function clampStep(value, { min, max, step }, fallback) {
  if (value === null || value === undefined || value === "") return fallback;
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  const snapped = Math.round(number / step) * step;
  return Math.min(max, Math.max(min, snapped));
}

export function normalizeShelfMotion(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    preset: PRESET_IDS.has(source.preset) ? source.preset : DEFAULT_SHELF_MOTION.preset,
    intensity: MOTION_INTENSITIES.includes(source.intensity) ? source.intensity : DEFAULT_SHELF_MOTION.intensity,
    duration: clampStep(source.duration, SHELF_MOTION_LIMITS.duration, DEFAULT_SHELF_MOTION.duration),
    delay: clampStep(source.delay, SHELF_MOTION_LIMITS.delay, DEFAULT_SHELF_MOTION.delay),
  };
}

export function sameShelfMotion(first, second) {
  const left = normalizeShelfMotion(first);
  const right = normalizeShelfMotion(second);
  return left.preset === right.preset
    && left.intensity === right.intensity
    && left.duration === right.duration
    && left.delay === right.delay;
}

export function getShelfMotionPreset(presetId) {
  return SHELF_MOTION_PRESETS.find(({ id }) => id === presetId) || SHELF_MOTION_PRESETS[0];
}

export function getShelfMotionLevel(intensity) {
  return LEVELS[intensity] || LEVELS.medium;
}

export function getShelfMotionStyles(motion) {
  const settings = normalizeShelfMotion(motion);
  const level = getShelfMotionLevel(settings.intensity);
  return {
    "--shelf-motion-duration": `${settings.duration}ms`,
    "--shelf-motion-delay": `${settings.delay}ms`,
    "--shelf-motion-shift": `${level.shift}px`,
    "--shelf-motion-tilt": `${level.tilt}deg`,
    "--shelf-motion-glow": String(level.glow),
    "--shelf-motion-scale": String(level.scale),
    "--shelf-motion-fade-scale": String(level.fadeScale),
  };
}
