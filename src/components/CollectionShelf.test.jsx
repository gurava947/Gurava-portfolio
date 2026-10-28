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

// The shelf measures whichever way it runs. Both directions are laid out on the same numbers —
// a 1000px band, cards 400 long starting at 300 and stepping 420 — so centring produces the same
// scroll offsets and only the property names change.
const AXES = {
  horizontal: {
    visible: "clientWidth", total: "scrollWidth", position: "scrollLeft", prop: "left",
    forwards: "ArrowRight", backwards: "ArrowLeft", edge: "left", extent: "width",
    button: (side) => `Scroll collections ${side === 1 ? "right" : "left"}`,
  },
  vertical: {
    visible: "clientHeight", total: "scrollHeight", position: "scrollTop", prop: "top",
    forwards: "ArrowDown", backwards: "ArrowUp", edge: "top", extent: "height",
    button: (side) => `Scroll collections ${side === 1 ? "down" : "up"}`,
  },
};

function rectFor(overrides) {
  const base = { left: 0, top: 0, right: 1000, bottom: 1000, width: 1000, height: 1000, x: 0, y: 0, toJSON: () => ({}) };
  return { ...base, ...overrides };
}

function stubShelfGeometry(axis, container, track) {
  const geometry = AXES[axis];
  const sideways = geometry.edge === "left";
  Object.defineProperty(track, geometry.visible, { configurable: true, value: 1000 });
  track.getBoundingClientRect = () => rectFor(sideways ? { width: 1000, height: 0 } : { width: 0, height: 1000 });
  container.querySelectorAll(".collection-shelf-item").forEach((item, index) => {
    const start = 300 + index * 420;
    item.getBoundingClientRect = () => (sideways
      ? rectFor({ left: start, right: start + 400, width: 400, height: 0, x: start })
      : rectFor({ top: start, bottom: start + 400, width: 0, height: 400, y: start }));
  });
}

function renderShelf(overrides = {}, axis = "vertical") {
  if (axis === "vertical") delete document.documentElement.dataset.featuredAxis;
  else document.documentElement.dataset.featuredAxis = axis;
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
  return { onSelect, axis, geometry: AXES[axis], ...view };
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

  it("stacks downward by default and carries the card count to the stylesheet", () => {
    const { container } = renderShelf();
    const shelf = container.querySelector(".collection-shelf");

    expect(shelf).toHaveAttribute("data-axis", "vertical");
    expect(shelf.style.getPropertyValue("--shelf-items")).toBe("3");
    expect(screen.getByText(/up and down arrow keys/i)).toBeInTheDocument();
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
    const { container, geometry, axis, rerender } = renderShelf({}, "horizontal");
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(axis, container, track);

    fireEvent.keyDown(track, { key: geometry.forwards });
    expect(scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 420, behavior: "smooth" });

    fireEvent.keyDown(track, { key: geometry.backwards });
    expect(scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "Home" });
    expect(scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(scrollTo).toHaveBeenLastCalledWith({ [geometry.prop]: 840, behavior: "smooth" });

    expect(container.querySelector(".collection-shelf-track")).toHaveAttribute("tabindex", "0");
  });

  it("centres downward with the same keys when the shuffle runs vertically", () => {
    const { container, geometry, axis } = renderShelf();
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(axis, container, track);

    fireEvent.keyDown(track, { key: geometry.forwards });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 420, behavior: "smooth" });

    fireEvent.keyDown(track, { key: geometry.backwards });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: "smooth" });

    fireEvent.keyDown(track, { key: "End" });
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 840, behavior: "smooth" });
  });

  it("centers the active collection card when a selection changes", () => {
    const { container, geometry, axis, rerender } = renderShelf({}, "horizontal");
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(axis, container, track);

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
    const { container, geometry, axis, rerender } = renderShelf({}, "horizontal");
    const track = screen.getByRole("region", { name: "Project collections" });
    const scrollTo = vi.fn();
    track.scrollTo = scrollTo;
    stubShelfGeometry(axis, container, track);
    Object.defineProperty(track, geometry.total, { configurable: true, value: 1800 });

    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ [geometry.prop]: 420, behavior: "auto" });
    });
  });

  it("enables the scroll buttons only when the shelf overflows", async () => {
    const { geometry, axis } = renderShelf({}, "vertical");
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
    expect(track.closest(".collection-shelf")).toHaveAttribute("data-axis", axis);
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

  it("runs one card at a time sideways on a phone, whatever the shuffle direction says", () => {
    const original = window.matchMedia;
    window.matchMedia = (query) => ({
      media: query,
      matches: query.includes("max-width: 767"),
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    });

    try {
      const { container } = renderShelf();
      const shelf = container.querySelector(".collection-shelf");

      expect(shelf).toHaveAttribute("data-axis", "horizontal");
      expect(screen.getByRole("button", { name: "Scroll collections right" })).toBeInTheDocument();
      expect(screen.queryByText(/up and down arrow keys/i)).not.toBeInTheDocument();
    } finally {
      window.matchMedia = original;
    }
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
