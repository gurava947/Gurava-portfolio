import { describe, expect, it } from "vitest";
import {
  DEFAULT_FEATURE_RAIL,
  RAIL_LAYOUTS,
  RAIL_LIMITS,
  normalizeFeatureRail,
  sameFeatureRail,
} from "./featureRail";

describe("featureRail settings", () => {
  it("has a default for every control the studio shows", () => {
    const normalized = normalizeFeatureRail(undefined);

    expect(normalized).toEqual(DEFAULT_FEATURE_RAIL);
    expect(Object.keys(DEFAULT_FEATURE_RAIL).sort()).toEqual([
      "arrows",
      "cardHeight",
      "cardWidth",
      "cardsPerView",
      "drag",
      "gap",
      "indicators",
      "layout",
      "padding",
      "wrap",
    ]);
  });

  it("keeps every number inside the range the sliders are built from", () => {
    ["cardWidth", "cardHeight", "gap", "cardsPerView", "padding"].forEach((key) => {
      const { min, max } = RAIL_LIMITS[key];

      expect(normalizeFeatureRail({ [key]: -500 })[key]).toBe(min);
      expect(normalizeFeatureRail({ [key]: 5000 })[key]).toBe(max);
    });
  });

  it("replaces anything that is not a whole number with the shipped value", () => {
    expect(normalizeFeatureRail({ cardWidth: "wide" }).cardWidth).toBe(DEFAULT_FEATURE_RAIL.cardWidth);
    expect(normalizeFeatureRail({ cardWidth: 300.6 }).cardWidth).toBe(301);
    expect(normalizeFeatureRail({ gap: null }).gap).toBe(DEFAULT_FEATURE_RAIL.gap);
  });

  it("only takes a layout it ships and only takes real booleans for the switches", () => {
    expect(normalizeFeatureRail({ layout: "marquee" }).layout).toBe(DEFAULT_FEATURE_RAIL.layout);
    expect(normalizeFeatureRail({ arrows: "yes" }).arrows).toBe(DEFAULT_FEATURE_RAIL.arrows);
    expect(normalizeFeatureRail({ drag: 1 }).drag).toBe(DEFAULT_FEATURE_RAIL.drag);
    expect(normalizeFeatureRail({ wrap: false }).wrap).toBe(false);
  });

  it("wraps for the layouts that are not a scrolling row, but leaves a carousel alone", () => {
    RAIL_LAYOUTS.filter((layout) => layout.id !== "carousel").forEach((layout) => {
      expect(normalizeFeatureRail({ layout: layout.id, wrap: false }).wrap).toBe(true);
    });

    expect(normalizeFeatureRail({ layout: "carousel", wrap: true }).wrap).toBe(true);
    expect(normalizeFeatureRail({ layout: "carousel", wrap: false }).wrap).toBe(false);
  });

  it("reads an unchanged group as unchanged, even when it arrives unnormalised", () => {
    expect(sameFeatureRail({}, DEFAULT_FEATURE_RAIL)).toBe(true);
    expect(sameFeatureRail({ cardWidth: 9999 }, DEFAULT_FEATURE_RAIL)).toBe(false);
    expect(sameFeatureRail({ cardWidth: 9999 }, normalizeFeatureRail({ cardWidth: 9999 }))).toBe(true);
  });
});
