import { describe, expect, it } from "vitest";
import {
  DEFAULT_THREE_3D,
  DEFAULT_THREE_3D_SURFACE_PRESENCE,
  MAX_INSTANCES,
  MAX_PIXEL_RATIO,
  STAGE_PAGE_INK,
  THREE_3D_GOVERNOR,
  THREE_3D_LIMITS,
  THREE_3D_STYLES,
  THREE_3D_STYLE_OPTIONS,
  THREE_3D_SURFACES,
  THREE_3D_VARIABLE_NAMES,
  describeThree3d,
  describeThree3dLegibility,
  getThree3dAttributes,
  getThree3dScene,
  getThree3dStyle,
  getThree3dSurfaceFactor,
  getThree3dVariables,
  isThree3dActive,
  normalizeThree3d,
  resolveInstanceCount,
  resolvePixelRatio,
  resolveThree3dPalette,
  sameThree3d,
} from "./three3d";
import { blendOver, contrastRatio } from "../utils/stageColor";

describe("the 3D style list", () => {
  it("offers ten modern styles and keeps the shipped flat look as the eleventh choice", () => {
    expect(THREE_3D_STYLES).toHaveLength(10);
    expect(THREE_3D_STYLE_OPTIONS).toHaveLength(11);
    expect(new Set(THREE_3D_STYLE_OPTIONS.map(({ id }) => id)).size).toBe(11);
  });

  it("carries exactly one interactive particle system and one fixed project shelf", () => {
    const particles = THREE_3D_STYLES.filter(({ scene }) => scene.kind === "particles");
    const shelf = THREE_3D_STYLES.filter(({ scene }) => scene.kind === "shelf");
    expect(shelf.map(({ id }) => id)).toEqual(["shelf"]);
    expect(particles.length).toBeGreaterThan(1);
    expect(getThree3dScene({ style: "swarm" }).arrangement).toBe("field");
    expect(getThree3dScene({ style: "shelf" }).kind).toBe("shelf");
  });

  it("gives every style a scene the engine knows how to build", () => {
    const kinds = new Set(["particles", "grid", "shelf"]);
    const arrangements = new Set(["field", "vortex", "orbit", "helix", "wave", "grid", "grid3d", "scatter", "deck"]);
    const shapes = new Set(["sphere", "ribbon", "card", "box", "octahedron", "tetrahedron"]);
    THREE_3D_STYLES.forEach(({ id, label, note, scene }) => {
      expect([id, label, note].every((part) => typeof part === "string" && part.length > 3), id).toBe(true);
      expect(kinds.has(scene.kind), `${id} kind`).toBe(true);
      expect(arrangements.has(scene.arrangement), `${id} arrangement`).toBe(true);
      expect(shapes.has(scene.shape), `${id} shape`).toBe(true);
      expect(scene.speed).toBeGreaterThan(0);
      expect(scene.size).toBeGreaterThan(0);
    });
  });
});

describe("normalizeThree3d", () => {
  it("is off for missing or invalid input, so nothing 3D is live by default", () => {
    expect(normalizeThree3d()).toEqual(DEFAULT_THREE_3D);
    expect(normalizeThree3d("swarm")).toEqual(DEFAULT_THREE_3D);
    expect(normalizeThree3d({ style: "hologram", count: "lots", pointer: "yes", speed: null }))
      .toEqual(DEFAULT_THREE_3D);
    expect(DEFAULT_THREE_3D.style).toBe("off");
    expect(isThree3dActive(DEFAULT_THREE_3D)).toBe(false);
    expect(isThree3dActive()).toBe(false);
  });

  it("snaps numbers onto the allowed steps and clamps the range", () => {
    expect(normalizeThree3d({ count: 737, size: 6.4, depth: 5.9, brightness: 63 })).toMatchObject({
      count: 720,
      size: 6,
      depth: 6,
      brightness: 65,
    });
    expect(normalizeThree3d({ count: 880, speed: 400, size: 40, depth: -3, brightness: 4 })).toMatchObject({
      count: 880,
      speed: THREE_3D_LIMITS.speed.max,
      size: THREE_3D_LIMITS.size.max,
      depth: THREE_3D_LIMITS.depth.min,
      brightness: THREE_3D_LIMITS.brightness.min,
    });
  });

  it("keeps fractional steps free of floating point noise", () => {
    expect(normalizeThree3d({ pixelRatioCap: 1.75 }).pixelRatioCap).toBe(1.75);
    expect(String(normalizeThree3d({ pixelRatioCap: 1 }).pixelRatioCap)).toBe("1");
    expect(normalizeThree3d({ pixelRatioCap: 0.5 }).pixelRatioCap).toBe(1);
  });

  it("refuses a device ratio above the two times ceiling", () => {
    expect(THREE_3D_LIMITS.pixelRatioCap.max).toBe(MAX_PIXEL_RATIO);
    expect(normalizeThree3d({ pixelRatioCap: 8 }).pixelRatioCap).toBe(MAX_PIXEL_RATIO);
    expect(normalizeThree3d({ pixelRatioCap: 3 }).pixelRatioCap).toBe(MAX_PIXEL_RATIO);
    expect(normalizeThree3d({ pixelRatioCap: 1.5 }).pixelRatioCap).toBe(1.5);
  });
});

describe("resolvePixelRatio", () => {
  it("caps a high-DPI device at two, whatever the setting asks for", () => {
    expect(resolvePixelRatio(3, 3)).toBe(2);
    expect(resolvePixelRatio(2.5, MAX_PIXEL_RATIO)).toBe(2);
    expect(resolvePixelRatio(1, 2)).toBe(1);
    expect(resolvePixelRatio(1.5, 1)).toBe(1);
  });

  it("survives a device that reports nothing usable", () => {
    expect(resolvePixelRatio(undefined, 2)).toBe(1);
    expect(resolvePixelRatio(0, 2)).toBe(1);
    expect(resolvePixelRatio(Number.NaN, 2)).toBe(1);
    expect(resolvePixelRatio("2", 2)).toBe(2);
  });
});

describe("resolveInstanceCount", () => {
  it("keeps the slider ceiling below the ceiling the stage is built to", () => {
    expect(THREE_3D_LIMITS.count.max).toBeLessThanOrEqual(MAX_INSTANCES);
  });

  it("never allocates past either ceiling", () => {
    expect(resolveInstanceCount({ count: 1800 })).toBe(1800);
    expect(resolveInstanceCount({ count: 999999 })).toBe(THREE_3D_LIMITS.count.max);
    expect(resolveInstanceCount(DEFAULT_THREE_3D)).toBe(DEFAULT_THREE_3D.count);
  });
});

describe("sameThree3d", () => {
  it("only treats fully equal settings as equal", () => {
    expect(sameThree3d(DEFAULT_THREE_3D, { ...DEFAULT_THREE_3D })).toBe(true);
    expect(sameThree3d(DEFAULT_THREE_3D, { ...DEFAULT_THREE_3D, style: "vortex" })).toBe(false);
    expect(sameThree3d(DEFAULT_THREE_3D, { ...DEFAULT_THREE_3D, count: 900 })).toBe(false);
    expect(sameThree3d(DEFAULT_THREE_3D, { ...DEFAULT_THREE_3D, scrim: false })).toBe(false);
  });

  it("compares normalised values, so a slider position and its snapped number agree", () => {
    expect(sameThree3d({ count: 737 }, { count: 720 })).toBe(true);
    expect(sameThree3d({ pixelRatioCap: 2 }, { pixelRatioCap: 6 })).toBe(true);
  });
});

describe("getThree3dAttributes and getThree3dVariables", () => {
  it("publish nothing while the stage is off", () => {
    expect(getThree3dAttributes(DEFAULT_THREE_3D)).toEqual({});
    expect(getThree3dVariables(DEFAULT_THREE_3D)).toEqual({});
    expect(getThree3dAttributes()).toEqual({});
  });

  it("mark the active style, its kind and only the particle styles as pointer driven", () => {
    expect(getThree3dAttributes({ style: "swarm" })).toEqual({
      "data-three3d": "swarm",
      "data-three3d-kind": "particles",
      "data-three3d-scrim": "true",
      "data-three3d-pointer": "true",
    });
    expect(getThree3dAttributes({ style: "swarm", pointer: false })["data-three3d-pointer"]).toBe("false");
    expect(getThree3dAttributes({ style: "shelf" })["data-three3d-kind"]).toBe("shelf");
    expect(getThree3dAttributes({ style: "ripple" })["data-three3d-pointer"]).toBe("false");
  });

  it("publishes brightness as the one control the stylesheet owns", () => {
    expect(getThree3dVariables({ style: "vortex" })).toEqual({ "--three3d-brightness": "0.6" });
    expect(getThree3dVariables({ style: "vortex", brightness: 40 })).toEqual({ "--three3d-brightness": "0.4" });
    expect(getThree3dVariables({ style: "vortex", depth: 3 })).toEqual({ "--three3d-brightness": "0.6" });
    expect(Object.keys(getThree3dVariables({ style: "vortex", brightness: 40 })))
      .toEqual([...THREE_3D_VARIABLE_NAMES]);
  });
});

describe("getThree3dStyle", () => {
  it("reads a style back out of an id and falls back to off", () => {
    expect(getThree3dStyle("shelf").label).toBe("Project shelf");
    expect(getThree3dStyle("nope")).toBe(THREE_3D_STYLE_OPTIONS[0]);
    expect(getThree3dStyle(undefined).id).toBe("off");
  });
});

describe("describeThree3d", () => {
  it("says the flat design is live while nothing is chosen", () => {
    expect(describeThree3d(DEFAULT_THREE_3D)).toBe("3D off — the flat design is live");
  });

  it("reports the real instance count and capped ratio for a chosen style", () => {
    expect(describeThree3d({ style: "swarm", count: 720 }, 3)).toBe(
      "Interactive swarm · 720 instances · 2x max · 100% speed · pointer-reactive · frame-adaptive",
    );
    // The shelf is a fixed layout: holding back frames there costs the cards, not the motion, so the
    // governor does not claim to be working on it.
    expect(describeThree3d({ style: "shelf", count: 160 }, 1)).toBe(
      "Project shelf · 160 instances · 1x max · 100% speed · fixed layout",
    );
    expect(describeThree3d({ style: "swarm", adaptive: false }, 1)).toContain("pointer-reactive");
    expect(describeThree3d({ style: "swarm", adaptive: false }, 1)).not.toContain("frame-adaptive");
    expect(describeThree3d({ style: "swarm", colors: { primary: "#ff0000" } }, 1)).toContain("1 custom colour");
  });
});

describe("the surfaces of one canvas", () => {
  it("names a surface for every part of the site and a fallback for the rest", () => {
    expect(THREE_3D_SURFACES.map(({ id }) => id)).toEqual(["hero", "projects", "certificates", "page"]);
    expect(THREE_3D_SURFACES.at(-1).id).toBe("page");
  });

  it("keeps a wall of cards quieter than the landing page", () => {
    expect(DEFAULT_THREE_3D_SURFACE_PRESENCE.hero).toBe(100);
    expect(DEFAULT_THREE_3D_SURFACE_PRESENCE.projects).toBeLessThan(DEFAULT_THREE_3D_SURFACE_PRESENCE.hero);
    expect(DEFAULT_THREE_3D_SURFACE_PRESENCE.page).toBeLessThan(DEFAULT_THREE_3D_SURFACE_PRESENCE.projects);
  });

  it("turns presence into the fraction of the field the engine draws", () => {
    expect(getThree3dSurfaceFactor({ surfaces: { projects: 40 } }, "projects")).toMatchObject({
      surface: "projects",
      presence: 40,
      density: 0.4,
    });
  });

  it("compresses depth so a thin field still reads as three-dimensional", () => {
    const full = getThree3dSurfaceFactor({ surfaces: { hero: 100 } }, "hero");
    const thin = getThree3dSurfaceFactor({ surfaces: { hero: 0 } }, "hero");
    expect(full.depth).toBe(1);
    // Not zero: at 0% presence the field is invisible anyway, and at any real presence the parallax
    // survives as a proportion of the density rather than vanishing with it.
    expect(thin.depth).toBeGreaterThan(0.5);
    expect(thin.depth).toBeLessThan(full.depth);
  });

  it("answers an unknown surface with the fallback instead of the landing profile", () => {
    expect(getThree3dSurfaceFactor({}, "playground").surface).toBe("page");
    expect(getThree3dSurfaceFactor({}, undefined).surface).toBe("page");
  });

  it("clamps a hand-edited presence back onto the dial", () => {
    expect(normalizeThree3d({ surfaces: { hero: 900, projects: -20 } }).surfaces).toEqual({
      ...DEFAULT_THREE_3D_SURFACE_PRESENCE,
      hero: 150,
      projects: 0,
    });
  });
});

describe("the guarded stage palette", () => {
  const dark = { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6", mode: "dark" };
  const light = { primary: "#6d5ce8", secondary: "#0891b2", accent: "#db2777", mode: "light" };

  it("hands back the theme untouched while no stop is picked", () => {
    const resolved = resolveThree3dPalette(DEFAULT_THREE_3D, dark);
    expect([resolved.primary, resolved.secondary, resolved.accent]).toEqual(["#8b5cf6", "#22d3ee", "#f472b6"]);
    expect(resolved.adjusted).toEqual([]);
    expect(resolved.mode).toBe("dark");
  });

  it("judges a colour by the wash it produces at the current brightness", () => {
    const atDefault = resolveThree3dPalette(DEFAULT_THREE_3D, dark).coverage;
    const atFull = resolveThree3dPalette({ ...DEFAULT_THREE_3D, brightness: 100 }, dark).coverage;
    expect(atFull).toBeGreaterThan(atDefault);
    // Light mode blends normally at a higher material alpha than dark mode's additive pass.
    expect(resolveThree3dPalette(DEFAULT_THREE_3D, light).coverage).toBeGreaterThan(atDefault);
  });

  it("pulls an unreadable stop toward the page instead of refusing it", () => {
    // A black start colour in light mode darkens the strip the ramp paints over to under 3:1 against
    // the body copy; the guard has to move it, and it has to say that it did.
    const resolved = resolveThree3dPalette(
      { ...DEFAULT_THREE_3D, colors: { ...DEFAULT_THREE_3D.colors, primary: "#000000" } },
      light,
    );
    expect(resolved.adjusted).toEqual(["primary"]);
    expect(resolved.primary).not.toBe("#000000");
    const coverage = resolveThree3dPalette(DEFAULT_THREE_3D, light).coverage;
    expect(contrastRatio(blendOver(resolved.primary, STAGE_PAGE_INK.light.background, coverage), STAGE_PAGE_INK.light.text))
      .toBeGreaterThanOrEqual(4.5);
    // The stops nobody touched are never corrected, so an unchanged store paints what shipped.
    expect(resolved.secondary).toBe("#0891b2");
    expect(resolved.accent).toBe("#db2777");
  });

  it("keeps a colour that is already legible exactly as picked", () => {
    const resolved = resolveThree3dPalette(
      { ...DEFAULT_THREE_3D, colors: { ...DEFAULT_THREE_3D.colors, accent: "#1a1a2e" } },
      dark,
    );
    expect(resolved.accent).toBe("#1a1a2e");
    expect(resolved.adjusted).toEqual([]);
  });

  it("reads a malformed pick as following the theme", () => {
    const resolved = resolveThree3dPalette(
      { ...DEFAULT_THREE_3D, colors: { ...DEFAULT_THREE_3D.colors, primary: "not a colour" } },
      dark,
    );
    expect(resolved.primary).toBe("#8b5cf6");
    expect(resolved.adjusted).toEqual([]);
  });

  it("reports legibility only for the stops the visitor picked", () => {
    expect(describeThree3dLegibility(DEFAULT_THREE_3D, dark)).toBeNull();
    const report = describeThree3dLegibility(
      { ...DEFAULT_THREE_3D, colors: { ...DEFAULT_THREE_3D.colors, primary: "#000000" } },
      light,
    );
    expect(report.adjusted).toEqual(["primary"]);
    expect(report.worstRatio).toBeGreaterThanOrEqual(4.5);
    expect(report.coverage).toBeCloseTo(resolveThree3dPalette(DEFAULT_THREE_3D, light).coverage);
  });

  it("treats a guarded pick and its corrected colour as different settings", () => {
    const picked = { ...DEFAULT_THREE_3D, colors: { ...DEFAULT_THREE_3D.colors, primary: "#000000" } };
    expect(sameThree3d(picked, DEFAULT_THREE_3D)).toBe(false);
    expect(sameThree3d(picked, { ...picked })).toBe(true);
  });
});

describe("the frame-rate governor", () => {
  it("asks for a frame budget derived from the display, not assumed", () => {
    // Two frames at the measured refresh period, so a 60Hz screen starts degrading at ~33ms and a
    // 120Hz screen at ~17ms, and neither is allowed to ask for less than a frame's worth of slack.
    expect(THREE_3D_GOVERNOR.targetMultiplier).toBe(2);
    expect(THREE_3D_GOVERNOR.minTargetFrameMs).toBeCloseTo(1000 / 60, 1);
    expect(THREE_3D_GOVERNOR.maxTargetFrameMs).toBe(33);
  });

  it("leaves the stage somewhere it can still read as a stage", () => {
    expect(THREE_3D_GOVERNOR.floor).toBeGreaterThan(0.3);
    expect(THREE_3D_GOVERNOR.floor).toBeLessThan(1);
    expect(THREE_3D_GOVERNOR.ceiling).toBe(1);
    expect(THREE_3D_GOVERNOR.step).toBeGreaterThan(0);
    expect(THREE_3D_GOVERNOR.settleMs).toBeGreaterThan(0);
  });

  it("is on by default and off is a setting, not a missing value", () => {
    expect(DEFAULT_THREE_3D.adaptive).toBe(true);
    expect(normalizeThree3d({ adaptive: false }).adaptive).toBe(false);
    expect(normalizeThree3d({ adaptive: "yes" }).adaptive).toBe(true);
  });
});
