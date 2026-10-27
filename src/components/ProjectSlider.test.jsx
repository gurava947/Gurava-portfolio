import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProjectSlider from "./ProjectSlider";

const projects = [
  { id: "one", title: "First build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
  { id: "two", title: "Second build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
  { id: "three", title: "Third build", collection: "python", collectionLabel: "Python", category: "Practice", language: "Python", practiceLabel: "Exercise", previewType: "python" },
];

function renderSlider(overrides = {}) {
  const view = render(<ProjectSlider projects={projects} {...overrides} />);
  const track = screen.getByRole("region", { name: /horizontally scrollable/i });
  track.scrollBy = vi.fn();
  track.scrollTo = vi.fn();
  Object.defineProperty(track, "clientWidth", { configurable: true, value: 1000 });
  Object.defineProperty(track, "scrollWidth", { configurable: true, value: 2600 });
  Object.defineProperty(track, "scrollLeft", { configurable: true, value: 0, writable: true });
  return { track, ...view };
}

describe("ProjectSlider", () => {
  it("renders every card inside a labelled scroll region", () => {
    renderSlider();
    expect(screen.getByText("First build")).toBeInTheDocument();
    expect(screen.getByText("Third build")).toBeInTheDocument();
    expect(screen.getByRole("region")).toHaveAttribute("tabindex", "0");
    expect(screen.getByText(/left and right arrow keys/i)).toBeInTheDocument();
  });

  it("scrolls by a page with the arrow buttons and disables the start side", async () => {
    const { track, container } = renderSlider();
    fireEvent.scroll(track);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Scroll project cards right" })).toBeEnabled();
    });
    expect(screen.getByRole("button", { name: "Scroll project cards left" })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: "Scroll project cards right" }));
    expect(track.scrollBy).toHaveBeenCalledWith({ left: 820, behavior: "smooth" });

    expect(container.querySelectorAll(".lab-project-card")).toHaveLength(3);
    expect(container.querySelectorAll(".lab-card-rail-fade")).toHaveLength(2);
  });

  it("supports arrow, Home and End keys", () => {
    const { track } = renderSlider();

    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: 820, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "ArrowLeft" });
    expect(track.scrollBy).toHaveBeenLastCalledWith({ left: -820, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(track.scrollTo).toHaveBeenLastCalledWith({ left: 2600, behavior: "smooth" });
  });

  it("tracks the scroll position in its progress indicator", async () => {
    const { track, container } = renderSlider();
    track.scrollLeft = 800;
    fireEvent.scroll(track);

    await waitFor(() => {
      const thumb = container.querySelector(".lab-card-rail-progress i");
      expect(Number.parseFloat(thumb.style.width)).toBeCloseTo(38.46, 1);
      expect(Number.parseFloat(thumb.style.left)).toBeCloseTo(30.77, 1);
    });

    expect(screen.getByRole("button", { name: "Scroll project cards right" })).toBeEnabled();
    expect(container.querySelector(".lab-card-rail-fade.is-start")).not.toHaveClass("is-hidden");
  });

  it("resets to the start when the reset key changes", () => {
    const { track, rerender } = renderSlider({ resetKey: "page-1" });
    track.scrollLeft = 900;

    rerender(<ProjectSlider projects={projects} resetKey="page-2" onNavigate={undefined} />);

    expect(track.scrollLeft).toBe(0);
  });
});
