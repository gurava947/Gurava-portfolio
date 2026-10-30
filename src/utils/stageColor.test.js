import { describe, expect, it } from "vitest";
import {
  blendOver,
  contrastRatio,
  hexToRgb,
  isHexColor,
  legibleRatio,
  normalizeHexColor,
  relativeLuminance,
  rgbToHex,
  STAGE_COVERAGE,
  towardLegible,
} from "./stageColor";

describe("hex parsing", () => {
  it("accepts only the two forms a colour input can produce", () => {
    expect(isHexColor("#abc")).toBe(true);
    expect(isHexColor("#aabbcc")).toBe(true);
    expect(isHexColor("aabbcc")).toBe(false);
    expect(isHexColor("#aabcc")).toBe(false);
    expect(isHexColor(null)).toBe(false);
  });

  it("expands a short form and rejects anything else as no colour at all", () => {
    expect(normalizeHexColor("#ABc")).toBe("#aabbcc");
    expect(normalizeHexColor("  #112233  ")).toBe("#112233");
    // "" is what every consumer reads as "follow the theme", so an unparsable value has to land there
    // rather than on a hue nobody asked for.
    expect(normalizeHexColor("rebeccapurple")).toBe("");
    expect(normalizeHexColor(undefined)).toBe("");
  });

  it("round-trips a channel without drifting", () => {
    ["#000000", "#ffffff", "#0891b2", "#f05cf6"].forEach((hex) => {
      expect(rgbToHex(hexToRgb(hex))).toBe(hex);
    });
    expect(hexToRgb("#12")).toBeNull();
  });

  it("clamps and rounds a channel typed in by hand", () => {
    expect(rgbToHex({ r: 300, g: -20, b: 91.6 })).toBe("#ff005c");
  });
});

describe("contrast", () => {
  it("matches the WCAG ratios for the pairs the spec publishes", () => {
    expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 4);
    expect(relativeLuminance("#000000")).toBe(0);
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1);
    expect(contrastRatio("#767676", "#ffffff")).toBeCloseTo(4.54, 2);
    expect(contrastRatio("#ffffff", "#767676")).toBeCloseTo(4.54, 2);
    expect(contrastRatio("#777777", "#777777")).toBeCloseTo(1, 2);
  });
});

describe("the wash a stage colour actually paints", () => {
  it("composites the ramp over the page at the requested coverage", () => {
    expect(blendOver("#000000", "#ffffff", 0.5)).toEqual({ r: 127.5, g: 127.5, b: 127.5 });
    expect(blendOver("#ffffff", "#000000", 1)).toEqual({ r: 255, g: 255, b: 255 });
    expect(blendOver("#ff0000", "#0000ff", 0)).toEqual({ r: 0, g: 0, b: 255 });
  });

  it("leaves the page alone at zero coverage", () => {
    const washed = blendOver("#ff0000", "#f1f5fb", 0);
    expect(contrastRatio(washed, "#172033")).toBe(contrastRatio("#f1f5fb", "#172033"));
  });

  it("answers an unparsable colour with whatever was behind it", () => {
    expect(blendOver("nonsense", "#123456", 0.5)).toEqual(hexToRgb("#123456"));
    expect(hexToRgb(null)).toBeNull();
  });

  it("says what a pick does to the copy", () => {
    const dark = legibleRatio({ color: "#000000", background: "#f1f5fb", text: "#172033" });
    expect(dark.ratio).toBeLessThan(4.5);
    expect(legibleRatio({ color: "#6d5ce8", background: "#f1f5fb", text: "#172033" }).ratio)
      .toBeGreaterThan(dark.ratio);
  });
});

describe("towardLegible", () => {
  const light = { background: "#f1f5fb", text: "#172033" };

  it("does not touch a colour that is already readable", () => {
    const kept = towardLegible({ color: "#ffffff", ...light, minimum: 4.5 });
    expect(kept).toEqual({ color: "#ffffff", adjusted: false });
  });

  it("moves an unreadable colour until the copy clears the bar", () => {
    const result = towardLegible({ color: "#000000", ...light, minimum: 4.5 });
    expect(result.adjusted).toBe(true);
    expect(result.color).not.toBe("#000000");
    expect(contrastRatio(blendOver(result.color, light.background, STAGE_COVERAGE), light.text))
      .toBeGreaterThanOrEqual(4.5);
  });

  it("keeps hue and saturation rather than flattening to grey", () => {
    // Interpolating in sRGB toward the background keeps the chroma of the original pick proportional,
    // which is what makes the correction read as the same colour, quieter.
    const result = towardLegible({ color: "#0000ff", ...light, minimum: 4.5 });
    expect(result.color).not.toBe("#0000ff");
    const moved = hexToRgb(result.color);
    expect(moved.b).toBeGreaterThan(moved.r);
    expect(moved.b).toBeGreaterThan(moved.g);
  });

  it("treats a malformed pick as no colour, so the theme is followed", () => {
    expect(towardLegible({ color: "", ...light, minimum: 4.5 })).toEqual({ color: "", adjusted: false });
    expect(towardLegible({ color: "blue", ...light, minimum: 4.5 })).toEqual({ color: "", adjusted: false });
  });

  it("lands on the background itself when no step in between can satisfy the bar", () => {
    // Asking for a 21:1 wash over the same page is impossible: the only answer is the page.
    const result = towardLegible({ color: "#000000", ...light, minimum: 21 });
    expect(result.color).toBe("#f1f5fb");
  });
});
