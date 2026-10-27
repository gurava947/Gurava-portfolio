export const EFFECT_INTENSITIES = ["subtle", "medium", "strong"];

export const PROJECT_EFFECTS = [
  {
    id: "none",
    label: "Studio",
    note: "Keep the current card finish.",
    motion: "Existing hover",
  },
  {
    id: "tilt",
    label: "Pointer tilt",
    note: "The card follows the pointer in 3D.",
    motion: "Pointer tilt",
  },
  {
    id: "parallax",
    label: "Depth layers",
    note: "Media and copy drift at different depths.",
    motion: "Layered parallax",
  },
  {
    id: "lift",
    label: "Museum lift",
    note: "Deep shadow and a lit edge on hover.",
    motion: "Hover lift",
  },
  {
    id: "halo",
    label: "Halo frame",
    note: "A slow band of light traces the edge.",
    motion: "Animated edge light",
  },
  {
    id: "reveal",
    label: "Curtain reveal",
    note: "A quick-look panel unfolds below.",
    motion: "Disclosure reveal",
  },
];

export const CERTIFICATE_EFFECTS = [
  {
    id: "none",
    label: "Classic",
    note: "Keep the current certificate finish.",
    motion: "Existing hover",
  },
  {
    id: "tilt",
    label: "Pointer tilt",
    note: "The certificate follows the pointer in 3D.",
    motion: "Pointer tilt",
  },
  {
    id: "lift",
    label: "Museum lift",
    note: "The card rises with a deeper shadow.",
    motion: "Hover lift",
  },
  {
    id: "foil",
    label: "Foil sheen",
    note: "A metallic sweep crosses the surface.",
    motion: "Hover sheen",
  },
  {
    id: "spotlight",
    label: "Pointer spotlight",
    note: "A soft light follows the pointer.",
    motion: "Pointer spotlight",
  },
  {
    id: "float",
    label: "Ambient float",
    note: "A slow, gentle drift at rest.",
    motion: "Ambient motion",
  },
];

const INTENSITIES = {
  subtle: { tilt: 4, shift: 3, lift: 3, duration: 460, glow: 0.55, scale: 1.005, float: 3 },
  medium: { tilt: 7, shift: 5, lift: 5, duration: 360, glow: 0.8, scale: 1.01, float: 5 },
  strong: { tilt: 10, shift: 8, lift: 8, duration: 280, glow: 1, scale: 1.015, float: 8 },
};

const PROJECT_EFFECT_IDS = new Set(PROJECT_EFFECTS.map(({ id }) => id));
const CERTIFICATE_EFFECT_IDS = new Set(CERTIFICATE_EFFECTS.map(({ id }) => id));

export const DEFAULT_CARD_EFFECTS = Object.freeze({
  enabled: true,
  intensity: "medium",
  projects: "none",
  certificates: "none",
});

export function normalizeCardEffects(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_CARD_EFFECTS };
  if (typeof source.enabled === "boolean") normalized.enabled = source.enabled;
  if (EFFECT_INTENSITIES.includes(source.intensity)) normalized.intensity = source.intensity;
  if (PROJECT_EFFECT_IDS.has(source.projects)) normalized.projects = source.projects;
  if (CERTIFICATE_EFFECT_IDS.has(source.certificates)) normalized.certificates = source.certificates;
  return normalized;
}

export function sameEffectsSettings(first, second) {
  const left = normalizeCardEffects(first);
  const right = normalizeCardEffects(second);
  return left.enabled === right.enabled
    && left.intensity === right.intensity
    && left.projects === right.projects
    && left.certificates === right.certificates;
}

export function getEffectIntensity(intensity) {
  return INTENSITIES[intensity] || INTENSITIES.medium;
}

export function getEffectVariables(effects) {
  const settings = normalizeCardEffects(effects);
  const level = getEffectIntensity(settings.intensity);
  return {
    "--fx-tilt": `${level.tilt}deg`,
    "--fx-shift": `${level.shift}px`,
    "--fx-lift": `${level.lift}px`,
    "--fx-float": `${level.float}px`,
    "--fx-duration": `${level.duration}ms`,
    "--fx-glow": String(level.glow),
    "--fx-scale": String(level.scale),
  };
}

export function getCardEffect(effects, area) {
  const settings = normalizeCardEffects(effects);
  if (!settings.enabled) return "none";
  return area === "certificates" ? settings.certificates : settings.projects;
}

export function getProjectEffect(effectId) {
  return PROJECT_EFFECTS.find(({ id }) => id === effectId) || PROJECT_EFFECTS[0];
}

export function getCertificateEffect(effectId) {
  return CERTIFICATE_EFFECTS.find(({ id }) => id === effectId) || CERTIFICATE_EFFECTS[0];
}
