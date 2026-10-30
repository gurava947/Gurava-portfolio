import { describe, expect, it } from "vitest";
import {
  DEFAULT_THREE_3D,
  MAX_INSTANCES,
  MAX_PIXEL_RATIO,
  THREE_3D_LIMITS,
  THREE_3D_STYLES,
  THREE_3D_STYLE_OPTIONS,
  THREE_3D_VARIABLE_NAMES,
  describeThree3d,
  getThree3dAttributes,
  getThree3dScene,
  getThree3dStyle,
  getThree3dVariables,
  isThree3dActive,
  normalizeThree3d,
  resolveInstanceCount,
  resolvePixelRatio,
  sameThree3d,
} from "./three3d";

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
      "Interactive swarm · 720 instances · 2x max · 100% speed · pointer-reactive",
    );
    expect(describeThree3d({ style: "shelf", count: 160 }, 1)).toBe(
      "Project shelf · 160 instances · 1x max · 100% speed · fixed layout",
    );
  });
});
