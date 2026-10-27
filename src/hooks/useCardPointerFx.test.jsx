import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCardPointerFx } from "./useCardPointerFx";

function createCard() {
  const card = document.createElement("div");
  card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100 });
  document.body.appendChild(card);
  return card;
}

const effects = { enabled: true, intensity: "medium", projects: "none", certificates: "none" };

beforeEach(() => {
  vi.stubGlobal("requestAnimationFrame", (callback) => {
    callback();
    return 1;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
  document.body.innerHTML = "";
  delete document.documentElement.dataset.reducedMotion;
});

describe("useCardPointerFx", () => {
  it("writes normalized pointer variables for tilt", () => {
    const card = createCard();
    const ref = { current: card };
    const { result } = renderHook(() => useCardPointerFx({ ref, effect: "tilt", effects }));

    act(() => {
      result.current.onPointerMove({ pointerType: "mouse", clientX: 150, clientY: 25 });
    });

    expect(card.style.getPropertyValue("--fx-rx")).toBe("2.27deg");
    expect(card.style.getPropertyValue("--fx-ry")).toBe("3.50deg");
    expect(card.style.getPropertyValue("--fx-px")).toBe("-5.00px");
    expect(card.style.getPropertyValue("--fx-py")).toBe("5.00px");
    expect(card.style.getPropertyValue("--fx-mx")).toBe("75.0%");
    expect(card.style.getPropertyValue("--fx-my")).toBe("25.0%");

    act(() => result.current.onPointerLeave());
    expect(card.style.getPropertyValue("--fx-rx")).toBe("0deg");
    expect(card.style.getPropertyValue("--fx-mx")).toBe("50%");
  });

  it("ignores touch pointers and reduced motion", () => {
    const card = createCard();
    const ref = { current: card };
    const { result } = renderHook(() => useCardPointerFx({ ref, effect: "spotlight", effects }));

    act(() => {
      result.current.onPointerMove({ pointerType: "touch", clientX: 150, clientY: 25 });
    });
    expect(card.style.getPropertyValue("--fx-mx")).toBe("");

    document.documentElement.dataset.reducedMotion = "true";
    act(() => {
      result.current.onPointerMove({ pointerType: "mouse", clientX: 150, clientY: 25 });
    });
    expect(card.style.getPropertyValue("--fx-mx")).toBe("");
  });

  it("attaches no handlers when effects are off or non-pointer based", () => {
    const card = createCard();
    const ref = { current: card };

    const off = renderHook(() => useCardPointerFx({ ref, effect: "tilt", effects: { ...effects, enabled: false } }));
    expect(off.result.current).toEqual({});

    const reveal = renderHook(() => useCardPointerFx({ ref, effect: "reveal", effects }));
    expect(reveal.result.current).toEqual({});
  });
});
