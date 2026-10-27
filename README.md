# Practice.folio

A single, unified portfolio combining three supplied project sets into one catalog:

| Collection | Projects | Source |
| --- | --- | --- |
| Python | 33 | 32 supplied Python practice questions plus the Practice.folio Python playground (real Pyodide execution) |
| Responsive | 35 | Responsive design and ecommerce practice builds |
| Static | 39 | Static web development practice builds |

The catalog also carries the supplied Python certificate (3 normalized certificate records). All project titles, descriptions, technologies, images, and certificate facts come from the supplied portfolios.

## Architecture

- **Frontend** — React 19 + Vite 8 + Bootstrap 5, with custom History API routing, scroll restoration, theme switching, a responsive catalog, and an isolated preview runtime.
- **Catalog data** — `scripts/build-catalog.mjs` reads `catalog/source/` (site copy, projects, certificates, components, assets), `backend/db/projects/python-playground.json`, and each preserved solution in `python-projects/<slug>/solution.py`, then generates:
  - `public/data/catalog.json` — compact per-project summaries, filter options, and counts.
  - `public/data/projects/<id>.json` — full detail for one project, loaded on demand.
- **Previews** — React projects render one component at a time in `/preview.html?id=…`; Python questions load their preserved solution into the same playground and run real Pyodide in `/playground/index.html`.
- **Backend** — Express 5 + `node:sqlite` is retained for the local API and data checks; the website itself reads the static generated catalog and needs no remote data service or database credentials.

The catalog is designed for growth: only compact summaries are loaded for the list, detail is fetched per project, filters and pagination are computed client-side over summaries, and preview components are code-split per project. A few thousand projects fit this model without rendering or downloading everything at once.

## Run locally

Requirements: Node.js 22.5+ and npm.

```bash
npm install
npm run dev
```

`npm run dev` starts the API at `http://127.0.0.1:3001` and the website at `http://127.0.0.1:3000`. Override the ports with `FRONTEND_PORT` and `API_PORT`.

Other scripts:

```bash
npm run catalog:build   # regenerate public/data from catalog/source
npm run build           # catalog build + production frontend build
npm run build:vercel    # Vercel-mode production build
npm test                # Vitest unit tests + backend API tests
npm run test:python     # Python exercise unittest suite (110 checks)
npm run lighthouse      # production build check against the Lighthouse budget
npm start               # build and serve the production app with Express
```

### Performance budget

`lighthouserc.cjs` audits five routes (home, catalog, certificates, a project page, a certificate page) with Lighthouse's mobile preset and fails when a Core Web Vital or byte budget is exceeded. Thresholds are calibrated from measured medians, not guesses; see the comments in that file. `npm run lighthouse` builds first, then runs the audit, so it needs a locally installed Chrome. Lighthouse CI runs through `npx` from the pinned `@lhci/cli` version rather than a project dependency, because its transitive tooling carries advisories that would otherwise show up in `npm audit` for a tool the app never ships.

The catalog route (`/projects`) currently cannot produce a Largest Contentful Paint in Lighthouse: its real content paints after the route chunk and catalog JSON arrive, while the removed Suspense fallback was the last recorded candidate. FCP, CLS, and byte budgets still guard that route; LCP and the performance score are not asserted there.

## Data sources

- `catalog/source/site.json` — navigation, hero copy, section copy, certificate labels.
- `catalog/source/projects-responsive.json`, `catalog/source/projects-static.json` — project records and metadata.
- `catalog/source/projects-python.json` — portfolio metadata for the 32 Python practice questions.
- `python-projects/<slug>/solution.py` — preserved supplied Python code, stored verbatim; never edited by the build.
- `python-projects/<slug>/README.md` — per-question details, expected outputs, and limitations.
- `python-projects/tests/` — separate unittest files for the supplied Python solutions.
- `backend/db/projects/python-playground.json` — Python playground definition and exercises.
- `catalog/source/certificates.json` — certificate records; facts mirror the supplied certificate assets.
- `catalog/source/components/` — imported React project components used by the isolated preview.
- `catalog/source/assets/` — local project imagery and certificate files. Source images are optimized to WebP thumbnails during the catalog build.

## Original materials

The uploaded source archives and the pre-merge responsive app are preserved in `../_backups/2026-10-24-premerge/`. Generated catalog JSON is build output and can be regenerated at any time.
