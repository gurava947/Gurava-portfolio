// Lighthouse CI budget for Practice.folio.
//
// Calibrated on 2026-10-27 against the production build using Lighthouse's
// mobile preset (4x CPU throttle, slow-4G simulation), two runs per URL, served
// by LHCI's own static server with SPA fallback. Thresholds sit roughly 15-30%
// above the measured median so a real regression fails the build while normal
// CI noise does not.
//
// assertMatrix is used instead of a single `assertions` block because LHCI forbids combining the
// two, and the catalog route needs an exemption (below). Every entry must therefore list its own
// assertions; keep them in sync.
//
// Re-measured 2026-10-29 after the 63-exercise batch and the font vendoring. Transfer sizes under
// the mobile preset: every route now shares FCP ~2.5s, scripts 128KB, stylesheets 81KB, fonts 58KB
// (same-origin, content-hashed) and third-party 0KB. The exceptions are the playground, whose
// embedded iframe adds styles and scripts, and /certificates, whose eight certificate posters are
// the heaviest thing on the site at 616KB.

const MIN_SCRIPTS_KB = 160; // measured 128 KB, 218 KB on the playground page
const MIN_STYLES_KB = 100; // measured 81 KB
const MIN_FONTS_KB = 120; // measured 58 KB

const shared = {
  "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
  "resource-summary:script:size": ["error", { maxNumericValue: MIN_SCRIPTS_KB * 1024 }],
  "resource-summary:stylesheet:size": ["error", { maxNumericValue: MIN_STYLES_KB * 1024 }],
  "resource-summary:font:size": ["error", { maxNumericValue: MIN_FONTS_KB * 1024 }],
  "resource-summary:third-party:size": ["error", { maxNumericValue: 90 * 1024 }],
  "categories:accessibility": ["error", { minScore: 0.9 }],
  "categories:best-practices": ["error", { minScore: 0.9 }],
  "categories:seo": ["error", { minScore: 0.9 }],
};

module.exports = {
  ci: {
    collect: {
      // LHCI's own static server serves dist/ with SPA fallback, so deep links
      // resolve without spawning a dev server (no stdout pattern to time out on
      // Windows, no fixed port to collide with a local preview).
      staticDistDir: "./dist",
      isSinglePageApplication: true,
      url: [
        "http://localhost/",
        "http://localhost/projects",
        "http://localhost/certificates",
        "http://localhost/projects/python-playground",
        "http://localhost/certificates/programming-foundations-with-python",
      ],
      // Two runs: LHCI asserts on the median, which is stable enough on shared
      // runners without the wall clock cost of three runs.
      numberOfRuns: 2,
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
      },
    },
    assert: {
      assertMatrix: [
        {
          matchingUrlPattern: "^https?://[^/]+/$",
          assertions: {
            ...shared,
            "first-contentful-paint": ["error", { maxNumericValue: 4000 }],
            "largest-contentful-paint": ["error", { maxNumericValue: 5200 }],
            "total-blocking-time": ["error", { maxNumericValue: 400 }],
            "resource-summary:image:size": ["error", { maxNumericValue: 450 * 1024 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 750 * 1024 }],
            "categories:performance": ["warn", { minScore: 0.75 }],
          },
        },
        {
          // This route used to report NO_LCP: under the mobile trace the catalogue painted after the
          // observation window closed and the only recorded candidate had been removed on mount, so
          // LCP, TBT and the performance score had to be switched off and the route ran with no
          // timing signal at all. That changed with the background drift moving to a composited
          // transform and the chrome fonts becoming same-origin. Three runs on 2026-10-29 measure
          // FCP 2566ms, LCP 3016ms, TBT 122-141ms and a score of 89-90, so the assertions are back
          // on. Note what LCP now records: the navbar brand, so this guards the shell rather than the
          // catalogue paint - the byte budgets below are what cover the catalogue itself.
          matchingUrlPattern: "^https?://[^/]+/projects$",
          assertions: {
            ...shared,
            "first-contentful-paint": ["error", { maxNumericValue: 4000 }],
            "largest-contentful-paint": ["error", { maxNumericValue: 4200 }],
            "total-blocking-time": ["error", { maxNumericValue: 400 }],
            "resource-summary:image:size": ["error", { maxNumericValue: 300 * 1024 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 600 * 1024 }],
            "categories:performance": ["warn", { minScore: 0.75 }],
          },
        },
        {
          // Eight certificate posters at 1400-1800px are deliberately large, because the cards and
          // the detail hero are where a certificate has to be readable. Measured 2026-10-29: images
          // 616KB, total 931KB, LCP 4.1-4.7s (the poster is the LCP element). Cutting the posters to
          // a card-sized derivative would move both, and is the next lever if this route ever needs
          // it; the budget here only guards against the artwork growing again unnoticed.
          matchingUrlPattern: "^https?://[^/]+/certificates$",
          assertions: {
            ...shared,
            "first-contentful-paint": ["error", { maxNumericValue: 4000 }],
            "largest-contentful-paint": ["error", { maxNumericValue: 5200 }],
            "total-blocking-time": ["error", { maxNumericValue: 400 }],
            "resource-summary:image:size": ["error", { maxNumericValue: 700 * 1024 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 1000 * 1024 }],
            "categories:performance": ["warn", { minScore: 0.75 }],
          },
        },
        {
          // This project page boots the real Pyodide runtime, so it legitimately transfers
          // megabytes. The ceiling guards against growing that further. The stylesheet allowance is
          // above the shared one because the embedded playground iframe carries its own 23KB of
          // styles: main 71KB + playground 23KB + certificate showcase 8KB + detail 2KB = 104KB.
          matchingUrlPattern: "^https?://[^/]+/projects/python-playground$",
          assertions: {
            ...shared,
            "first-contentful-paint": ["error", { maxNumericValue: 6000 }],
            "largest-contentful-paint": ["error", { maxNumericValue: 6500 }],
            "total-blocking-time": ["error", { maxNumericValue: 800 }],
            "resource-summary:script:size": ["error", { maxNumericValue: 300 * 1024 }],
            "resource-summary:stylesheet:size": ["error", { maxNumericValue: 130 * 1024 }],
            "resource-summary:font:size": ["error", { maxNumericValue: 160 * 1024 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 8000 * 1024 }],
            "categories:performance": ["warn", { minScore: 0.7 }],
          },
        },
        {
          matchingUrlPattern:
            "^https?://[^/]+/certificates/programming-foundations-with-python$",
          assertions: {
            ...shared,
            "first-contentful-paint": ["error", { maxNumericValue: 4000 }],
            "largest-contentful-paint": ["error", { maxNumericValue: 5200 }],
            "total-blocking-time": ["error", { maxNumericValue: 400 }],
            "resource-summary:image:size": ["error", { maxNumericValue: 300 * 1024 }],
            "resource-summary:total:size": ["error", { maxNumericValue: 600 * 1024 }],
            "categories:performance": ["warn", { minScore: 0.75 }],
          },
        },
      ],
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};
