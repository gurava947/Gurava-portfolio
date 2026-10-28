import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ProjectSlider from "./ProjectSlider";

const projects = [
  { id: "one", title: "First build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
  { id: "two", title: "Second build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
  { id: "three", title: "Third build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
];

// The rail measures whichever way it runs, so each axis gets its own pair of extent numbers.
const EXTENTS = {
  vertical: { visible: "clientHeight", total: "scrollHeight", position: "scrollTop", prop: "top" },
  horizontal: { visible: "clientWidth", total: "scrollWidth", position: "scrollLeft", prop: "left" },
};

function renderSlider(overrides = {}, axis = "vertical") {
  const geometry = EXTENTS[axis];
  if (axis === "vertical") delete document.documentElement.dataset.featuredAxis;
  else document.documentElement.dataset.featuredAxis = axis;
  const view = render(<ProjectSlider projects={projects} {...overrides} />);
  const track = screen.getByRole("region", { name: /scrollable/i });
  track.scrollBy = vi.fn();
  track.scrollTo = vi.fn();
  Object.defineProperty(track, geometry.visible, { configurable: true, value: 1000 });
  Object.defineProperty(track, geometry.total, { configurable: true, value: 2600 });
  Object.defineProperty(track, geometry.position, { configurable: true, value: 0, writable: true });
  return { track, geometry, ...view };
}

afterEach(() => {
  delete document.documentElement.dataset.featuredAxis;
});

describe("ProjectSlider", () => {
  it("renders every card inside a labelled scroll region", () => {
    renderSlider();
    expect(screen.getByText("First build")).toBeInTheDocument();
    expect(screen.getByText("Third build")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("region")).toHaveAttribute("data-axis", "vertical");
    expect(screen.getByText(/up and down arrow keys/i)).toBeInTheDocument();
  });

  it("scrolls by a page with the arrow buttons and disables the start side", async () => {
    const { track, geometry } = renderSlider();
    fireEvent.scroll(track);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Scroll project cards down" })).toBeEnabled();
    });
    expect(screen.getByRole("button", { name: "Scroll project cards up" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Scroll project cards down" }));
    expect(track.scrollBy).toHaveBeenCalledWith({ [geometry.prop]: 820, behavior: "smooth" });

    expect(containerCards()).toHaveLength(3);
    expect(document.querySelectorAll(".lab-card-rail-fade")).toHaveLength(2);
  });

  it("supports arrow, Home and End keys in the chosen direction", () => {
    const { track, geometry } = renderSlider();

    fireEvent.keyDown(track, { key: "ArrowDown" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ [geometry.prop]: 820, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "ArrowUp" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ [geometry.prop]: -820, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 2600, behavior: "smooth" });
  });

  it("measures sideways instead when the site look asks for a horizontal shuffle", async () => {
    const { track, geometry } = renderSlider({}, "horizontal");
    expect(track).toHaveAttribute("data-axis", "horizontal");
    expect(screen.getByText(/left and right arrow keys/i)).toBeInTheDocument();

    fireEvent.scroll(track);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Scroll project cards right" })).toBeEnabled();
    });
    fireEvent.click(screen.getByRole("button", { name: "Scroll project cards right" }));
    expect(track.scrollBy).toHaveBeenCalledWith({ [geometry.prop]: 820, behavior: "smooth" });
  });

  it("tracks the scroll position in its progress indicator", async () => {
    const { track, geometry } = renderSlider();
    track[geometry.position] = 800;
    fireEvent.scroll(track);

    await waitFor(() => {
      const thumb = document.querySelector(".lab-card-rail-progress i");
      expect(Number.parseFloat(thumb.style.width)).toBeCloseTo(38.46, 1);
      expect(Number.parseFloat(thumb.style.left)).toBeCloseTo(30.77, 1);
    });

    expect(screen.getByRole("button", { name: "Scroll project cards down" })).toBeEnabled();
    expect(document.querySelector(".lab-card-rail-fade.is-start")).not.toHaveClass("is-hidden");
  });

  it("resets to the start when the reset key changes", () => {
    const { track, geometry, rerender } = renderSlider({ resetKey: "page-1" });
    track[geometry.position] = 900;

    rerender(<ProjectSlider projects={projects} resetKey="page-2" onNavigate={undefined} />);

    expect(track[geometry.position]).toBe(0);
  });
});

function containerCards() {
  return document.querySelectorAll(".lab-project-card");
}
