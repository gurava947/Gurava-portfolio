import { describe, expect, it } from "vitest";
import {
  DEFAULT_CARD_EFFECTS,
  getCardEffect,
  getCertificateEffect,
  getEffectVariables,
  getProjectEffect,
  normalizeCardEffects,
  sameEffectsSettings,
} from "./cardEffects";

describe("normalizeCardEffects", () => {
  it("keeps the current finish as the default", () => {
    expect(normalizeCardEffects()).toEqual(DEFAULT_CARD_EFFECTS);
    expect(DEFAULT_CARD_EFFECTS).toEqual({
      enabled: true,
      intensity: "medium",
      projects: "none",
      certificates: "none",
    });
  });

  it("falls back for unknown values and malformed input", () => {
    expect(normalizeCardEffects({ enabled: "yes", intensity: "huge", projects: "flip", certificates: "spin" }))
      .toEqual(DEFAULT_CARD_EFFECTS);
    expect(normalizeCardEffects(null)).toEqual(DEFAULT_CARD_EFFECTS);
    expect(normalizeCardEffects([])).toEqual(DEFAULT_CARD_EFFECTS);
  });

  it("keeps valid effect choices", () => {
    expect(normalizeCardEffects({
      enabled: false,
      intensity: "strong",
      projects: "halo",
      certificates: "spotlight",
    })).toEqual({
      enabled: false,
      intensity: "strong",
      projects: "halo",
      certificates: "spotlight",
    });
  });
});

describe("card effect helpers", () => {
  it("turns every effect off when the master switch is off", () => {
    const effects = normalizeCardEffects({ enabled: false, projects: "tilt", certificates: "foil" });
    expect(getCardEffect(effects, "projects")).toBe("none");
    expect(getCardEffect(effects, "certificates")).toBe("none");
  });

  it("maps intensity to CSS variables", () => {
    expect(getEffectVariables({ intensity: "subtle" })).toMatchObject({
      "--fx-tilt": "4deg",
      "--fx-lift": "3px",
      "--fx-glow": "0.55",
    });
    expect(getEffectVariables({ intensity: "strong" })).toMatchObject({
      "--fx-tilt": "10deg",
      "--fx-lift": "8px",
      "--fx-glow": "1",
    });
  });

  it("finds effect labels and compares normalized settings", () => {
    expect(getProjectEffect("reveal").label).toBe("Curtain reveal");
    expect(getProjectEffect("missing").id).toBe("none");
    expect(getCertificateEffect("foil").label).toBe("Foil sheen");
    expect(sameEffectsSettings(DEFAULT_CARD_EFFECTS, {})).toBe(true);
    expect(sameEffectsSettings(DEFAULT_CARD_EFFECTS, { projects: "tilt" })).toBe(false);
  });
});
