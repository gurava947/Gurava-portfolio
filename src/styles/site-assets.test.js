import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// The page shell used to open with a render-blocking <link> to fonts.googleapis.com, so first paint
// waited on a DNS lookup, a TLS handshake and a round trip to a second origin before any styled text
// could appear. Measured in Chrome on this machine, that stylesheet alone took 269ms cold and about
// 150ms on a warm connection. scripts/vendor-fonts.mjs now serves the same faces from /assets.

const CHROME_STYLESHEETS = [
  "src/index.css",
  "src/styles/fonts-local.css",
  "src/styles/font-fallbacks.css",
  "src/styles/unified.css",
];

describe("site chrome assets", () => {
  it("does not load a third-party stylesheet from the page shell", () => {
    const html = readFileSync("index.html", "utf8");
    expect(html).not.toMatch(/fonts\.googleapis\.com/);
    expect(html).not.toMatch(/fonts\.gstatic\.com/);
    expect(html).toMatch(/<link rel="icon"/);
  });

  it("declares every chrome webfont from a local file", () => {
    for (const file of CHROME_STYLESHEETS) {
      const css = readFileSync(file, "utf8");
      for (const face of css.match(/@font-face\s*\{[^}]*\}/g) || []) {
        const src = /src:\s*url\(([^)]+)\)/.exec(face);
        if (!src) continue;
        expect(src[1], `remote font in ${file}`).not.toMatch(/^https?:\/\//);
      }
    }
  });

  it("keeps the faces the chrome stacks ask for", () => {
    const css = readFileSync("src/styles/fonts-local.css", "utf8");
    for (const family of ["DM Sans", "Space Grotesk"]) {
      expect(css).toContain(`font-family: '${family}'`);
    }
    expect(css).toContain("font-display: swap");
  });

  it("keeps the fallback stacks that stop the font swap from shifting layout", () => {
    const fallbacks = readFileSync("src/styles/font-fallbacks.css", "utf8");
    for (const family of ["Space Grotesk Fallback", "DM Sans Fallback"]) {
      expect(fallbacks).toContain(`font-family: "${family}"`);
    }
    expect(readFileSync("src/index.css", "utf8")).toContain("'DM Sans Fallback'");
  });
});
