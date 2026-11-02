import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/* The card-layout studio reaches every strip the same way: the theme hook writes the visitor's
 * choices onto <html> as `--fr-*` values and `data-fr-*` attributes, and the stylesheets read them.
 * None of that runs in a DOM test — jsdom lays nothing out — so the wiring has to be asserted where
 * it is written. A mistyped property name is a setting that silently stops working. */

const lab = strip("src/styles/project-lab.css");
const shelf = strip("src/styles/collection-shelf.css");
const rail = strip("src/styles/feature-rail.css");

function strip(path) {
  return readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
}

// Every rule whose selector list contains the given selector, so a grouped rule
// (`A, B { ... }`) is found from either name.
function blocks(css, selector) {
  const found = [];
  let from = 0;
  for (;;) {
    const index = css.indexOf(selector, from);
    if (index === -1) return found;
    const open = css.indexOf("{", index);
    const close = open === -1 ? -1 : css.indexOf("}", open);
    if (close === -1) return found;
    const next = css[index + selector.length];
    // The match has to end on a space or a comma and run to its own brace without crossing another
    // rule: `.is-card-rail` inside `.is-card-rail.is-dragging` ends on a `-`, and a name that only
    // survives in a declaration value is behind a `}`.
    if ((next === " " || next === "," || next === "\n" || next === "\t") && !css.slice(index, open).includes("}")) {
      found.push(css.slice(index, close));
    }
    from = open + 1;
  }
}

function blockReading(css, selector, token) {
  const block = blocks(css, selector).find((rule) => rule.includes(token));
  expect(block, `${selector} should read ${token}`).toBeDefined();
  return block;
}

const BAND = ".lab-card-rail-shell .lab-project-grid.is-card-rail";
const SHELF_TRACK = ".collection-shelf-track";

describe("catalog band takes the shared card-layout numbers", () => {
  it("sizes the scrolling grid from the root values, with its own defaults underneath", () => {
    expect(blockReading(lab, BAND, "--rail-gap")).toMatch(/--rail-gap:\s*var\(--fr-gap,/);
    expect(lab).toMatch(/grid-auto-columns:\s*var\(--fr-card-basis,/);
    expect(blockReading(lab, BAND, "--fr-padding")).toMatch(/padding:[^;]*var\(--fr-padding,/);
  });

  it("keeps the band horizontal while a rail is allowed to wrap", () => {
    expect(blockReading(lab, BAND, "grid-auto-flow")).toMatch(/grid-auto-flow:\s*column/);
  });

  it("treats a picked card height as a floor for the rows, not a lid", () => {
    const tall = blockReading(lab, `html[data-fr-tall="on"] ${BAND}`, "--fr-card-height");
    expect(tall).toMatch(/height:\s*auto/);
    expect(tall).toMatch(/minmax\(\s*var\(--fr-card-height,\s*0px\s*\),\s*auto\s*\)/);
  });

  it("opens the band into a grid once the layout wraps instead of scrolls", () => {
    const wrapped = blockReading(lab, `html[data-fr-wrap="on"] ${BAND}`, "grid-auto-flow: row");
    expect(wrapped).toMatch(/overflow:\s*visible/);
    expect(wrapped).toMatch(/scroll-snap-type:\s*none/);
    expect(wrapped).toMatch(/grid-auto-rows:\s*minmax\(\s*var\(--fr-card-height/);
    expect(wrapped).toMatch(/grid-template-columns:\s*var\(--fr-grid,/);
  });

  it("gives a list one lane", () => {
    expect(blockReading(lab, `html[data-fr-layout="list"] ${BAND}`, "grid-template-columns"))
      .toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  });

  it("hides the chrome the switches turn off", () => {
    for (const selector of [
      'html[data-fr-arrows="off"] .lab-card-rail-shell .lab-card-rail-edges',
      'html[data-fr-indicators="off"] .lab-card-rail-shell .lab-card-rail-progress',
      'html[data-fr-indicators="off"] .lab-card-rail-shell .lab-card-rail-page',
    ]) {
      expect(blockReading(lab, selector, "display: none")).toMatch(/display:\s*none/);
    }
  });

  it("only promises a grab cursor once the gesture is switched on", () => {
    expect(blockReading(lab, `html[data-fr-drag="on"] ${BAND}`, "cursor")).toMatch(/cursor:\s*grab/);
    expect(blockReading(lab, `${BAND}.is-dragging`, "cursor")).toMatch(/cursor:\s*grabbing/);
  });

  it("never lets a picked inset bleed past the page gutter", () => {
    // The band hangs itself into the gutter so a card can sit flush with the viewport. That hang is the
    // one thing about it that can widen the page, so it is capped by the gutter it eats — and the
    // gutter has to be the same number the workspace actually pads with, or the cap is fiction.
    const wide = blockReading(lab, ".lab-workspace-wide", "--lab-gutter");
    expect(wide).toMatch(/--lab-gutter:\s*clamp\(12px,\s*2vw,\s*30px\)/);
    expect(wide).toMatch(/padding:\s*0\s+var\(--lab-gutter\)/);
    const bleed = blockReading(lab, BAND, "--rail-bleed");
    expect(bleed).toMatch(/--rail-bleed:\s*min\(\s*calc\(var\(--fr-padding,\s*2px\)\s*\+\s*2px\),\s*var\(--lab-gutter,\s*12px\)\s*\)/);
    expect(bleed).toMatch(/margin:[^;]*calc\(var\(--rail-bleed\)\s*\*\s*-1\)/);
  });
});

describe("3D collection shelf takes the same numbers, second", () => {
  it("keeps the sizes chosen in 3D Settings ahead of the rail's", () => {
    // The shelf's posters are measured for depth, so its own studio wins and the card layout is the
    // fallback. The shipped number stays at the end of the chain for a studio nobody opened.
    expect(blockReading(shelf, SHELF_TRACK, "--shelf-gap"))
      .toMatch(/--shelf-gap:\s*var\(--shelf-3d-gap,\s*var\(--fr-gap,/);
    expect(blockReading(shelf, SHELF_TRACK, "--shelf-card-width"))
      .toMatch(/--shelf-card-width:\s*var\(--shelf-3d-card-width,\s*min\(100%,\s*var\(--fr-card-width,/);
    expect(blockReading(shelf, SHELF_TRACK, "--fr-padding")).toMatch(/padding:[^;]*var\(--fr-padding,/);
  });

  it("treats a picked card height as a floor for the poster", () => {
    const floored = blocks(shelf, ".collection-shelf").find((rule) => rule.includes("--fr-card-height"));
    expect(floored).toBeDefined();
    expect(floored).toMatch(/--shelf-card-total-height:\s*var\(--shelf-3d-card-height,\s*max\(/);
  });

  it("lays the whole shelf out at once when the layout wraps", () => {
    const wrapped = blockReading(shelf, `html[data-fr-wrap="on"] .collection-shelf:not([data-preview="true"]) ${SHELF_TRACK}`, "display: grid");
    expect(wrapped).toMatch(/overflow:\s*visible/);
    expect(wrapped).toMatch(/scroll-snap-type:\s*none/);
    expect(wrapped).toMatch(/grid-auto-rows:\s*minmax\(\s*var\(--fr-card-height/);
  });

  it("hides the chrome the switches turn off", () => {
    expect(blockReading(shelf, 'html[data-fr-arrows="off"] .collection-shelf-buttons', "display: none"))
      .toMatch(/display:\s*none/);
    expect(blockReading(shelf, 'html[data-fr-arrows="off"] .collection-shelf-fade', "display: none"))
      .toMatch(/display:\s*none/);
    expect(blockReading(shelf, 'html[data-fr-indicators="off"] .collection-shelf-progress', "display: none"))
      .toMatch(/display:\s*none/);
  });

  it("only promises a grab cursor once the gesture is switched on", () => {
    expect(blockReading(shelf, `html[data-fr-drag="on"] .collection-shelf:not([data-preview="true"]) ${SHELF_TRACK}`, "cursor"))
      .toMatch(/cursor:\s*grab/);
    expect(blockReading(shelf, `${SHELF_TRACK}.is-dragging`, "cursor")).toMatch(/cursor:\s*grabbing/);
  });

  it("leaves the studio's own sample alone", () => {
    // The preview pane is driven by the props the studio hands it. A root rule that reached it would
    // fight the very control being moved, so every gesture and layout rule has to exclude it.
    for (const selector of ['html[data-fr-wrap="on"]', 'html[data-fr-drag="on"]', 'html[data-fr-layout="list"]']) {
      blocks(shelf, selector).forEach((rule) => {
        expect(rule).toContain(':not([data-preview="true"])');
      });
    }
  });
});

describe("the values published on the root are only ever read", () => {
  // A stylesheet that both declares and reads its own `--fr-*` would be a cycle, and a custom
  // property in a cycle resolves to nothing: the setting would look applied and change no layout.
  it("no strip re-declares a root value", () => {
    [lab, shelf, rail].forEach((css) => {
      expect(css).not.toMatch(/--fr-[a-z-]+\s*:/);
    });
  });

  // The home rail and the "More from" rail are handed the settings as props and write their own
  // `--rail-*` copy inline, which is why the studio preview moves before anything else does.
  it("the home rail still reads its own inline copy", () => {
    ["--rail-gap", "--rail-padding", "--rail-basis", "--rail-card-height", "--rail-grid"].forEach((token) => {
      expect(rail).toContain(token);
    });
    const row = blockReading(rail, ".feature-rail-scroller", "--rail-gap");
    expect(row).toMatch(/gap:\s*var\(--rail-gap/);
    expect(row).toMatch(/padding:\s*var\(--rail-padding/);
  });

  it("the device counts the catalog ships with are still the fallback", () => {
    const theme = strip("src/styles/theme.css");
    expect(theme).toMatch(/--rail-cols:/);
    expect(theme).toMatch(/--rail-rows:/);
  });
});
