import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectSlider from "./ProjectSlider";

const projects = Array.from({ length: 6 }, (_, index) => ({
  id: `build-${index}`,
  title: `${index + 1} build`,
  collection: "python",
  collectionLabel: "Python",
  category: "Practice",
  language: "Python",
  practiceLabel: "Exercise",
  previewType: "python",
}));

// The grid is measured, not counted in JS: the component reads the column and row counts off the
// stylesheet and the column distance off the laid-out cards, so the test lays out the same shape by
// hand. Columns fill top to bottom, hence the row divisor on the offset.
function renderSlider({ cols = 2, rows = 3, columnStep = 300, clientWidth = 600, scrollWidth = 2400, scrollLeft = 0, ...rest } = {}) {
  const view = render(<ProjectSlider projects={projects} {...rest} />);
  const track = screen.getByRole("region", { name: /scrollable/i });
  track.scrollBy = vi.fn();
  track.scrollTo = vi.fn();
  track.style.setProperty("--rail-cols", String(cols));
  track.style.setProperty("--rail-rows", String(rows));
  Object.defineProperty(track, "clientWidth", { configurable: true, value: clientWidth });
  Object.defineProperty(track, "scrollWidth", { configurable: true, value: scrollWidth });
  Object.defineProperty(track, "scrollLeft", { configurable: true, writable: true, value: scrollLeft });
  [...track.children].forEach((child, index) => {
    Object.defineProperty(child, "offsetLeft", { configurable: true, value: Math.floor(index / rows) * columnStep });
  });
  return { track, cols, rows, columnStep, pageWidth: columnStep * cols, ...view };
}

// Measurement is deferred to an animation frame, so a test that asserts anything derived from the
// grid has to scroll once and wait for the state to land. The wait names the counts it expects:
// the hint reads "1 × 1 grid" from the unmeasured default before that frame runs, so waiting for
// any "×" would resolve on the first paint and the assertion below would race the measurement.
async function measured(track, label) {
  fireEvent.scroll(track);
  await waitFor(() => expect(screen.getByText(label)).toBeInTheDocument());
}

// jsdom has no PointerEvent, so the fallback Testing Library builds carries none of the properties a
// gesture needs and React reads them straight off the native event. Same workaround the rail uses.
function pointer(node, type, init) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.assign(event, init);
  act(() => {
    node.dispatchEvent(event);
  });
  return event;
}

describe("ProjectSlider", () => {
  it("renders every card inside a labelled scroll region", () => {
    renderSlider();
    expect(screen.getByText("1 build")).toBeInTheDocument();
    expect(screen.getByText("6 build")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute("tabindex", "0");
    expect(document.querySelectorAll(".lab-card-rail-fade")).toHaveLength(2);
  });

  it("names the grid by the counts the stylesheet gave it", async () => {
    const { track, cols, rows } = renderSlider();
    await measured(track, `${cols} × ${rows} grid`);
    expect(screen.getByText(/2 × 3 grid/i)).toBeInTheDocument();
  });

  it("pages by a whole screen with the edge buttons and disables the start side", async () => {
    const { track, pageWidth } = renderSlider();
    const next = screen.getByRole("button", { name: "Go to the next page of project cards" });
    const prev = screen.getByRole("button", { name: "Go to the previous page of project cards" });

    await waitFor(() => expect(next).toBeEnabled());
    expect(prev).toBeDisabled();

    fireEvent.click(next);
    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: pageWidth, behavior: "smooth" });

    // Nothing moved yet, so the back side is still parked: a disabled button is the point.
    expect(prev).toBeDisabled();
    fireEvent.click(prev);
    expect(track.scrollTo).toHaveBeenCalledTimes(1);
  });

  it("counts the pages the grid needs", async () => {
    const { track } = renderSlider({ scrollLeft: 600 });
    fireEvent.scroll(track);
    await waitFor(() => expect(screen.getByText("2 / 4")).toBeInTheDocument());
  });

  it("steps one column with the arrow keys and jumps with Home and End", () => {
    const { track, columnStep, pageWidth } = renderSlider();

    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: columnStep, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "ArrowLeft" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -columnStep, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 2400, behavior: "smooth" });

    expect(pageWidth).toBe(600);
  });

  it("tracks the scroll position in its progress indicator", async () => {
    const { track } = renderSlider({ scrollLeft: 600 });
    fireEvent.scroll(track);

    await waitFor(() => {
      const thumb = document.querySelector(".lab-card-rail-progress i");
      expect(Number.parseFloat(thumb.style.width)).toBeCloseTo(25, 1);
      expect(Number.parseFloat(thumb.style.left)).toBeCloseTo(25, 1);
    });
    expect(document.querySelector(".lab-card-rail-fade.is-start")).not.toHaveClass("is-hidden");
  });

  it("hides the paging control when every card already fits", async () => {
    const { track } = renderSlider({ scrollWidth: 600 });
    fireEvent.scroll(track);

    await waitFor(() => {
      expect(document.querySelector(".lab-card-rail-shell")).toHaveClass("is-single-page");
    });
    expect(screen.queryByText(/\/ \d+$/)).not.toBeInTheDocument();
  });

  it("resets to the first page when the reset key changes", () => {
    const { track, rerender } = renderSlider({ resetKey: "page-1", scrollLeft: 900 });

    rerender(<ProjectSlider projects={projects} resetKey="page-2" />);

    expect(track.scrollLeft).toBe(0);
  });

  it("drags the band sideways with a mouse and lets go without opening a card", () => {
    const { track } = renderSlider();

    pointer(track, "pointerdown", { pointerType: "mouse", button: 0, clientX: 500, clientY: 200 });
    pointer(track, "pointermove", { pointerType: "mouse", clientX: 496, clientY: 200 });
    expect(track.scrollLeft).toBe(0);
    expect(track).not.toHaveClass("is-dragging");

    pointer(track, "pointermove", { pointerType: "mouse", clientX: 400, clientY: 200 });
    expect(track.scrollLeft).toBe(100);
    expect(track).toHaveClass("is-dragging");

    pointer(track, "pointerup", { pointerType: "mouse", clientX: 400, clientY: 200 });
    expect(track).not.toHaveClass("is-dragging");
    // The click the browser fires after a release must not navigate out of the catalogue.
    expect(fireEvent.click(track)).toBe(false);
  });

  it("leaves the gesture alone when the drag switch is off or a finger is doing it", () => {
    const { track } = renderSlider({ rail: { drag: false } });

    pointer(track, "pointerdown", { pointerType: "mouse", button: 0, clientX: 500, clientY: 200 });
    pointer(track, "pointermove", { pointerType: "mouse", clientX: 400, clientY: 200 });
    expect(track.scrollLeft).toBe(0);

    pointer(track, "pointerdown", { pointerType: "touch", button: 0, clientX: 500, clientY: 200 });
    pointer(track, "pointermove", { pointerType: "touch", clientX: 400, clientY: 200 });
    expect(track.scrollLeft).toBe(0);
    expect(track).not.toHaveClass("is-dragging");
  });

  it("stops paging and dragging once the layout wraps the whole set", () => {
    const { track } = renderSlider({ rail: { layout: "grid" } });
    const next = screen.getByRole("button", { name: "Go to the next page of project cards" });

    fireEvent.keyDown(track, { key: "ArrowRight" });
    fireEvent.keyDown(track, { key: "End" });
    expect(track.scrollTo).not.toHaveBeenCalled();
    expect(track.scrollBy).not.toHaveBeenCalled();

    fireEvent.click(next);
    expect(track.scrollTo).not.toHaveBeenCalled();

    pointer(track, "pointerdown", { pointerType: "mouse", button: 0, clientX: 500, clientY: 200 });
    pointer(track, "pointermove", { pointerType: "mouse", clientX: 400, clientY: 200 });
    expect(track.scrollLeft).toBe(0);
  });
});
