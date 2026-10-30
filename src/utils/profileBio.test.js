import { describe, expect, it } from "vitest";
import { fillBioTokens, profileBioFigures } from "./profileBio";

describe("fillBioTokens", () => {
  it("replaces every token the figures can answer", () => {
    expect(fillBioTokens("{python} briefs and {static} builds", { python: 129, static: 41 })).toBe(
      "129 briefs and 41 builds",
    );
  });

  it("keeps a zero rather than treating it as missing", () => {
    expect(fillBioTokens("{responsive} sections", { responsive: 0 })).toBe("0 sections");
  });

  it("leaves no number where the catalogue has none, and no dangling space", () => {
    expect(fillBioTokens("{python} briefs — running in the browser.", {})).toBe(
      "briefs — running in the browser.",
    );
  });

  it("invents nothing for a token it was never given", () => {
    expect(fillBioTokens("Built {projects} things.", { name: "G" })).toBe("Built things.");
  });

  it("returns an empty string for copy that is not there", () => {
    expect(fillBioTokens("", { name: "G" })).toBe("");
    expect(fillBioTokens(undefined, { name: "G" })).toBe("");
  });
});

describe("profileBioFigures", () => {
  it("reads the counts off the collections the shelf already shows", () => {
    const figures = profileBioFigures(
      { name: "  Guravva  " },
      [
        { id: "python", count: 129 },
        { id: "responsive", count: 51 },
        { id: "static", count: 41 },
      ],
    );

    expect(figures).toEqual({ name: "Guravva", python: 129, responsive: 51, static: 41 });
  });

  it("survives a caller with no catalogue to quote", () => {
    expect(profileBioFigures({ name: "" })).toEqual({ name: "" });
  });
});
