import { describe, expect, it } from "vitest";
import {
  DEFAULT_SHELF_3D,
  SHELF_3D_LAYOUT_PRESETS,
  SHELF_3D_MODELS,
  getShelf3dActiveModel,
  getShelf3dAttributes,
  getShelf3dDensity,
  getShelf3dLayoutPreset,
  getShelf3dStyles,
  isShelf3dGrid,
  normalizeShelf3d,
  sameShelf3d,
} from "./shelf3d";

describe("normalizeShelf3d", () => {
  it("falls back to the shipped shelf geometry for missing or invalid input", () => {
    expect(normalizeShelf3d()).toEqual(DEFAULT_SHELF_3D);
    expect(normalizeShelf3d("wall")).toEqual(DEFAULT_SHELF_3D);
    expect(normalizeShelf3d({ columns: "many", cardWidth: null, gap: "wide", model: "cube", panes: "yes" }))
      .toEqual(DEFAULT_SHELF_3D);
  });

  it("snaps numbers onto the allowed steps and clamps the range", () => {
    expect(normalizeShelf3d({ cardWidth: 517, cardHeight: 401, gap: 25 })).toMatchObject({
      cardWidth: 520,
      cardHeight: 400,
      gap: 26,
    });
    expect(normalizeShelf3d({ columns: 9, rows: 9, cardWidth: 4000, perspective: 100 })).toMatchObject({
      columns: 3,
      rows: 2,
      cardWidth: 880,
      perspective: 500,
    });
  });

  it("only treats fully equal settings as the same geometry", () => {
    expect(sameShelf3d(DEFAULT_SHELF_3D, { ...DEFAULT_SHELF_3D })).toBe(true);
    expect(sameShelf3d(DEFAULT_SHELF_3D, { ...DEFAULT_SHELF_3D, columns: 2 })).toBe(false);
    expect(sameShelf3d(DEFAULT_SHELF_3D, { ...DEFAULT_SHELF_3D, reflection: false })).toBe(false);
  });

  it("matches the presets it publishes", () => {
    SHELF_3D_LAYOUT_PRESETS.forEach(({ id, layout }) => {
      expect(getShelf3dLayoutPreset(normalizeShelf3d(layout))?.id).toBe(id);
    });
    SHELF_3D_MODELS.forEach(({ id, values }) => {
      expect(getShelf3dActiveModel(values)?.id).toBe(id);
    });
    expect(getShelf3dLayoutPreset({ columns: 2, rows: 1, cardWidth: 500, cardHeight: 476, gap: 22 })).toBeNull();
    expect(getShelf3dActiveModel({ ...DEFAULT_SHELF_3D, tilt: 11 })).toBeNull();
  });

  it("reads the spacing shortcut back out of the gap", () => {
    expect(getShelf3dDensity({ gap: 12 }).id).toBe("compact");
    expect(getShelf3dDensity(DEFAULT_SHELF_3D).id).toBe("balanced");
    expect(getShelf3dDensity({ gap: 30 })).toBeNull();
  });
});

describe("getShelf3dStyles", () => {
  it("emits nothing at all for the shipped default, so the stylesheet keeps its measures", () => {
    expect(getShelf3dStyles(DEFAULT_SHELF_3D)).toEqual({});
    expect(getShelf3dStyles()).toEqual({});
    expect(isShelf3dGrid(DEFAULT_SHELF_3D)).toBe(false);
  });

  it("emits only the properties the user moved", () => {
    expect(getShelf3dStyles({ ...DEFAULT_SHELF_3D, cardWidth: 560 })).toEqual({ "--shelf-3d-card-width": "560px" });
    expect(getShelf3dStyles({ ...DEFAULT_SHELF_3D, tilt: 15 })).toEqual({
      "--shelf-3d-tilt": "-15deg",
      "--shelf-3d-tilt-open": "-10deg",
    });
    expect(getShelf3dStyles({ ...DEFAULT_SHELF_3D, depth: 56, lift: 5 })).toEqual({
      "--shelf-3d-depth": "-56px",
      "--shelf-3d-lift": "5deg",
    });
  });

  it("publishes the grid counts once the shelf stops being a single lane", () => {
    expect(getShelf3dStyles({ ...DEFAULT_SHELF_3D, columns: 2 })).toEqual({
      "--shelf-3d-columns": "2",
      "--shelf-3d-rows": "1",
    });
    expect(isShelf3dGrid({ ...DEFAULT_SHELF_3D, rows: 2 })).toBe(true);
  });
});

describe("getShelf3dAttributes", () => {
  it("adds no data attribute while the shelf is at its shipped look", () => {
    expect(getShelf3dAttributes(DEFAULT_SHELF_3D)).toEqual({});
  });

  it("marks the grid and each switched-off part", () => {
    expect(getShelf3dAttributes({ ...DEFAULT_SHELF_3D, columns: 3, rows: 2 })).toEqual({ "data-shelf-3d-grid": "true" });
    expect(getShelf3dAttributes({ ...DEFAULT_SHELF_3D, panes: false, reflection: false, stack: false })).toEqual({
      "data-shelf-3d-panes": "off",
      "data-shelf-3d-reflection": "off",
      "data-shelf-3d-stack": "off",
    });
  });
});
