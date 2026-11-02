import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Two ways a headline can lose its letters, both measured in Chrome on the deployed build:
//
//   1. Site look -> Section headings -> "Gradient fill" sets `background-clip: text` and a transparent
//      fill on the heading. A word-split title keeps every glyph inside its own `.hero-word` span, and
//      an inline-block is its own paint box, so the ancestor's clipped background never reached them:
//      the whole h1 on a project detail page rendered as an empty gap the size of the title.
//   2. The "Mask reveal" motion ends on `clip-path: inset(0 -12% 0 0)` and `animation-fill-mode: both`
//      holds that forever. A display line-height of 0.94 makes the word's box shorter than the letters,
//      so an inset of 0 top and bottom shaved their tops and descenders off.
//
// Both are invisible to a DOM test, so these assert on the CSS source the way the other style guards do.

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

function cssFiles(dir = "src", found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) cssFiles(path, found);
    else if (path.endsWith(".css")) found.push(path.replace(/\\/g, "/"));
  }
  return found;
}

// Every innermost rule, with its declarations kept as name/value pairs rather than a bare set of
// names — this guard needs the value of `background-clip`, not only its presence.
function rules(css) {
  return [...strip(css).matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
    selector: selector.trim(),
    declarations: new Map(
      [...body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:\s*([^;]+)/g)].map(([, name, value]) => [name, value.trim()]),
    ),
  }));
}

const declarations = (body) =>
  new Map([...body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:\s*([^;]+)/g)].map(([, name, value]) => [name, value.trim()]));

// The same selector restated inside a media query is a different rule with a different job — the rail
// card turns itself sideways on a desktop and stays stacked below that — so this walk keeps the
// enclosing condition with each rule instead of the flattened view above.
function scopedRules(css, scope = "", out = []) {
  const text = strip(css);
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf("{", i);
    if (open === -1) break;
    const head = text.slice(i, open).trim();
    let depth = 1;
    let j = open + 1;
    while (j < text.length && depth > 0) {
      if (text[j] === "{") depth += 1;
      else if (text[j] === "}") depth -= 1;
      j += 1;
    }
    const body = text.slice(open + 1, j - 1);
    if (head.startsWith("@media") || head.startsWith("@supports")) {
      scopedRules(body, scope ? `${scope} and ${head.slice(6)}` : head.slice(6), out);
    } else if (head && !head.startsWith("@")) {
      for (const selector of head.split(",").map((s) => s.trim()).filter(Boolean)) {
        out.push({ selector, scope: scope.replace(/\s+/g, " "), declarations: declarations(body) });
      }
    }
    i = j;
  }
  return out;
}

const files = cssFiles();
const index = new Map(files.flatMap((file) => rules(readFileSync(file, "utf8")).map((rule) => [`${file} :: ${rule.selector}`, rule])));

// A rule that takes the fill away from a descendant of a heading has to paint something itself.
const transparentDescendants = [...index].filter(([, rule]) => {
  const fill = rule.declarations.get("-webkit-text-fill-color") ?? rule.declarations.get("text-fill-color");
  return fill === "transparent" && /\b(span|\.hero-word)\b/.test(rule.selector);
});

function keyframeBody(file, name) {
  const source = strip(readFileSync(file, "utf8"));
  const start = source.indexOf(`@keyframes ${name} {`);
  if (start === -1) return null;
  let index = start + `@keyframes ${name} {`.length;
  let depth = 1;
  let body = "";
  while (index < source.length && depth > 0) {
    const char = source[index];
    if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) break;
    }
    body += char;
    index += 1;
  }
  return body;
}

// The step that covers 100% is the resting state a `both` fill leaves behind — it is not necessarily
// the last one in source order.
function restingInsets(body) {
  const steps = [...body.matchAll(/([^{}]*)\{([^{}]*)\}/g)]
    .map(([, selector, step]) => ({ selector: selector.trim(), step }));
  const resting = steps.filter(({ selector }) => /(^|[\s,])to($|[\s,])/.test(selector) || /(^|[\s,])100%($|[\s,])/.test(selector));
  const inset = resting.map(({ step }) => step.match(/clip-path:\s*inset\(([^)]*)\)/)).find(Boolean);
  return inset ? inset[1].split(/\s+/).filter(Boolean) : [];
}

describe("headline legibility", () => {
  it("finds the transparent descendant rules it is guarding", () => {
    // Fails loudly if the rule below is ever renamed away, because the assertion would pass on nothing.
    expect(transparentDescendants.length).toBeGreaterThan(0);
  });

  it("clips a gradient to the text of every span that loses its own fill", () => {
    for (const [key, rule] of transparentDescendants) {
      const clip = rule.declarations.get("background-clip") ?? rule.declarations.get("-webkit-background-clip");
      expect(clip, `${key} paints transparent glyphs with no clipped background of its own`).toBe("text");
    }
  });

  it("rests the mask reveal outside the word box so no letter is shaved", () => {
    for (const [file, name] of [
      ["src/styles/site-look.css", "hero-word-mask"],
      ["src/styles/site-look-studio.css", "look-demo-mask"],
    ]) {
      const body = keyframeBody(file, name);
      expect(body, `${name} must still exist in ${file}`).toBeTruthy();
      const insets = restingInsets(body);
      expect(insets.length, `${name} must rest on an inset() it can interpolate from and to`).toBe(4);
      for (const inset of insets) {
        expect(inset, `${name} rests flush with the word box: ${insets.join(" ")}`).toMatch(/^-/);
      }
    }
  });
});

// The third way words disappear is arithmetic: a box that is allowed to shrink below the height of
// its own lines. Measured in Chrome at 1100px on the project rail — the card is a fixed-height flex
// column, so `flex-shrink: 1` took the description from a 17.7px line box down to 13.1px, and its
// own `overflow: hidden` then cut the line off through the letters. Same story in the collection
// shelf's label panel, which is fixed height too. The rule is the same in both: the picture gives
// room, the text keeps its lines.
describe("lines keep their own height", () => {
  // Every rule, duplicates and all: a selector can be restated inside a media query, and the map
  // above keeps only one of them. The rail's media is restated for phones and for desktop.
  const all = files.flatMap((file) =>
    rules(readFileSync(file, "utf8")).map((rule) => [`${file} :: ${rule.selector}`, rule]),
  );
  const find = (needle) => all.filter(([key]) => key.includes(needle));

  it("never shrinks a line of the shelf label", () => {
    const shelfRules = find("collection-shelf.css :: .collection-shelf-glass > *");
    expect(shelfRules.length, "the shelf label's lines need one no-shrink rule").toBe(1);
    expect(shelfRules[0][1].declarations.get("flex")).toBe("0 0 auto");
  });

  it("lets the rail thumbnail pay for the room the rail words need", () => {
    const rail = scopedRules(readFileSync("src/styles/project-lab.css", "utf8"));
    const stacked = rail.filter(
      (rule) => rule.selector.endsWith(".lab-card-rail-shell .lab-project-grid.is-card-rail .lab-card-media")
        || (rule.selector.endsWith(".lab-card-media") && rule.selector.includes("is-card-rail")),
    );
    expect(stacked.length).toBeGreaterThan(0);
    for (const rule of stacked) {
      const flex = rule.declarations.get("flex");
      if (!flex) continue;
      // Above 1200px the card is sideways, so that basis is a width and the words sit beside it.
      // Stacked, the same number is a height, and a pinned print is what leaves the text too short.
      if (rule.scope.includes("min-width: 1200px")) {
        expect(rule.scope, "the wide rail is the row card").toContain("min-width: 1200px");
        continue;
      }
      expect(Number.parseFloat(flex.split(/\s+/)[1]), `${rule.selector} in [${rule.scope}] pins the print over the words`).toBeGreaterThan(0);
    }

    const bodyRules = find("project-lab.css :: .lab-card-rail-shell .lab-project-grid.is-card-rail .lab-card-body");
    expect(bodyRules.some(([, rule]) => rule.declarations.get("flex") === "0 0 auto"), "the words take what they need").toBe(true);

    const lineRules = find("project-lab.css :: .lab-card-rail-shell .lab-project-grid.is-card-rail .lab-card-body > *");
    expect(lineRules.length).toBe(1);
    expect(lineRules[0][1].declarations.get("flex")).toBe("0 0 auto");
  });

  it("gives the small-screen label panel room for the lines it shows", () => {
    // 190px is the measured floor: topline + name + count + three clamped description lines + cue,
    // their gaps and the panel's own padding. Anything smaller and the label has to be cut instead.
    const floors = [...readFileSync("src/styles/collection-shelf.css", "utf8").matchAll(/--shelf-glass-height:\s*clamp\((\d+)px/g)]
      .map(([, value]) => Number.parseInt(value, 10));
    expect(floors.length).toBeGreaterThan(0);
    for (const floor of floors) {
      expect(floor, "a vh-based panel that can be shorter than its content cuts every line").toBeGreaterThanOrEqual(190);
    }
  });

  it("keeps the shelf terminal inside the band it is painted onto", () => {
    // The terminal's room is the artwork band, which is a user setting floored by `--shelf-art-height`.
    // Its lines may not shrink, and it may not ask for more lines than that band can hold: at the
    // shortest card the band is 112px less 20px of padding, and bar + two snippet lines + gaps +
    // output pill measured 87px. A third snippet line is what overflowed into the frosted panel.
    const shelf = scopedRules(readFileSync("src/styles/collection-shelf.css", "utf8"));
    const lines = shelf.filter((rule) => rule.selector.endsWith(".collection-shelf-terminal > *"));
    expect(lines.length).toBe(1);
    expect(lines[0].declarations.get("flex")).toBe("0 0 auto");

    const code = shelf.filter((rule) => rule.selector === ".collection-shelf-terminal code");
    expect(code.length).toBe(1);
    expect(Number.parseInt(code[0].declarations.get("-webkit-line-clamp"), 10)).toBeLessThanOrEqual(2);

    const band = [...readFileSync("src/styles/collection-shelf.css", "utf8").matchAll(/--shelf-art-height:\s*max\((\d+)px/g)]
      .map(([, value]) => Number.parseInt(value, 10));
    expect(band).toEqual([112, 76]);
  });
});

// The fourth way text disappears is a card placed in a box narrower than the layout it is written
// for. The Layout studio previews three cards side by side, so each tile is ~205px at 768px; the
// editorial card reserves a fixed 148-168px column for its print beside the words, which in a tile
// that narrow left the title 15px of gutter. Measured in Chrome it wrapped one word per line, 22
// lines tall, and pushed the description past the bottom of the card.
describe("preview tiles fit the cards they show", () => {
  const preview = scopedRules(readFileSync("src/styles/layout-patterns.css", "utf8"));

  it("stacks the editorial preview instead of reserving a fixed print column", () => {
    const editorial = preview.filter((rule) => rule.selector === '.layout-preview-cards .lab-project-card[data-card-layout="editorial"]');
    expect(editorial.length, "the editorial preview needs exactly one restack rule").toBe(1);
    const columns = editorial[0].declarations.get("grid-template-columns");
    expect(columns, "a fixed px track is what steals the title's width").toBe("minmax(0, 1fr)");
  });

  it("lets that preview's print take the tile instead of a fixed width", () => {
    const media = preview.filter((rule) => rule.selector.endsWith('.layout-preview-cards .lab-project-card[data-card-layout="editorial"] .lab-card-media'));
    expect(media.length).toBe(1);
    expect(media[0].declarations.get("width")).toBe("100%");
  });
});

// The fifth way text disappears is a colour that belongs to a card being read onto the page. The card
// studio writes `--portfolio-card-custom-text-color` on the document root, so any rule that consumes it
// outside a card paints page furniture with the card's ink. With a dark-card customisation saved
// (#f7faf6 on #0b1310) the wordmark measured 1.04:1 against the light nav bar and simply vanished.
describe("page text keeps the page colour", () => {
  const effects = scopedRules(readFileSync("src/styles/portfolio-effects.css", "utf8"));
  const cardInk = "var(--portfolio-card-custom-text-color";
  const onThePage = /\.portfolio-brand|\.section-title/;

  it("paints no page heading or the wordmark with the card's ink", () => {
    const bleed = effects.filter(
      (rule) => (rule.declarations.get("color") || "").includes(cardInk) && onThePage.test(rule.selector),
    );
    expect(bleed.map((rule) => rule.selector), "page furniture must follow --theme-text, not the card customisation").toEqual([]);
  });

  it("keeps a real colour on both of them", () => {
    for (const selector of [".portfolio-brand", ".section-title"]) {
      const rules = effects.filter((rule) => rule.selector === selector);
      expect(rules.length, `${selector} needs exactly one colour rule`).toBe(1);
      expect(rules[0].declarations.get("color"), `${selector} is not reading the page text colour`).toContain("var(--theme-text)");
    }
  });

  it("still lets a card title take the customised ink", () => {
    const title = effects.find((rule) => rule.selector === ".project-card .project-card-title");
    expect(title, "the guard above must not have taken the card its own colour").toBeTruthy();
    expect(title.declarations.get("color")).toContain(cardInk);
  });
});
