# Deploy this responsive portfolio to Vercel

This project is configured as a static Vite deployment. The build generates the catalog from `catalog/source/`, `backend/db/projects/python-playground.json`, and the preserved `python-projects/<slug>/solution.py` files into `public/data/`, then builds the Vite site. No SQLite database is opened or written to at Vercel request time.

## Deploy

1. Extract this ZIP into a repository or project folder and push it to GitHub, GitLab, or Bitbucket.
2. In Vercel, import that repository and set its **Root Directory** to this project folder (the folder containing this `package.json` and `vercel.json`).
3. Keep the detected Vite framework and the commands from `vercel.json`: `npm ci`, `npm run build:vercel`, output directory `dist`. No environment variables are required.
4. Deploy. The Vercel rewrite serves the SPA for direct links such as `/projects/...` and `/certificates/...`.

For a local pre-deploy check, run `npm ci`, `npm run build:vercel`, then inspect `dist/index.html` and `dist/data/catalog.json`. The build prints the number of projects and certificates in the generated catalog.

## Data and preferences

Project and certificate content is a build-time snapshot from the checked-in seed data. Theme/card preferences are saved separately in each visitor's browser `localStorage`. This is deliberate: Vercel Functions do not provide a shared durable local SQLite file. The existing Express + SQLite API remains available for local development with `npm start`; it is not needed by the static Vercel deployment. If you later require server-synchronized writes across devices, configure a managed remote database and a persistent API before enabling that feature.
