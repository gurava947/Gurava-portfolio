/* Perceptual colour helpers for the 3D stage.

   The stage paints behind the page, so a colour the visitor picks is not judged on its own: it is
   judged composited over the theme background at the canvas's current opacity, underneath body copy.
   These functions exist so the guard in config/three3d.js can state that arithmetic instead of
   eyeballing a hue.

   Everything here is pure and unit-testable without a GL context, and every ratio it returns is a
   real WCAG 2 contrast ratio (relative luminance per the sRGB linearisation in the spec). */

const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHexColor(value) {
  return typeof value === "string" && HEX_PATTERN.test(value.trim());
}

/* Anything unparsable becomes "" — which every consumer reads as "follow the theme palette" — rather
   than throwing or silently falling back to a hue the visitor never asked for. */
export function normalizeHexColor(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim().toLowerCase();
  if (!HEX_PATTERN.test(trimmed)) return "";
  if (trimmed.length === 4) return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  return trimmed;
}

export function hexToRgb(value) {
  const hex = normalizeHexColor(value);
  if (!hex) return null;
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  };
}

export function rgbToHex({ r, g, b }) {
  const channel = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, "0");
  return `#${channel(r)}${channel(g)}${channel(b)}`;
}

function linearize(channel) {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(value) {
  const rgb = typeof value === "string" ? hexToRgb(value) : value;
  if (!rgb) return 0;
  return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b);
}

export function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

/* Porter-Duff "source over" for opaque layers, which is close enough to what the stage does: an
   instance is drawn at a fraction of full alpha over the theme wash, and this says where the blend
   actually lands. */
export function blendOver(top, bottom, alpha) {
  const above = typeof top === "string" ? hexToRgb(top) : top;
  const below = typeof bottom === "string" ? hexToRgb(bottom) : bottom;
  if (!above || !below) return below || above || null;
  const amount = Math.max(0, Math.min(1, Number(alpha) || 0));
  return {
    r: above.r * amount + below.r * (1 - amount),
    g: above.g * amount + below.g * (1 - amount),
    b: above.b * amount + below.b * (1 - amount),
  };
}

/* The one rule the guard enforces.

   A stage colour is allowed to be as saturated and as bright as the visitor wants, as long as the
   worst-case wash it produces still leaves the page's own text legible: the ramp is composited over
   the theme background at the coverage the brightest style can reach, and the result must hold the
   body-text ratio at or above the threshold. The particle field draws over a large area at high
   density, so the coverage estimate is deliberately pessimistic rather than the average case. */
export const STAGE_COVERAGE = 0.55;

export function legibleRatio({ color, background, text, coverage = STAGE_COVERAGE }) {
  const washed = blendOver(color, background, coverage);
  return { washed, ratio: contrastRatio(washed, text) };
}

/* Pull a colour toward the theme background until the ratio is met, keeping hue and saturation as far
   as possible: interpolating in sRGB toward a mid-tone of the background preserves the perceived
   colour far better than clamping lightness, which is what makes the correction hard to notice. */
export function towardLegible({ color, background, text, minimum, coverage = STAGE_COVERAGE }) {
  const hex = normalizeHexColor(color);
  if (!hex) return { color: "", adjusted: false };
  if (contrastRatio(blendOver(hex, background, coverage), text) >= minimum) {
    return { color: hex, adjusted: false };
  }
  const start = hexToRgb(hex);
  const anchor = hexToRgb(background);
  let best = anchor;
  for (let step = 1; step <= 20; step += 1) {
    const t = step / 20;
    const candidate = rgbToHex({
      r: start.r + (anchor.r - start.r) * t,
      g: start.g + (anchor.g - start.g) * t,
      b: start.b + (anchor.b - start.b) * t,
    });
    if (contrastRatio(blendOver(candidate, background, coverage), text) >= minimum) {
      best = candidate;
      break;
    }
    best = candidate;
  }
  return { color: best, adjusted: true };
}
