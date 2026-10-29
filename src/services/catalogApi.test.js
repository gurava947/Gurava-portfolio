import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCatalog, readCachedCatalog } from "./catalogApi";

const CACHE_KEY = "practicefolio.catalog.v9";

function catalogPayload(marker = "first") {
  return {
    projects: [{ id: `project-${marker}`, title: `Project ${marker}` }],
    certificates: [],
    site: { name: "Portfolio" },
    counts: { projects: 1 },
  };
}

function respondWith(payload) {
  return vi.fn(async () => ({ ok: true, json: async () => payload }));
}

describe("catalog session cache", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("stores a fetched catalog and reads it back as fresh", async () => {
    vi.stubGlobal("fetch", respondWith(catalogPayload()));
    const result = await fetchCatalog();
    expect(result.isStale).toBe(false);

    const cached = readCachedCatalog();
    expect(cached.isStale).toBe(false);
    expect(cached.data.projects[0].id).toBe("project-first");
  });

  it("reports an entry past the ttl as stale so the caller still refetches", () => {
    window.sessionStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now() - 11 * 60 * 1000, data: catalogPayload() }));
    expect(readCachedCatalog().isStale).toBe(true);
  });

  it("serves the cached catalog when the request fails", async () => {
    vi.stubGlobal("fetch", respondWith(catalogPayload()));
    await fetchCatalog();
    vi.stubGlobal("fetch", vi.fn(async () => {
      throw new Error("offline");
    }));

    const result = await fetchCatalog();
    expect(result.isStale).toBe(true);
    expect(result.error.message).toBe("offline");
    expect(result.data.projects).toHaveLength(1);
  });

  it("refuses to cache a catalog that would crowd out the rest of the storage", async () => {
    vi.stubGlobal("fetch", respondWith(catalogPayload()));
    await fetchCatalog();
    expect(readCachedCatalog()).not.toBeNull();

    const oversized = catalogPayload("big");
    oversized.padding = "x".repeat(2.5 * 1024 * 1024);
    vi.stubGlobal("fetch", respondWith(oversized));
    const result = await fetchCatalog();
    expect(result.data.projects[0].id).toBe("project-big");

    expect(window.sessionStorage.getItem(CACHE_KEY)).toBeNull();
  });

  it("drops the cached entry when the write is rejected", async () => {
    vi.stubGlobal("fetch", respondWith(catalogPayload()));
    await fetchCatalog();
    const failure = new Error("QuotaExceededError");
    // jsdom's Storage is a proxy over named items, so spying on the instance would store an item
    // called "setItem" instead of replacing the method; the prototype is the real target.
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw failure;
    });
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    await fetchCatalog();

    expect(window.sessionStorage.getItem(CACHE_KEY)).toBeNull();
    expect(warn).toHaveBeenCalledOnce();
  });
});
