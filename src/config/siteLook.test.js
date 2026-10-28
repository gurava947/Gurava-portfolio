import { describe, expect, it } from "vitest";
import {
  BACKGROUND_PATTERNS,
  DEFAULT_SITE_LOOK,
  FEATURED_STYLES,
  HEADLINE_STYLES,
  HERO_TEXT_STYLES,
  LOOK_GRADIENTS,
  LOOK_PRESETS,
  getBackgroundPattern,
  getFeaturedStyle,
  getHeadlineStyle,
  getHeroTextStyle,
  getLookGradient,
  getLookPreset,
  getSiteLookVariables,
  normalizeSiteLook,
  sameSiteLook,
} from "./siteLook";

describe("normalizeSiteLook", () => {
  it("falls back to the shipped look for missing or invalid input", () => {
    expect(normalizeSiteLook()).toEqual(DEFAULT_SITE_LOOK);
    expect(normalizeSiteLook("cinematic")).toEqual(DEFAULT_SITE_LOOK);
    expect(normalizeSiteLook({ preset: "neon", heroText: "spin", background: "plaid", gradient: "lava", heading: "hologram", textFx: "loud", logo3d: "yes", featured: "wall" }))
      .toEqual(DEFAULT_SITE_LOOK);
  });

  it("keeps every valid choice, including the gradient and featured strip", () => {
    expect(normalizeSiteLook({ preset: "cinematic", heroText: "wave", background: "mesh", gradient: "sunset", heading: "marker", textFx: false, logo3d: false, featured: "rail" }))
      .toEqual({ preset: "cinematic", heroText: "wave", background: "mesh", gradient: "sunset", heading: "marker", textFx: false, logo3d: false, featured: "rail" });
  });

  it("treats settings saved before the look group existed as the default look", () => {
    expect(normalizeSiteLook({ preset: "cinematic" })).toEqual({ ...DEFAULT_SITE_LOOK, preset: "cinematic" });
  });

  it("only treats fully equal settings as the same look", () => {
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK })).toBe(true);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, featured: "poster" })).toBe(false);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, gradient: "ocean" })).toBe(false);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, heading: "glow" })).toBe(false);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, textFx: false })).toBe(false);
    expect(sameSiteLook(DEFAULT_SITE_LOOK, { ...DEFAULT_SITE_LOOK, logo3d: false })).toBe(false);
  });

  it("offers the controls the studio renders", () => {
    expect(LOOK_PRESETS.map(({ id }) => id)).toEqual(["practice", "cinematic"]);
    expect(HERO_TEXT_STYLES.map(({ id }) => id)).toContain("shimmer");
    expect(BACKGROUND_PATTERNS.map(({ id }) => id)).toEqual(expect.arrayContaining(["grid", "dots", "beams", "mesh"]));
    expect(FEATURED_STYLES.map(({ id }) => id)).toEqual(["grid", "rail", "poster"]);
    expect(HEADLINE_STYLES.map(({ id }) => id)).toEqual(expect.arrayContaining(["plain", "underline", "marker", "gradient", "glow", "etched"]));
  });

  // The brief asked for roughly ten choices in each of the two expressive groups, so pin the
  // counts down: adding an option is a deliberate act, silently losing one is not.
  it("ships at least ten headline motions and twelve backgrounds", () => {
    expect(HERO_TEXT_STYLES).toHaveLength(10);
    expect(BACKGROUND_PATTERNS).toHaveLength(12);
    expect(HEADLINE_STYLES.length).toBeGreaterThanOrEqual(6);
    expect(LOOK_GRADIENTS.map(({ id }) => id)).toContain("theme");
    expect(new Set(HERO_TEXT_STYLES.map(({ id }) => id)).size).toBe(HERO_TEXT_STYLES.length);
    expect(new Set(BACKGROUND_PATTERNS.map(({ id }) => id)).size).toBe(BACKGROUND_PATTERNS.length);
    expect(new Set(LOOK_GRADIENTS.map(({ id }) => id)).size).toBe(LOOK_GRADIENTS.length);
    expect(new Set(HEADLINE_STYLES.map(({ id }) => id)).size).toBe(HEADLINE_STYLES.length);
  });

  it("labels and explains every option so the studio never renders a blank tile", () => {
    for (const group of [HERO_TEXT_STYLES, BACKGROUND_PATTERNS, LOOK_GRADIENTS, HEADLINE_STYLES, FEATURED_STYLES]) {
      for (const option of group) {
        expect(option.id).toBeTruthy();
        expect(option.label.trim().length).toBeGreaterThan(0);
        expect(option.note.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("paces every headline motion so CSS always receives a duration", () => {
    for (const { id } of HERO_TEXT_STYLES) {
      const variables = getSiteLookVariables({ heroText: id, background: "grid", logo3d: true });
      expect(variables["--look-hero-duration"]).toMatch(/^\d+ms$/);
      expect(variables["--look-hero-stagger"]).toMatch(/^\d+ms$/);
    }
  });
});

describe("look option getters", () => {
  it("return the requested option and fall back to the first one", () => {
    expect(getLookPreset("cinematic").label).toBe("Dark cinematic");
    expect(getHeroTextStyle("mask").label).toBe("Mask reveal");
    expect(getHeroTextStyle("cascade").label).toBe("Cascade");
    expect(getBackgroundPattern("beams").label).toBe("Beams");
    expect(getBackgroundPattern("prism").label).toBe("Prism");
    expect(getLookGradient("sunset").label).toBe("Sunset");
    expect(getFeaturedStyle("rail").label).toBe("Poster rail");
    expect(getHeadlineStyle("etched").label).toBe("Etched");
    expect(getHeadlineStyle("missing")).toBe(HEADLINE_STYLES[0]);
    expect(getLookPreset("missing")).toBe(LOOK_PRESETS[0]);
    expect(getHeroTextStyle("missing")).toBe(HERO_TEXT_STYLES[0]);
    expect(getBackgroundPattern("missing")).toBe(BACKGROUND_PATTERNS[0]);
    expect(getLookGradient("missing")).toBe(LOOK_GRADIENTS[0]);
    expect(getFeaturedStyle("missing")).toBe(FEATURED_STYLES[0]);
  });
});

describe("getSiteLookVariables", () => {
  it("exposes headline pacing, pattern opacity, wash opacity and logo depth to CSS", () => {
    expect(getSiteLookVariables({ heroText: "rise", background: "grid", logo3d: true })).toEqual({
      "--look-hero-stagger": "55ms",
      "--look-hero-duration": "620ms",
      "--look-pattern-opacity": "1",
      "--look-wash-opacity": "0.85",
      "--look-logo-depth": "1",
    });
    expect(getSiteLookVariables({ heroText: "static" })).toEqual(expect.objectContaining({
      "--look-hero-stagger": "0ms",
      "--look-hero-duration": "0ms",
    }));
    expect(getSiteLookVariables({ background: "none" })["--look-pattern-opacity"]).toBe("0");
    expect(getSiteLookVariables({ logo3d: false })["--look-logo-depth"]).toBe("0");
    expect(getSiteLookVariables({ preset: "cinematic" })["--look-wash-opacity"]).toBe("1");
  });
});
