import { describe, expect, it } from "vitest";
import {
  DEFAULT_FEATURE_RAIL,
  FEATURE_RAIL_ROOT_VARIABLES,
  RAIL_LAYOUTS,
  RAIL_LIMITS,
  getFeatureRailLocalVariables,
  getFeatureRailRootAttributes,
  getFeatureRailRootVariables,
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

describe("featureRail values published to the page", () => {
  it("leaves a rail nobody touched alone", () => {
    expect(getFeatureRailRootVariables(undefined)).toEqual({});
    expect(getFeatureRailRootVariables(DEFAULT_FEATURE_RAIL)).toEqual({});
    expect(getFeatureRailRootVariables({ cardWidth: "wide", gap: null })).toEqual({});
  });

  it("publishes only the numbers that were actually chosen", () => {
    const picked = getFeatureRailRootVariables({ cardWidth: 420, cardHeight: 260, gap: 32, padding: 24 });

    expect(picked).toEqual({
      "--fr-card-width": "420px",
      "--fr-card-basis": "min(420px, 100%)",
      "--fr-card-height": "260px",
      "--fr-gap": "32px",
      "--fr-padding": "24px",
    });
  });

  it("hands the catalog band a column count, in the name it already reads", () => {
    const picked = getFeatureRailRootVariables({ cardsPerView: 3, gap: 20 });

    expect(picked["--rail-cols"]).toBe("3");
    expect(picked["--fr-cards-per-view"]).toBe("3");
    expect(picked["--fr-basis"]).toBe("calc((100% - 40px) / 3)");
    expect(picked["--fr-grid"]).toBe("repeat(3, minmax(0, 1fr))");
    // The count owns the width, so the typed number must not fight it.
    expect(picked["--fr-card-basis"]).toBeUndefined();
  });

  it("keeps a shipped count shipped", () => {
    expect(getFeatureRailRootVariables({ cardsPerView: 0 })).toEqual({});
    expect(getFeatureRailRootVariables({ cardWidth: 300, cardsPerView: 0 })).toEqual({});
  });

  it("can take every published value back off again", () => {
    // useTheme clears this list before re-writing it, so a name the getter can emit but the list
    // omits would stay on the root forever after the visitor slid back to the shipped number.
    const emitted = RAIL_LAYOUTS.flatMap((layout) =>
      [0, 6].flatMap((cardsPerView) =>
        Object.keys(getFeatureRailRootVariables({
          layout: layout.id,
          cardWidth: 560,
          cardHeight: 560,
          gap: 48,
          cardsPerView,
          padding: 48,
        })),
      ),
    );

    expect([...new Set(emitted)].sort()).toEqual([...FEATURE_RAIL_ROOT_VARIABLES].sort());
  });

  it("spells the chrome switches out instead of leaving them away", () => {
    expect(getFeatureRailRootAttributes(DEFAULT_FEATURE_RAIL)).toEqual({
      "data-fr-layout": "carousel",
      "data-fr-wrap": "off",
      "data-fr-tall": "off",
      "data-fr-arrows": "on",
      "data-fr-indicators": "on",
      "data-fr-drag": "on",
    });
    expect(getFeatureRailRootAttributes({ layout: "grid", cardHeight: 200, arrows: false })).toEqual({
      ...getFeatureRailRootAttributes(DEFAULT_FEATURE_RAIL),
      "data-fr-layout": "grid",
      "data-fr-wrap": "on",
      "data-fr-tall": "on",
      "data-fr-arrows": "off",
    });
  });

  it("gives a component with the settings in hand the full set, under its own prefix", () => {
    const local = getFeatureRailLocalVariables(DEFAULT_FEATURE_RAIL);

    expect(Object.keys(local).sort()).toEqual([
      "--rail-basis",
      "--rail-card-height",
      "--rail-card-width",
      "--rail-cards-per-view",
      "--rail-gap",
      "--rail-grid",
      "--rail-padding",
    ]);
    expect(local["--rail-card-height"]).toBe("0px");
    expect(local["--rail-basis"]).toBe("min(300px, 100%)");

    expect(getFeatureRailLocalVariables({ cardsPerView: 2, gap: 10 })["--rail-basis"]).toBe("calc((100% - 10px) / 2)");
  });
});
