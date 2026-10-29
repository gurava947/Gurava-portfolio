import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// Each headline word is its own inline-block span so the Look studio can stagger it. With
// `white-space: pre` a span could not break internally, so a word wider than its column — measured
// in Chrome at 320px, "Denominations" needs 327px while the headline box is 296px — hung past the
// h1 and `.lab-detail-hero { overflow: hidden }` cut it off. `pre-wrap` allows the break, and
// `overflow-wrap: anywhere` rather than `break-word` is what lets an inline-block shrink to it:
// break-word is excluded from min-content sizing, so the span kept sizing itself to the whole word.

const BASE = readFileSync("src/styles/site-look.css", "utf8");
const STUDIO = readFileSync("src/styles/site-look-studio.css", "utf8");
const DETAIL = readFileSync("src/styles/project-detail-look.css", "utf8");

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

// Every innermost rule in a file. `[^{}]*` cannot cross a nested `{`, so an @media prelude never
// becomes a selector — the scan resumes at the first rule inside it.
function rules(css) {
  return [...strip(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .map(([, selector, body]) => ({
      selector: selector.trim(),
      properties: new Set([...body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:/g)].map((m) => m[1])),
    }));
}

function ruleFor(css, selector) {
  return rules(css).find((rule) => rule.selector === selector);
}

describe("hero word wrapping", () => {
  it("lets a headline word break inside its own span", () => {
    const rule = ruleFor(BASE, ".hero-word");
    expect(rule, ".hero-word must still exist in site-look.css").toBeTruthy();
    const body = strip(BASE).match(/\.hero-word\s*\{([^{}]*)\}/)[1];
    expect(body).toMatch(/white-space:\s*pre-wrap/);
    expect(body).toMatch(/overflow-wrap:\s*anywhere/);
  });

  it("keeps the studio preview on the same wrapping rules as the real headline", () => {
    // The stage used to restate `white-space: pre` on `.hero-word` at higher specificity, so the
    // miniature disagreed with the page it previews. Any restatement is a divergence waiting to
    // happen again, so the base rule is the only place these two properties may appear.
    const offenders = rules(STUDIO)
      .filter((rule) => rule.selector.includes("hero-word"))
      .filter((rule) => rule.properties.has("white-space") || rule.properties.has("overflow-wrap"))
      .map((rule) => rule.selector);
    expect(offenders).toEqual([]);
  });

  it("keeps the hero band clipped so the glow cannot push the page sideways", () => {
    // Wrapping is what keeps the title inside the box; the box still has to clip, because
    // `.lab-hero-glow` is inset by -12% and -46% on purpose.
    const rule = ruleFor(DETAIL, ".lab-detail-hero");
    expect(rule, ".lab-detail-hero must still exist in project-detail-look.css").toBeTruthy();
    const body = strip(DETAIL).match(/\.lab-detail-hero\s*\{([^{}]*)\}/)[1];
    expect(body).toMatch(/overflow:\s*hidden/);
  });
});
