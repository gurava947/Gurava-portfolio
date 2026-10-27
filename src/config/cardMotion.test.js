import { describe, expect, it } from "vitest";
import {
  DEFAULT_SHELF_MOTION,
  SHELF_MOTION_PRESETS,
  getShelfMotionPreset,
  getShelfMotionStyles,
  normalizeShelfMotion,
  sameShelfMotion,
} from "./cardMotion";

describe("normalizeShelfMotion", () => {
  it("falls back to the default shelf motion for missing or invalid input", () => {
    expect(normalizeShelfMotion()).toEqual(DEFAULT_SHELF_MOTION);
    expect(normalizeShelfMotion("depth")).toEqual(DEFAULT_SHELF_MOTION);
    expect(normalizeShelfMotion({ preset: "spin", intensity: "wild", duration: "fast", delay: null }))
      .toEqual(DEFAULT_SHELF_MOTION);
  });

  it("keeps valid presets and snaps durations into the allowed range", () => {
    expect(normalizeShelfMotion({ preset: "glass", intensity: "strong", duration: 480, delay: 90 }))
      .toEqual({ preset: "glass", intensity: "strong", duration: 480, delay: 90 });
    expect(normalizeShelfMotion({ preset: "depth", duration: 2000, delay: -40 }))
      .toEqual({ ...DEFAULT_SHELF_MOTION, preset: "depth", duration: 600, delay: 0 });
    expect(normalizeShelfMotion({ duration: 233, delay: 64 }))
      .toEqual({ ...DEFAULT_SHELF_MOTION, duration: 240, delay: 60 });
  });

  it("only treats fully equal settings as the same motion", () => {
    expect(sameShelfMotion(DEFAULT_SHELF_MOTION, { ...DEFAULT_SHELF_MOTION })).toBe(true);
    expect(sameShelfMotion(DEFAULT_SHELF_MOTION, { ...DEFAULT_SHELF_MOTION, preset: "fade" })).toBe(false);
    expect(sameShelfMotion(DEFAULT_SHELF_MOTION, { ...DEFAULT_SHELF_MOTION, duration: 400 })).toBe(false);
  });

  it("accepts the stacked glass and reflection presets", () => {
    expect(normalizeShelfMotion({ preset: "stack" }).preset).toBe("stack");
    expect(normalizeShelfMotion({ preset: "reflect" }).preset).toBe("reflect");
  });
});

describe("getShelfMotionPreset", () => {
  it("returns the requested preset and falls back to the first preset", () => {
    expect(getShelfMotionPreset("depth")).toBe(SHELF_MOTION_PRESETS.find(({ id }) => id === "depth"));
    expect(getShelfMotionPreset("stack").label).toBe("Stacked glass");
    expect(getShelfMotionPreset("reflect").label).toBe("Reflection");
    expect(getShelfMotionPreset("missing")).toBe(SHELF_MOTION_PRESETS[0]);
  });
});

describe("getShelfMotionStyles", () => {
  it("exposes duration, delay and intensity variables to CSS", () => {
    expect(getShelfMotionStyles({ preset: "slide", intensity: "subtle", duration: 240, delay: 30 }))
      .toEqual({
        "--shelf-motion-duration": "240ms",
        "--shelf-motion-delay": "30ms",
        "--shelf-motion-shift": "10px",
        "--shelf-motion-tilt": "2deg",
        "--shelf-motion-glow": "0.45",
        "--shelf-motion-scale": "1.004",
        "--shelf-motion-fade-scale": "0.975",
      });
    expect(getShelfMotionStyles({ intensity: "strong" })["--shelf-motion-shift"]).toBe("24px");
    expect(getShelfMotionStyles({ intensity: "strong" })["--shelf-motion-tilt"]).toBe("5deg");
  });
});
