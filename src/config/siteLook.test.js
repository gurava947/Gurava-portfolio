import { describe, expect, it } from "vitest";
import {
  BACKGROUND_PATTERNS,
  DEFAULT_SITE_LOOK,
  FEATURED_STYLES,
  HERO_TEXT_STYLES,
  LOOK_PRESETS,
  getBackgroundPattern,
  getFeaturedStyle,
  getHeroTextStyle,
  getLookPreset,
  getSiteLookVariables,
  normalizeSiteLook,
  sameSiteLook,
} from "./siteLook";

describe("normalizeSiteLook", () => {
  it("falls back to the shipped look for missing or invalid input", () => {
    expect(normalizeSiteLook()).toEqual(DEFAULT_SITE_LOOK);
    expect(normalizeSiteLook("cinematic")).toEqual(DEFAULT_SITE_LOOK);
    expect(normalizeSiteLook({ preset: "neon", heroText: "spin", background: "plaid", logo3d: "yes", featured: "wall" }))
      .toEqual(DEFAULT_SITE_LOOK);
  });

  it("keeps every valid choice, including the featured strip", () => {
    expect(normalizeSiteLook({ preset: "cinematic", heroText: "wave", background: "mesh", logo3d: false, featured: "rail" }))
      .toEqual({ preset: "cinematic", heroText: "wave", background: "mesh", logo3d: false, featured: "rail" });
  });

  it("treats settings saved before the look group existed as the default look", () => {
    expect(normalizeSiteLook({ preset: "cinematic" })).toEqual({ ...DEFAULT_SITE_LOOK, preset: "cinematic" });
  });

  it("only treats fully equal settings as the same look", () => {
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK })).toBe(true);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, featured: "poster" })).toBe(false);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, logo3d: false })).toBe(false);
  });

  it("offers the controls the studio renders", () => {
    expect(LOOK_PRESETS.map(({ id }) => id)).toEqual(["practice", "cinematic"]);
    expect(HERO_TEXT_STYLES.map(({ id }) => id)).toContain("shimmer");
    expect(BACKGROUND_PATTERNS.map(({ id }) => id)).toEqual(expect.arrayContaining(["grid", "dots", "beams", "mesh"]));
    expect(FEATURED_STYLES.map(({ id }) => id)).toEqual(["grid", "rail", "poster"]);
  });
});

describe("look option getters", () => {
  it("return the requested option and fall back to the first one", () => {
    expect(getLookPreset("cinematic").label).toBe("Dark cinematic");
    expect(getHeroTextStyle("mask").label).toBe("Mask reveal");
    expect(getBackgroundPattern("beams").label).toBe("Beams");
    expect(getFeaturedStyle("rail").label).toBe("Poster rail");
    expect(getLookPreset("missing")).toBe(LOOK_PRESETS[0]);
    expect(getFeaturedStyle("missing")).toBe(FEATURED_STYLES[0]);
  });
});

describe("getSiteLookVariables", () => {
  it("exposes headline pacing, pattern opacity and logo depth to CSS", () => {
    expect(getSiteLookVariables({ heroText: "rise", background: "grid", logo3d: true })).toEqual({
      "--look-hero-stagger": "55ms",
      "--look-hero-duration": "620ms",
      "--look-pattern-opacity": "1",
      "--look-logo-depth": "1",
    });
    expect(getSiteLookVariables({ heroText: "static" })).toEqual(expect.objectContaining({
      "--look-hero-stagger": "0ms",
      "--look-hero-duration": "0ms",
    }));
    expect(getSiteLookVariables({ background: "none" })["--look-pattern-opacity"]).toBe("0");
    expect(getSiteLookVariables({ logo3d: false })["--look-logo-depth"]).toBe("0");
  });
});
