import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FeatureRail from "./FeatureRail";
import { DEFAULT_FEATURE_RAIL } from "../config/featureRail";

const projects = [
  {
    id: "a",
    title: "Portfolio Practice Sections",
    route: "/projects/a",
    collection: "responsive",
    collectionLabel: "Responsive Web",
    category: "Layouts",
    description: "Nine page sections built from one design system.",
    technologies: ["HTML", "CSS"],
    thumbnail: "/assets/thumbs/a.webp",
  },
  {
    id: "b",
    title: "A deliberately enormous project title that has to wrap rather than widen the page",
    route: "/projects/b",
    collection: "python",
    collectionLabel: "Python",
    category: "Practice",
    description: "Sixty-plus exercises with a live Pyodide console.",
    technologies: ["Python"],
  },
];

/* The rail is measured from the laid-out row, and jsdom lays nothing out, so the test hands it the
   geometry a desktop row would have: 2400px of cards in a 900px window, two and a bit pages. */
function renderRail({ rail = DEFAULT_FEATURE_RAIL, extent = 2400, view = 900, position = 0, ...rest } = {}) {
  const view_ = render(<FeatureRail projects={projects} rail={rail} {...rest} />);
  const scroller = view_.container.querySelector(".feature-rail-scroller");
  if (!scroller) return { ...view_, scroller: null };
  scroller.scrollBy = vi.fn();
  scroller.scrollTo = vi.fn();
  ["Width", "Height"].forEach((axis) => {
    Object.defineProperty(scroller, `scroll${axis}`, { configurable: true, value: extent });
    Object.defineProperty(scroller, `client${axis}`, { configurable: true, value: view });
    Object.defineProperty(scroller, `scroll${axis === "Width" ? "Left" : "Top"}`, {
      configurable: true,
      writable: true,
      value: position,
    });
  });
  fireEvent.scroll(scroller);
  return { ...view_, scroller };
}

/* The axis hook listens through a MutationObserver, which delivers its callback as a microtask, so
   both sides of the attribute have to be changed inside an async act scope. */
afterEach(async () => {
  await act(async () => {
    document.documentElement.removeAttribute("data-featured-axis");
  });
});

/* jsdom has no PointerEvent, and the fallback event Testing Library builds carries none of the
   properties a pointer gesture needs. React reads them straight off the native event, so the test
   puts them there itself. */
function pointer(node, type, init) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, init);
  act(() => {
    node.dispatchEvent(event);
  });
  return event;
}

describe("FeatureRail", () => {
  it("renders the suggestions as separate cards, not one continuous strip", () => {
    const { container } = renderRail();

    expect(container.querySelectorAll(".feature-rail-item")).toHaveLength(2);
    expect(container.querySelectorAll(".feature-rail-item > .lab-project-card")).toHaveLength(2);
    expect(container.querySelector(".poster-rail")).toBeNull();
  });

  it("says which way the row runs and pages it with the dots", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const { container } = renderRail();

    expect(container.querySelector(".feature-rail")).toHaveAttribute("data-axis", "horizontal");
    expect(container.querySelector(".feature-rail")).toHaveClass("is-carousel");
    expect(screen.getByRole("group", { name: "Card pages" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Show page/ })).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Show page 1 of 3" })).toHaveAttribute("aria-current", "true");
  });

  it("disables the arrow that would scroll off the end and steps a page", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const { scroller } = renderRail();

    expect(screen.getByRole("button", { name: "Scroll cards left" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Scroll cards right" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Scroll cards right" }));
    expect(scroller.scrollBy).toHaveBeenLastCalledWith({ left: 900, behavior: "smooth" });
  });

  it("walks the row from the keyboard", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const { scroller } = renderRail();

    fireEvent.keyDown(scroller, { key: "ArrowRight" });
    expect(scroller.scrollBy).toHaveBeenLastCalledWith({ left: 900, behavior: "smooth" });

    fireEvent.keyDown(scroller, { key: "ArrowLeft" });
    expect(scroller.scrollBy).toHaveBeenLastCalledWith({ left: -900, behavior: "smooth" });

    fireEvent.keyDown(scroller, { key: "Home" });
    expect(scroller.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(scroller, { key: "End" });
    expect(scroller.scrollTo).toHaveBeenLastCalledWith({ left: 2400, behavior: "smooth" });
  });

  it("jumps to a page when its dot is pressed", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const { scroller } = renderRail();

    fireEvent.click(screen.getByRole("button", { name: "Show page 3 of 3" }));
    expect(scroller.scrollTo).toHaveBeenLastCalledWith({ left: 1800, behavior: "smooth" });
  });

  it("drags the row with a mouse and swallows the click it leaves behind", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const open = vi.fn();
    const { container, scroller } = renderRail({ onNavigate: (event, route) => { event.preventDefault(); open(route); } });
    const link = container.querySelector(".lab-project-card a");

    pointer(scroller, "pointerdown", { pointerType: "mouse", button: 0, clientX: 700, clientY: 200 });
    pointer(scroller, "pointermove", { pointerType: "mouse", clientX: 620, clientY: 200 });
    expect(scroller.className).toContain("is-dragging");
    expect(scroller.scrollLeft).toBe(80);
    pointer(scroller, "pointerup", { pointerType: "mouse", clientX: 620, clientY: 200 });

    fireEvent.click(link);
    expect(open).not.toHaveBeenCalled();
  });

  it("opens the card when a press never turned into a drag", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const open = vi.fn();
    const { container, scroller } = renderRail({ onNavigate: (event, route) => { event.preventDefault(); open(route); } });
    const link = container.querySelector(".lab-project-card a");

    pointer(scroller, "pointerdown", { pointerType: "mouse", button: 0, clientX: 700, clientY: 200 });
    pointer(scroller, "pointerup", { pointerType: "mouse", clientX: 698, clientY: 200 });

    expect(scroller.className).not.toContain("is-dragging");
    fireEvent.click(link);
    expect(open).toHaveBeenCalledWith("/projects/a");
  });

  it("leaves a touch alone, because the finger already scrolls", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    const open = vi.fn();
    const { container, scroller } = renderRail({ onNavigate: (event, route) => { event.preventDefault(); open(route); } });
    const link = container.querySelector(".lab-project-card a");

    pointer(scroller, "pointerdown", { pointerType: "touch", button: 0, clientX: 700, clientY: 200 });
    pointer(scroller, "pointermove", { pointerType: "touch", clientX: 620, clientY: 200 });
    expect(scroller.className).not.toContain("is-dragging");
    expect(scroller.scrollLeft).toBe(0);
    fireEvent.click(link);
    expect(open).toHaveBeenCalledWith("/projects/a");
  });

  it("turns the chrome off for a row that wraps instead of scrolls", () => {
    const { container } = renderRail({ rail: { ...DEFAULT_FEATURE_RAIL, wrap: true } });

    expect(container.querySelector(".feature-rail")).toHaveClass("is-wrap");
    expect(screen.queryByRole("button", { name: "Scroll cards right" })).toBeNull();
    expect(screen.queryAllByRole("group", { name: "Card pages" })).toHaveLength(0);
    expect(container.querySelector(".feature-rail-scroller")).not.toHaveAttribute("tabindex");
  });

  it("lays a grid out and gives cards-per-view the visible width", () => {
    const { container } = renderRail({ rail: { ...DEFAULT_FEATURE_RAIL, layout: "grid", cardsPerView: 2 } });
    const rail = container.querySelector(".feature-rail");

    expect(rail).toHaveClass("is-grid");
    expect(rail.style.getPropertyValue("--rail-grid")).toBe("repeat(2, minmax(0, 1fr))");
    expect(rail.style.getPropertyValue("--rail-basis")).toContain("calc(");
  });

  it("falls back to the typed card width when nothing is asked for per view", () => {
    const { container } = renderRail({ rail: { ...DEFAULT_FEATURE_RAIL, cardWidth: 420 } });

    expect(container.querySelector(".feature-rail").style.getPropertyValue("--rail-basis")).toBe("min(420px, 100%)");
  });

  it("only gives the cards a height when one is asked for", () => {
    const auto = renderRail();
    expect(auto.container.querySelector(".feature-rail")).not.toHaveClass("is-tall");

    const { container } = renderRail({ rail: { ...DEFAULT_FEATURE_RAIL, cardHeight: 420 } });
    expect(container.querySelector(".feature-rail")).toHaveClass("is-tall");
    expect(container.querySelector(".feature-rail").style.getPropertyValue("--rail-card-height")).toBe("420px");
  });

  it("says so when there is nothing to show", () => {
    const { container } = render(<FeatureRail projects={[]} rail={DEFAULT_FEATURE_RAIL} />);

    expect(screen.getByRole("status")).toHaveTextContent(/once the catalog has projects/i);
    expect(container.querySelector(".feature-rail-scroller")).toBeNull();
  });

  it("keeps a row that fits the window free of chrome", () => {
    document.documentElement.setAttribute("data-featured-axis", "horizontal");
    renderRail({ extent: 900, view: 900 });

    expect(screen.queryAllByRole("group", { name: "Card pages" })).toHaveLength(0);
    expect(screen.queryByRole("button", { name: "Scroll cards right" })).toBeNull();
  });
});
