import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CollectionShelf from "./CollectionShelf";

const collections = [
  { id: "python", label: "Python", count: 71, description: "Structured practice across the Python track." },
  { id: "responsive", label: "Responsive Web", count: 35, description: "Layout and component practice builds." },
  { id: "static", label: "Static Web", count: 39, description: "Markup and styling practice pages." },
];

const projects = [
  { id: "py-one", collection: "python", cardCode: "print('hello')", cardOutput: "hello" },
  { id: "rw-one", collection: "responsive", thumbnail: "/thumb-responsive.jpg" },
  { id: "sw-one", collection: "static", thumbnail: "/thumb-static.jpg" },
];

function renderShelf(overrides = {}) {
  const onSelect = vi.fn();
  const view = render(
    <CollectionShelf
      collections={collections}
      projects={projects}
      onSelect={onSelect}
      label="Collections"
      {...overrides}
    />,
  );
  return { onSelect, ...view };
}

describe("CollectionShelf", () => {
  it("shows the supplied names, counts and descriptions in stacked glass windows", () => {
    const { container } = renderShelf();

    expect(screen.getByRole("button", { name: "Python, 71 projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Responsive Web, 35 projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Static Web, 39 projects" })).toBeInTheDocument();
    expect(screen.getByText("Structured practice across the Python track.")).toBeInTheDocument();
    expect(screen.queryByText(/Showing this collection/)).not.toBeInTheDocument();
    expect(container.querySelectorAll(".collection-shelf-window")).toHaveLength(1);
    expect(container.querySelectorAll(".collection-shelf-item")).toHaveLength(3);
    expect(container.querySelectorAll(".collection-shelf-stack i")).toHaveLength(6);
    expect(container.querySelectorAll(".collection-shelf-reflection")).toHaveLength(3);
  });

  it("selects a collection and clears the filter when it is pressed again", () => {
    const { onSelect, rerender } = renderShelf();

    fireEvent.click(screen.getByRole("button", { name: "Responsive Web, 35 projects" }));
    expect(onSelect).toHaveBeenCalledWith("responsive");

    rerender(
      <CollectionShelf
        collections={collections}
        projects={projects}
        activeCollection="responsive"
        onSelect={onSelect}
        label="Collections"
      />,
    );
    const activeCard = screen.getByRole("button", { name: "Responsive Web, 35 projects" });
    expect(activeCard).toHaveAttribute("aria-pressed", "true");
    expect(activeCard.querySelector(".collection-shelf-cue")).toHaveTextContent("Showing this collection");

    fireEvent.click(screen.getByRole("button", { name: "Responsive Web, 35 projects" }));
    expect(onSelect).toHaveBeenLastCalledWith("");
  });

  it("moves the shelf with arrow, Home and End keys", () => {
    const { container } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollBy = vi.fn();
    const scrollTo = vi.fn();
    track.scrollBy = scrollBy;
    track.scrollTo = scrollTo;

    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(scrollBy).toHaveBeenLastCalledWith({ left: 260, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "ArrowLeft" });
    expect(scrollBy).toHaveBeenLastCalledWith({ left: -260, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: expect.any(Number), behavior: "smooth" });

    expect(container.querySelector(".collection-shelf-track")).toHaveAttribute("tabindex", "0");
  });

  it("enables the scroll buttons only when the shelf overflows", async () => {
    renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    Object.defineProperty(track, "clientWidth", { configurable: true, value: 900 });
    Object.defineProperty(track, "scrollWidth", { configurable: true, value: 1800 });
    Object.defineProperty(track, "scrollLeft", { configurable: true, value: 0 });

    fireEvent.scroll(track);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Scroll collections right" })).toBeEnabled();
    });
    expect(screen.getByRole("button", { name: "Scroll collections left" })).toBeDisabled();
  });

  it("renders a non-interactive sample in preview mode", () => {
    const { container } = renderShelf({ preview: true, motion: { preset: "fade", intensity: "strong", duration: 400, delay: 40 } });

    const shelf = container.querySelector('[data-preview="true"]');
    expect(shelf).toHaveAttribute("data-shelf-motion", "fade");
    expect(shelf.style.getPropertyValue("--shelf-motion-duration")).toBe("400ms");
    expect(shelf.style.getPropertyValue("--shelf-motion-shift")).toBe("24px");
    expect(screen.queryByRole("button", { name: /projects/ })).not.toBeInTheDocument();
    expect(container.querySelectorAll(".collection-shelf-card")).toHaveLength(3);
    expect(container.querySelectorAll(".collection-shelf-stack i")).toHaveLength(6);
  });
});
