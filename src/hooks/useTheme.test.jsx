import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  DEFAULT_LOADER_SETTINGS,
  THEME_STORAGE_KEY,
  normalizeLoaderSettings,
  useTheme,
} from "./useTheme";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  delete globalThis.__ENABLE_LOCAL_API_TESTS__;
  window.localStorage.clear();
});

describe("useTheme settings synchronization", () => {
  it("debounces rapid preference changes into one API update", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });
    vi.stubGlobal("fetch", fetchMock);
    globalThis.__ENABLE_LOCAL_API_TESTS__ = true;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: "light" }));

    const { result } = renderHook(() => useTheme());
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.updateSettings({ mode: "dark" });
      result.current.updateSettings({ mode: "light" });
      result.current.updateCardUISettings({ hoverScale: 1.04 });
    });

    await act(async () => { vi.advanceTimersByTime(249); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(1);
      await Promise.resolve();
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toBe("/api/settings");
    expect(fetchMock.mock.calls[1][1].method).toBe("PATCH");
  });

  it("persists loader preferences locally without sending them to the settings API", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });
    vi.stubGlobal("fetch", fetchMock);
    globalThis.__ENABLE_LOCAL_API_TESTS__ = true;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: "light" }));

    const { result } = renderHook(() => useTheme());
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.updateLoaderSettings({ enabled: true, style: "dots", speed: "fast", labels: false });
    });

    expect(document.documentElement.dataset.loaderStyle).toBe("dots");
    expect(document.documentElement.dataset.loaderSpeed).toBe("fast");
    expect(document.documentElement.dataset.loaderLabels).toBe("false");

    await act(async () => {
      vi.advanceTimersByTime(250);
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const sentBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(sentBody).not.toHaveProperty("loader");
    expect(sentBody.cardUI).not.toHaveProperty("imageFit");
    const saved = JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY));
    expect(saved.loader).toEqual({ enabled: true, style: "dots", speed: "fast", labels: false });
  });

  it("persists card effects locally and keeps them out of the settings API", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });
    vi.stubGlobal("fetch", fetchMock);
    globalThis.__ENABLE_LOCAL_API_TESTS__ = true;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: "light" }));

    const { result } = renderHook(() => useTheme());
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.updateCardEffectsSettings({ intensity: "strong", projects: "tilt", certificates: "foil" });
    });

    expect(document.documentElement.dataset.cardFxEnabled).toBe("true");
    expect(document.documentElement.dataset.cardFxIntensity).toBe("strong");

    await act(async () => {
      vi.advanceTimersByTime(250);
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const sentBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(sentBody).not.toHaveProperty("effects");
    const saved = JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY));
    expect(saved.effects).toEqual({
      enabled: true,
      intensity: "strong",
      projects: "tilt",
      certificates: "foil",
    });
  });

  it("hydrates saved shelf motion and keeps it out of the settings API", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });
    vi.stubGlobal("fetch", fetchMock);
    globalThis.__ENABLE_LOCAL_API_TESTS__ = true;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({
      mode: "light",
      motion: { preset: "depth", intensity: "strong", duration: 480, delay: 90 },
    }));

    const { result } = renderHook(() => useTheme());

    expect(result.current.settings.motion).toEqual({
      preset: "depth",
      intensity: "strong",
      duration: 480,
      delay: 90,
    });
    expect(document.documentElement.dataset.shelfMotion).toBe("depth");

    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sentBody = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sentBody).not.toHaveProperty("motion");
  });

  it("persists shelf motion locally and keeps it out of the settings API", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: {} }),
    });
    vi.stubGlobal("fetch", fetchMock);
    globalThis.__ENABLE_LOCAL_API_TESTS__ = true;
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode: "light" }));

    const { result } = renderHook(() => useTheme());
    await act(async () => { await Promise.resolve(); });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    act(() => {
      result.current.updateShelfMotionSettings({ preset: "glass", intensity: "strong", duration: 200, delay: 0 });
    });

    expect(document.documentElement.dataset.shelfMotion).toBe("glass");

    await act(async () => {
      vi.advanceTimersByTime(250);
      await Promise.resolve();
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    const sentBody = JSON.parse(fetchMock.mock.calls[1][1].body);
    expect(sentBody).not.toHaveProperty("motion");
    const saved = JSON.parse(window.localStorage.getItem(THEME_STORAGE_KEY));
    expect(saved.motion).toEqual({ preset: "glass", intensity: "strong", duration: 200, delay: 0 });
  });
});

describe("normalizeLoaderSettings", () => {
  it("keeps valid values and falls back for invalid preferences", () => {
    expect(normalizeLoaderSettings()).toEqual(DEFAULT_LOADER_SETTINGS);
    expect(normalizeLoaderSettings({ enabled: "no", style: "spiral", speed: "warp", labels: "yes" }))
      .toEqual(DEFAULT_LOADER_SETTINGS);
    expect(normalizeLoaderSettings({ enabled: false, style: "bar", speed: "calm", labels: false }))
      .toEqual({ enabled: false, style: "bar", speed: "calm", labels: false });
  });
});
