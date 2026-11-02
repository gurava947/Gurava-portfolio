import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The rail is measured with CSS, not JavaScript: the numbers from the studio become custom
// properties and the stylesheet does the rest. That is fast, and it is also the part a DOM test
// cannot see — jsdom lays nothing out, so the rules that stop a long project title from widening
// the page have to be asserted where they are written.

const css = readFileSync("src/styles/feature-rail.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

function block(selector) {
  const index = css.indexOf(`${selector} {`);
  if (index === -1) return "";
  return css.slice(index, css.indexOf("}", index));
}

describe("feature rail layout rules", () => {
  it("gives the row a ceiling so it can never push the page sideways", () => {
    expect(block(".feature-rail")).toMatch(/max-width:\s*100%/);
    expect(block(".feature-rail-scroller")).toMatch(/overflow-x:\s*auto/);
    // Reaching the end of a rail should not start scrolling the page next to it.
    expect(block(".feature-rail-scroller")).toMatch(/overscroll-behavior-x:\s*contain/);
  });

  it("lets a card shrink below its own title", () => {
    // Without `min-width: 0` a flex item refuses to go under its content width, so one enormous
    // project title grows the row and the whole page starts scrolling horizontally.
    expect(block(".feature-rail-item")).toMatch(/min-width:\s*0/);
  });

  it("takes a chosen height out of the artwork, never out of the words", () => {
    expect(block(".feature-rail.is-tall .feature-rail-item .lab-card-media")).toMatch(/min-height:\s*0/);
    expect(block(".feature-rail.is-tall .feature-rail-item .lab-card-body")).toMatch(/flex:\s*0 0 auto/);
  });

  it("treats the height the studio writes as a floor, not a lid", () => {
    // Found in Chrome, not on paper: at 320px wide with Card Height on 120px, `.lab-card-body` ran to
    // 1620px inside a 1423px card, so the card's own `overflow: hidden` cut the description off. A
    // number the visitor typed can set how tall a card is allowed to be, but it cannot hide words.
    const item = block(".feature-rail.is-tall .feature-rail-item");
    expect(item).toMatch(/min-height:\s*var\(--rail-card-height/);
    expect(item).toMatch(/height:\s*auto/);
    expect(item).not.toMatch(/[^-]height:\s*var\(--rail-card-height/);
  });

  it("only snaps and scrolls in the carousel", () => {
    [".feature-rail.is-wrap", ".feature-rail.is-grid", ".feature-rail.is-list"].forEach((selector) => {
      const rule = block(`${selector} .feature-rail-scroller`);
      expect(rule).toMatch(/overflow:\s*visible/);
      expect(rule).toMatch(/scroll-snap-type:\s*none/);
    });
  });

  it("reads every number the studio writes", () => {
    ["--rail-gap", "--rail-padding", "--rail-basis", "--rail-card-height", "--rail-grid"].forEach((token) => {
      expect(css).toContain(token);
    });
  });

  it("stops the row gliding for anyone who asked for less motion", () => {
    const index = css.indexOf("@media (prefers-reduced-motion: reduce)");
    expect(css.slice(index)).toMatch(/\.feature-rail-scroller\s*\{[\s\S]*?scroll-behavior:\s*auto/);
  });
});
