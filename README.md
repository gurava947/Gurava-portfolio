# Practice.folio

A single, unified portfolio combining three supplied project sets into one catalog:

| Collection | Projects | Source |
| --- | ---: | --- |
| Python | 262 | 261 supplied Python practice records plus the Practice.folio Python playground (real Pyodide execution) |
| Responsive | 35 | Responsive design and ecommerce practice builds |
| Static | 39 | Static web development practice builds |

The catalog also carries **8 normalized certificate records**. Project titles, descriptions, technologies, images, and certificate facts come from the supplied portfolios and generated catalog data.

## Architecture

- **Frontend** — React 19 + Vite 8 + Bootstrap 5, with custom History API routing, scroll restoration, theme switching, a responsive catalog, and an isolated preview runtime.
- **Catalog data** — `scripts/build-catalog.mjs` reads `catalog/source/` (site copy, projects, certificates, components, and assets), `backend/db/projects/python-playground.json`, and each preserved solution in `python-projects/<slug>/solution.py`, then generates:
  - `public/data/catalog.json` — compact per-project summaries, filter options, and counts.
  - `public/data/projects/<id>.json` — full detail for one project, loaded on demand.
- **Previews** — React projects render one component at a time in `/preview.html?id=…`; Python questions load their preserved solution into the same playground and run real Pyodide in `/playground/index.html`.
- **Backend** — Express 5 + `node:sqlite` is retained for the local API and data checks; the website itself reads the static generated catalog and needs no remote data service or database credentials.

The catalog is designed for growth: only compact summaries are loaded for the list, detail is fetched per project, filters and pagination are computed client-side over summaries, and preview components are code-split per project.

## Run locally

Requirements: **Node.js 22.12+** and npm. The current Vite/Vitest toolchain requires the newer 22.x floor even though some package metadata declares a lower minimum.

```bash
npm install
npm run dev
```

`npm run dev` runs a predev catalog build, starts the API at `http://127.0.0.1:3001`, and starts the website at `http://127.0.0.1:3000`. The catalog build may update generated files and process assets. Override the defaults with `FRONTEND_PORT` and `API_PORT`.

Supported runtime variables include:

| Variable | Purpose |
| --- | --- |
| `FRONTEND_PORT` | Vite development server port; defaults to `3000`. |
| `API_PORT` | Local Express API port; defaults to `3001`. |
| `PORT` | Production Express listening port. |
| `HOST` | Production/local bind host. |
| `DATABASE_PATH` | Optional SQLite database path used by local checks/API code. |
| `NODE_ENV` | Runtime environment selector. |

Other scripts:

```bash
npm run catalog:build # regenerate public/data from catalog/source
npm run build # catalog build + production frontend build
npm run build:vercel # Vercel-mode production build
npm test # Vitest unit tests + backend API tests
npm run test:python # Python exercise unittest suite
npm run lighthouse # production build check against the Lighthouse budget
npm start # build and serve the production app with Express
```

### Verification status

The Python suite was observed passing with **773 tests and `OK`** when its dependencies were available. The JavaScript test command could not run in the read-only audit checkout because `vitest` was not installed; that result is an environment limitation, not a source-failure claim. Build, catalog, and Lighthouse commands should be run in a writable workspace because they generate output and reports.

### Performance budget

`lighthouserc.cjs` audits five routes (home, catalog, certificates, a project page, and a certificate page) with Lighthouse's mobile preset and fails when a Core Web Vital or byte budget is exceeded. `npm run lighthouse` builds first and needs a locally installed Chrome. Lighthouse CI runs through `npx` from the pinned `@lhci/cli` version rather than a project dependency.

The catalog route (`/projects`) currently cannot produce a Largest Contentful Paint in Lighthouse because its real content paints after the route chunk and catalog JSON arrive. FCP, CLS, and byte budgets still guard that route; LCP and the performance score are not asserted there.

## Data sources

- `catalog/source/site.json` — navigation, hero copy, section copy, and certificate labels.
- `catalog/source/projects-responsive.json`, `catalog/source/projects-static.json` — project records and metadata.
- `catalog/source/projects-python.json` — portfolio metadata for the supplied Python practice records.
- `python-projects/<slug>/solution.py` — preserved supplied Python code, stored verbatim; never edited by the build.
- `python-projects/<slug>/README.md` — per-question details, expected outputs, and limitations.
- `python-projects/tests/` — separate unittest files for the supplied Python solutions.
- `backend/db/projects/python-playground.json` — Python playground definition and exercises.
- `catalog/source/components/` and `catalog/source/assets/` — imported preview components and local project imagery/certificate files.

Generated catalog JSON is build output and can be regenerated from these sources. Counts in this README are intended to match the authoritative generated catalog; documentation consistency should be checked whenever catalog records change.

## Deployment

The primary public deployment is [guravaportfolio.vercel.app](https://guravaportfolio.vercel.app). See [`VERCEL_DEPLOY.md`](./VERCEL_DEPLOY.md) for the Vercel build workflow. Reachability of a deployment does not by itself guarantee feature parity or production readiness.
