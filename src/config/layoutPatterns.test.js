import { describe, expect, it } from "vitest";
import {
  DEFAULT_LAYOUT_SETTINGS,
  LAYOUT_AREAS,
  LAYOUT_PATTERNS,
  getLayoutPatternsForArea,
  getPatternAreas,
  isLayoutPatternSuitable,
  normalizeLayoutSettings,
  sameLayoutSettings,
} from "./layoutPatterns";

const AREA_IDS = LAYOUT_AREAS.map((area) => area.id);

describe("layout patterns", () => {
  it("only targets known areas and includes the default pattern everywhere", () => {
    LAYOUT_PATTERNS.forEach((pattern) => {
      pattern.areas.forEach((areaId) => expect(AREA_IDS).toContain(areaId));
    });
    const defaultPattern = LAYOUT_PATTERNS.find((pattern) => pattern.id === "default");
    expect([...defaultPattern.areas].sort()).toEqual([...AREA_IDS].sort());
  });

  it("offers both card and page layouts without showing unsuitable ones", () => {
    expect(isLayoutPatternSuitable("masonry", "projectCards")).toBe(true);
    expect(isLayoutPatternSuitable("masonry", "projectPages")).toBe(false);
    expect(isLayoutPatternSuitable("full-screen", "internalPages")).toBe(true);
    expect(isLayoutPatternSuitable("grid", "certificateCards")).toBe(true);
    expect(getLayoutPatternsForArea("projectPages").some((pattern) => pattern.id === "masonry")).toBe(false);
  });

  it("normalizes saved values and falls back for unsupported patterns", () => {
    expect(normalizeLayoutSettings()).toEqual(DEFAULT_LAYOUT_SETTINGS);
    const normalized = normalizeLayoutSettings({
      projectCards: "masonry",
      certificateCards: "full-screen",
      projectPages: "holy-grail",
      internalPages: "split-screen",
      extra: "ignored",
    });
    expect(normalized).toEqual({
      projectCards: "masonry",
      certificateCards: "default",
      projectPages: "holy-grail",
      internalPages: "split-screen",
    });
  });

  it("detects equal applied and draft layouts", () => {
    expect(sameLayoutSettings(DEFAULT_LAYOUT_SETTINGS, { ...DEFAULT_LAYOUT_SETTINGS })).toBe(true);
    expect(sameLayoutSettings(DEFAULT_LAYOUT_SETTINGS, { ...DEFAULT_LAYOUT_SETTINGS, projectCards: "grid" })).toBe(false);
  });

  it("resolves every area a pattern can apply to", () => {
    expect(getPatternAreas("two-column")).toEqual(AREA_IDS);
    expect(getPatternAreas("masonry")).toEqual(["projectCards", "certificateCards"]);
    expect(getPatternAreas("unknown")).toEqual([]);
  });
});
