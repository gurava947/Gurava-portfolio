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
