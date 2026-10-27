const CATALOG_CACHE_KEY = "practicefolio.catalog.v9";
const CACHE_TTL = 10 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 15000;
const detailCache = new Map();

function withTimeout(run) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return run(controller.signal)
    .catch((error) => {
      if (controller.signal.aborted) throw new Error("The data request timed out.");
      throw error;
    })
    .finally(() => window.clearTimeout(timeout));
}

function validateCatalog(payload) {
  if (!payload || !Array.isArray(payload.projects) || payload.projects.length === 0) {
    throw new Error("The catalog did not include any projects.");
  }
  if (!Array.isArray(payload.certificates)) {
    throw new Error("The catalog did not include certificate records.");
  }
  if (!payload.site || !payload.counts) {
    throw new Error("The catalog is missing its site configuration or counts.");
  }
  return payload;
}

function readCache() {
  try {
    const raw = window.sessionStorage.getItem(CATALOG_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Number.isFinite(parsed.savedAt) || !parsed.data) return null;
    return { data: parsed.data, isStale: Date.now() - parsed.savedAt > CACHE_TTL };
  } catch (error) {
    console.warn("Unable to read the cached catalog.", error);
    return null;
  }
}

function writeCache(data) {
  try {
    window.sessionStorage.setItem(CATALOG_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data }));
  } catch (error) {
    console.warn("Unable to cache the catalog for this session.", error);
  }
}

export function readCachedCatalog() {
  return readCache();
}

export async function fetchCatalog() {
  const cached = readCache();
  try {
    const payload = await withTimeout(async (signal) => {
      const response = await fetch("/data/catalog.json", { signal, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Catalog endpoint returned HTTP ${response.status}.`);
      return response.json();
    });
    const catalog = validateCatalog(payload);
    writeCache(catalog);
    return { data: catalog, isStale: false };
  } catch (error) {
    if (cached?.data) return { data: cached.data, isStale: true, error };
    throw error;
  }
}

export async function fetchProjectDetail(id) {
  if (!id) throw new Error("A project id is required.");
  if (detailCache.has(id)) return detailCache.get(id);
  const payload = await withTimeout(async (signal) => {
    const response = await fetch(`/data/projects/${encodeURIComponent(id)}.json`, { signal, headers: { Accept: "application/json" } });
    if (response.status === 404) throw new Error("This project is not in the local catalog.");
    if (!response.ok) throw new Error(`Project endpoint returned HTTP ${response.status}.`);
    return response.json();
  });
  if (!payload || payload.id !== id) throw new Error("The project detail response did not match the requested project.");
  detailCache.set(id, payload);
  return payload;
}
