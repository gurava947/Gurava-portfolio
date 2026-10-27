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

function stubShelfGeometry(container, track) {
  Object.defineProperty(track, "clientWidth", { configurable: true, value: 1000 });
  track.getBoundingClientRect = () => ({ left: 0, top: 0, right: 1000, bottom: 0, width: 1000, height: 0, x: 0, y: 0, toJSON: () => ({}) });
  container.querySelectorAll(".collection-shelf-item").forEach((item, index) => {
    const left = 300 + index * 420;
    item.getBoundingClientRect = () => ({ left, top: 0, right: left + 400, bottom: 0, width: 400, height: 0, x: left, y: 0, toJSON: () => ({}) });
  });
}

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

  it("centers the shelf cards with arrow, Home and End keys", () => {
    const { container } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(container, track);

    fireEvent.keyDown(track, { key: "ArrowRight" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 420, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "ArrowLeft" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(scrollTo).toHaveBeenLastCalledWith({ left: 840, behavior: "smooth" });

    expect(container.querySelector(".collection-shelf-track")).toHaveAttribute("tabindex", "0");
  });

  it("centers the active collection card when a selection changes", () => {
    const { container, rerender } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(container, track);

    rerender(
      <CollectionShelf
        collections={collections}
        projects={projects}
        activeCollection="static"
        onSelect={vi.fn()}
        label="Collections"
      />,
    );

    expect(scrollTo).toHaveBeenLastCalledWith({ left: 840, behavior: "smooth" });
  });

  it("centers the middle card on load when the shelf overflows", async () => {
    const { container } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(container, track);
    Object.defineProperty(track, "scrollWidth", { configurable: true, value: 1800 });

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ left: 420, behavior: "auto" });
    });
  });

  it("enables the scroll buttons only when the shelf overflows", async () => {
    renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    Object.defineProperty(track, "clientWidth", { configurable: true, value: 900 });
    Object.defineProperty(track, "scrollWidth", { configurable: true, value: 1800 });
    Object.defineProperty(track, "scrollLeft", { configurable: true, value: 0 });
    track.scrollTo = vi.fn();

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
