import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useCardHoverPreview from "./useCardHoverPreview.js";

const previewContent = {
  kind: "project",
  title: "Responsive Portfolio",
  eyebrow: "Frontend",
  secondary: "React",
  description: "A project description for the hover preview.",
  tags: ["React", "CSS"],
  hint: "Click to open the full project",
};

let previewApi;

function PreviewTrigger({ onNavigate = vi.fn() }) {
  previewApi = useCardHoverPreview(previewContent);
  return (
    <article data-testid="card" {...previewApi.triggerProps}>
      <a href="/project" onClick={onNavigate}>Responsive Portfolio</a>
      {previewApi.preview}
    </article>
  );
}

function pointerEvent(card, values = {}) {
  return {
    currentTarget: card,
    clientX: 180,
    clientY: 420,
    pointerType: "mouse",
    ...values,
  };
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("requestAnimationFrame", (callback) => {
    callback();
    return 0;
  });
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function getBounds() {
    if (this.classList?.contains("card-hover-preview")) {
      return { left: 0, top: 0, right: 320, bottom: 250, width: 320, height: 250 };
    }
    return { left: 20, top: 300, right: 220, bottom: 500, width: 200, height: 200 };
  });
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
  Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 });
});

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("useCardHoverPreview", () => {
  it("opens after a mouse-hover delay in a viewport-clamped portal and closes on leave", () => {
    render(<PreviewTrigger />);
    const card = screen.getByTestId("card");

    act(() => previewApi.triggerProps.onPointerEnter(pointerEvent(card, { clientX: 380, clientY: 280 })));
    act(() => vi.advanceTimersByTime(379));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    const tooltip = screen.getByRole("tooltip");
    expect(tooltip).toHaveTextContent("Responsive Portfolio");
    expect(tooltip.parentElement).toBe(document.body);
    expect(card).not.toContainElement(tooltip);
    expect(tooltip).toHaveStyle({ left: "44px", top: "14px" });

    act(() => previewApi.triggerProps.onPointerLeave(pointerEvent(card)));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("opens for keyboard focus and preserves normal click navigation", () => {
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<PreviewTrigger onNavigate={onNavigate} />);

    const link = screen.getByRole("link", { name: "Responsive Portfolio" });
    act(() => fireEvent.focus(link));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledOnce();
  });

  it("shows only during a touch long-press and suppresses that gesture's click", () => {
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<PreviewTrigger onNavigate={onNavigate} />);
    const card = screen.getByTestId("card");

    act(() => previewApi.triggerProps.onPointerDown(pointerEvent(card, { pointerType: "touch", clientX: 90, clientY: 460 })));
    act(() => vi.advanceTimersByTime(499));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    act(() => previewApi.triggerProps.onPointerUp(pointerEvent(card, { pointerType: "touch" })));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Responsive Portfolio" });
    fireEvent.click(link);
    expect(onNavigate).not.toHaveBeenCalled();

    fireEvent.click(link);
    expect(onNavigate).toHaveBeenCalledOnce();
  });
});
