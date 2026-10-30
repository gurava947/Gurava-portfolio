import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Three3DStage from "./Three3DStage";
import { DEFAULT_THREE_3D } from "../config/three3d";

// jsdom has no WebGL, so the engine is replaced with a recorder. Everything under test is the host's
// contract with it: when it is asked for, what it is handed, and when it is torn down.
const createStage = vi.fn();
const updateStage = vi.fn();
const disposeStage = vi.fn();

vi.mock("../three/stage3d", () => ({
  isThree3DSupported: () => true,
  createThree3DStage: (options) => {
    createStage(options);
    // One style is reserved to stand in for a device the engine refuses.
    if (options.settings.style === "prism") return null;
    return {
      update: updateStage,
      dispose: disposeStage,
      getStats: () => ({ drawCalls: 1, instances: 720, triangles: 8640, pixelRatio: 2 }),
    };
  },
}));

const palette = { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6", mode: "dark" };
const projects = [{ id: "p1", title: "Book store", category: "static" }];

function stageSettings(overrides = {}) {
  return { ...DEFAULT_THREE_3D, ...overrides };
}

beforeEach(() => {
  createStage.mockClear();
  updateStage.mockClear();
  disposeStage.mockClear();
});

describe("Three3DStage", () => {
  it("renders nothing and asks for no engine while the style is off", () => {
    const { container } = render(<Three3DStage settings={DEFAULT_THREE_3D} projects={projects} palette={palette} />);

    expect(container.innerHTML).toBe("");
    expect(createStage).not.toHaveBeenCalled();
  });

  it("mounts one canvas and hands the engine the settings, palette and catalogue", async () => {
    const { container } = render(
      <Three3DStage settings={stageSettings({ style: "swarm" })} projects={projects} palette={palette} />,
    );

    await waitFor(() => expect(createStage).toHaveBeenCalledTimes(1));
    expect(container.querySelectorAll("canvas")).toHaveLength(1);
    expect(container.querySelector(".three-3d-stage").getAttribute("aria-hidden")).toBe("true");
    expect(createStage.mock.calls[0][0]).toMatchObject({
      settings: stageSettings({ style: "swarm" }),
      palette,
      projects,
    });
  });

  it("skips the scrim when the switch is off", async () => {
    const { container } = render(
      <Three3DStage settings={stageSettings({ style: "vortex", scrim: false })} projects={projects} palette={palette} />,
    );

    await waitFor(() => expect(createStage).toHaveBeenCalled());
    expect(container.querySelector(".three-3d-scrim")).toBeNull();
  });

  it("pushes a settings change into the live stage instead of building a second one", async () => {
    const { rerender } = render(
      <Three3DStage settings={stageSettings({ style: "helix" })} projects={projects} palette={palette} />,
    );
    await waitFor(() => expect(createStage).toHaveBeenCalledTimes(1));

    rerender(<Three3DStage settings={stageSettings({ style: "helix", count: 1200 })} projects={projects} palette={palette} />);

    expect(createStage).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(updateStage).toHaveBeenCalled());
    expect(updateStage.mock.calls.at(-1)[0]).toMatchObject({ style: "helix", count: 1200 });

    rerender(<Three3DStage settings={stageSettings({ style: "helix", count: 1200 })} projects={projects} palette={palette} />);
    expect(updateStage).toHaveBeenCalledTimes(1);
  });

  it("disposes the stage when 3D is switched back off", async () => {
    const { container, rerender } = render(
      <Three3DStage settings={stageSettings({ style: "rings" })} projects={projects} palette={palette} />,
    );
    await waitFor(() => expect(createStage).toHaveBeenCalledTimes(1));

    rerender(<Three3DStage settings={DEFAULT_THREE_3D} projects={projects} palette={palette} />);

    expect(disposeStage).toHaveBeenCalledTimes(1);
    expect(container.innerHTML).toBe("");
  });

  it("falls back to the flat design when the engine refuses the device", async () => {
    const { container } = render(
      <Three3DStage
        settings={stageSettings({ style: "prism" })}
        projects={projects}
        palette={palette}
        fallback={<p>No WebGL here</p>}
      />,
    );

    await waitFor(() => expect(createStage).toHaveBeenCalled());
    expect(screen.getByText("No WebGL here")).toBeInTheDocument();
    expect(container.querySelector("canvas")).toBeNull();
  });

  it("reports the live draw calls back to whoever is watching", async () => {
    const onStats = vi.fn();
    render(
      <Three3DStage settings={stageSettings({ style: "lattice" })} projects={projects} palette={palette} onStats={onStats} />,
    );

    await waitFor(() => expect(onStats).toHaveBeenCalled());
    expect(onStats).toHaveBeenCalledWith({ drawCalls: 1, instances: 720, triangles: 8640, pixelRatio: 2 });
  });
});
