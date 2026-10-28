import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
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

// The shelf measures the way it runs: sideways, one window at a time. Every card is laid out on the
// same numbers — a 1000px band, cards 400 long starting at 300 and stepping 420 — so centring
// produces predictable scroll offsets.
const GEOMETRY = {
  visible: "clientWidth", total: "scrollWidth", position: "scrollLeft", prop: "left",
  edge: "left", extent: "width",
  button: (side) => `Scroll collections ${side === 1 ? "right" : "left"}`,
};

function rectFor(overrides) {
  const base = { left: 0, top: 0, right: 1000, bottom: 1000, width: 1000, height: 1000, x: 0, y: 0, toJSON: () => ({}) };
  return { ...base, ...overrides };
}

function stubShelfGeometry(container, track) {
  Object.defineProperty(track, GEOMETRY.visible, { configurable: true, value: 1000 });
  track.getBoundingClientRect = () => rectFor({ width: 1000, height: 0 });
  container.querySelectorAll(".collection-shelf-item").forEach((item, index) => {
    const start = 300 + index * 420;
    item.getBoundingClientRect = () => rectFor({ left: start, right: start + 400, width: 400, height: 0, x: start });
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
  return { onSelect, geometry: GEOMETRY, ...view };
}

afterEach(() => {
  delete document.documentElement.dataset.featuredAxis;
});

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

  it("slides sideways whatever the site-wide shuffle direction says, and carries the count", () => {
    document.documentElement.dataset.featuredAxis = "vertical";
    const { container } = renderShelf();
    const shelf = container.querySelector(".collection-shelf");

    expect(shelf).not.toHaveAttribute("data-axis");
    expect(shelf.style.getPropertyValue("--shelf-items")).toBe("3");
    expect(screen.getByText(/left and right arrow keys/i)).toBeInTheDocument();
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
    const { container, geometry } = renderShelf();
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

  it("ignores the arrows that used to belong to the vertical shuffle", () => {
    const { container } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(container, track);

    fireEvent.keyDown(track, { key: "ArrowDown" });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("centers the active collection card when a selection changes", () => {
    const { container, geometry, rerender } = renderShelf();
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

    expect(scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 840, behavior: "smooth" });
  });

  it("centers the middle card on load when the shelf overflows", async () => {
    const { container, geometry } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(container, track);
    Object.defineProperty(track, geometry.total, { configurable: true, value: 1800 });

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ [geometry.prop]: 420, behavior: "auto" });
    });
  });

  it("enables the scroll buttons only when the shelf overflows", async () => {
    const { geometry } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    Object.defineProperty(track, geometry.visible, { configurable: true, value: 900 });
    Object.defineProperty(track, geometry.total, { configurable: true, value: 1800 });
    Object.defineProperty(track, geometry.position, { configurable: true, value: 0 });
    track.scrollTo = vi.fn();

    fireEvent.scroll(track);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: geometry.button(1) })).toBeEnabled();
    });
    expect(screen.getByRole("button", { name: geometry.button(-1) })).toBeDisabled();
    expect(screen.queryByRole("button", { name: /Scroll collections (up|down)/ })).not.toBeInTheDocument();
  });

  it("puts the back and forward controls at the bottom of the shelf, beside the progress rail", () => {
    const { container } = renderShelf();
    const foot = container.querySelector(".collection-shelf-foot");

    expect(foot).not.toBeNull();
    expect(foot.querySelectorAll(".collection-shelf-button")).toHaveLength(2);
    expect(foot.querySelector(".collection-shelf-progress")).not.toBeNull();
    // Nothing is left in the head above the cards, so the control can never sit on top of one.
    expect(container.querySelector(".collection-shelf-head .collection-shelf-button")).toBeNull();
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
