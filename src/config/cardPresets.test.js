import { describe, expect, it } from "vitest";
import { CARD_QUICK_CONTROLS, CARD_STYLE_PRESETS, getActiveCardPresetId } from "./cardPresets";
import { DEFAULT_CARD_UI_SETTINGS, normalizeCardUISettings } from "../hooks/useTheme";

describe("card studio presets", () => {
  it("provides a complete, normalized settings object for every preset", () => {
    const defaultKeys = Object.keys(DEFAULT_CARD_UI_SETTINGS).sort();
    CARD_STYLE_PRESETS.forEach((preset) => {
      expect(Object.keys(preset.settings).sort()).toEqual(defaultKeys);
      expect(normalizeCardUISettings(preset.settings)).toEqual(preset.settings);
    });
  });

  it("detects the active preset and clears it after a manual change", () => {
    expect(CARD_STYLE_PRESETS).toHaveLength(5);
    expect(getActiveCardPresetId(DEFAULT_CARD_UI_SETTINGS)).toBe("studio");
    const bento = CARD_STYLE_PRESETS.find((preset) => preset.id === "bento");
    expect(getActiveCardPresetId(bento.settings)).toBe("bento");
    expect(getActiveCardPresetId({ ...bento.settings, radius: 31 })).toBe("");
  });

  it("ships five distinct layouts with motion metadata", () => {
    expect(new Set(CARD_STYLE_PRESETS.map((preset) => preset.settings.cardLayout)).size).toBe(5);
    CARD_STYLE_PRESETS.forEach((preset) => {
      expect(preset.motion).toBeTruthy();
      expect(preset.note).toBeTruthy();
    });
  });
});

describe("card studio quick controls", () => {
  it("offers a valid active option for the default card settings", () => {
    CARD_QUICK_CONTROLS.forEach((control) => {
      const active = control.getActive(DEFAULT_CARD_UI_SETTINGS);
      expect(control.options.some((option) => option.value === active)).toBe(true);
    });
  });

  it("keeps every quick patch inside the supported settings ranges", () => {
    CARD_QUICK_CONTROLS.forEach((control) => {
      control.options.forEach((option) => {
        const next = { ...DEFAULT_CARD_UI_SETTINGS, ...option.patch };
        expect(normalizeCardUISettings(next)).toEqual(next);
      });
    });
  });
});
