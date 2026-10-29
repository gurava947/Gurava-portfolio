import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Measured on the production build at 1440x900: the grid look drifting with `background-position`
// cost ~14ms of main-thread task time per frame and dropped the untouched page to 47fps. The same
// motion as a `translate3d` composited at 60fps with 0.079ms of main-thread work. Everything below
// exists to stop that regression from coming back quietly.

const COMPOSITED_PROPERTIES = new Set([
  "transform",
  "translate",
  "rotate",
  "scale",
  "opacity",
  "filter",
  "clip-path",
]);

// Full repo-relative list of keyframes that animate a paint-only property. A new entry means a new
// main-thread animation, so it has to be justified here; a stale entry fails too, which keeps this
// list honest as animations get converted.
const PAINT_ONLY_KEYFRAMES = {
  "src/styles/bootstrap-shim.css#progress-bar-stripes": "Stripe texture inside a fixed-height progress bar; a few elements, not a full-viewport layer.",
  "src/styles/bootstrap-shim.css#placeholder-wave": "Mask slide on a skeleton line; small and only present while content loads.",
  "src/styles/card-effects.css#fx-halo-pulse": "Border and shadow colour on one hovered card.",
  "src/styles/card-effects.css#fx-halo-spin": "Registered custom property feeding a conic-gradient; opt-in effect on a single card.",
  "src/styles/project-lab.css#lab-card-shimmer": "Background sweep inside one card, only while the lab is in view.",
  "src/styles/site-look.css#hero-word-neon": "Text glow on the hero headline; opt-in headline style, a few words, and no full-viewport layer involved.",
  "src/styles/site-look-studio.css#look-demo-shimmer": "Swatch preview inside the studio panel; translating would slide the texture out of the miniature.",
  "src/styles/site-look-studio.css#look-demo-neon": "Text glow on a studio swatch label.",
  "src/styles/site-look-studio.css#look-grid-drift-tile": "Studio swatch keeps background-position on purpose, in its own single-tile keyframe so the texture stays inside the box.",
  "src/styles/site-look.css#look-stardust-drift": "Three dot fields at 42, 78 and 130px periods, each advancing one of its own periods. One transform would move them in lockstep and lose the depth, so compositing this means splitting the pattern across boxes — an art change, and it is an opt-in look rather than the default.",
};

function cssFiles(dir = "src", found = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) cssFiles(path, found);
    else if (path.endsWith(".css")) found.push(path.replace(/\\/g, "/"));
  }
  return found;
}

// Brace-counted rather than regex-matched: keyframe steps appear both across several lines and
// collapsed onto one (`from { transform: … } to { … }`), and a regex on line-starting properties
// silently under-reports the single-line form.
function keyframesIn(css) {
  const source = css.replace(/\/\*[\s\S]*?\*\//g, "");
  const blocks = new Map();
  const open = /@keyframes\s+([\w-]+)\s*\{/g;
  let match;
  while ((match = open.exec(source))) {
    let index = match.index + match[0].length;
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
    blocks.set(match[1], body);
  }
  return blocks;
}

function animatedProperties(body) {
  const names = new Set();
  for (const declaration of body.matchAll(/([a-z-]+)\s*:/g)) {
    const name = declaration[1];
    if (name !== "var") names.add(name);
  }
  return names;
}

// `min(10vw, 72px)` is one argument, so a naive split on "," would read `min(10vw` as a length.
function splitArguments(value) {
  const parts = [];
  let depth = 0;
  let current = "";
  for (const char of value) {
    if (char === "(") depth += 1;
    else if (char === ")") depth -= 1;
    if (char === "," && depth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }
    current += char;
  }
  parts.push(current.trim());
  return parts;
}

// Scanned with a depth counter rather than a regex: `translate3d(min(10vw, 72px), …)` nests a
// function inside its own argument list, which a `[^)]*` capture cannot cross.
function translate3dArguments(body) {
  const groups = [];
  const marker = "translate3d(";
  let from = 0;
  for (;;) {
    const start = body.indexOf(marker, from);
    if (start === -1) return groups;
    let index = start + marker.length;
    let depth = 1;
    let inner = "";
    while (index < body.length && depth > 0) {
      const char = body[index];
      if (char === "(") depth += 1;
      else if (char === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
      inner += char;
      index += 1;
    }
    groups.push(splitArguments(inner));
    from = index + 1;
  }
}

const files = cssFiles();
const discovered = [];
const keyframeIndex = new Map();

for (const file of files) {
  const blocks = keyframesIn(readFileSync(file, "utf8"));
  for (const [name, body] of blocks) {
    keyframeIndex.set(`${file}#${name}`, body);
    const paintOnly = [...animatedProperties(body)].filter((property) => !COMPOSITED_PROPERTIES.has(property));
    if (paintOnly.length > 0) discovered.push({ key: `${file}#${name}`, properties: paintOnly.sort() });
  }
}

const allowlisted = Object.keys(PAINT_ONLY_KEYFRAMES).sort();
const offenders = discovered.map((entry) => entry.key).sort();

describe("composited background animation", () => {
  it("keeps paint-only keyframes inside the reviewed allowlist", () => {
    expect(offenders).toEqual(allowlisted);
  });

  it("drifts the full-viewport grid and diagonal looks with transform only", () => {
    for (const name of ["look-grid-drift", "look-diagonal-drift"]) {
      const body = keyframeIndex.get(`src/styles/site-look.css#${name}`);
      expect(body, `${name} must still exist in site-look.css`).toBeTruthy();
      expect([...animatedProperties(body)]).toEqual(["transform"]);
      expect(body).toContain("translate3d");
    }
  });

  it("keeps the drift distance inside the layer's own bleed so no viewport edge can uncover", () => {
    // The pattern layer is fixed and inset by -10%, so 10vw/10vh of travel is the most that can be
    // absorbed without exposing an edge. A bare px/vw larger than that would drift past the bleed.
    expect(readFileSync("src/styles/site-look.css", "utf8")).toContain("inset: -10%");
    for (const name of ["look-grid-drift", "look-diagonal-drift"]) {
      const body = keyframeIndex.get(`src/styles/site-look.css#${name}`);
      const groups = translate3dArguments(body);
      expect(groups.length, `${name} must drift with translate3d`).toBeGreaterThan(0);
      for (const group of groups) {
        expect(group.length, `${name} needs x, y and z`).toBe(3);
        for (const value of group) {
          if (value === "0") continue;
          expect(value, `${name} drifts past the bleed: ${value}`).toMatch(/^min\(10v[wh],\s*[\d.]+px\)$/);
        }
      }
    }
  });

  it("finds the keyframes it expects to find", () => {
    expect(files.length).toBeGreaterThan(0);
    expect(keyframeIndex.size).toBeGreaterThan(20);
  });
});
