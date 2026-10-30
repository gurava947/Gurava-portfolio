import { useState } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Three3DStudio from "./Three3DStudio";
import { DEFAULT_THREE_3D, THREE_3D_STYLES } from "../config/three3d";

// The engine speaks WebGL, which jsdom has never seen. The panel is under test here, so the stage is
// replaced by a recorder that reports the settings the panel passed down.
const createStage = vi.fn();
const updateStage = vi.fn();
const disposeStage = vi.fn();

vi.mock("../three/stage3d", () => ({
  isThree3DSupported: () => true,
  createThree3DStage: (options) => {
    createStage(options);
    return {
      update: updateStage,
      dispose: disposeStage,
      getStats: () => ({ drawCalls: 1, instances: 720, triangles: 8640, pixelRatio: 2 }),
    };
  },
}));

const projects = [
  { id: "p1", title: "Subtract 596 from 193856", category: "python" },
  { id: "p2", title: "Responsive course sections", category: "responsive" },
];

const palette = { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6", mode: "dark" };

function Harness({ onApply, initialSettings = DEFAULT_THREE_3D }) {
  const [settings, setSettings] = useState(initialSettings);
  return (
    <Three3DStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
      projects={projects}
      palette={palette}
    />
  );
}

function renderStudio(overrides = {}) {
  const onApply = vi.fn();
  const view = render(<Harness onApply={onApply} {...overrides} />);
  return { onApply, ...view };
}

function styleButton(label) {
  return screen.getByRole("button", { name: new RegExp(`^${label}`, "i") });
}

describe("Three3DStudio", () => {
  it("lists the ten styles and keeps off selected at the shipped default", () => {
    const { onApply } = renderStudio();

    THREE_3D_STYLES.forEach(({ label }) => {
      expect(styleButton(label)).toHaveAttribute("aria-pressed", "false");
    });
    expect(styleButton("Off")).toHaveAttribute("aria-pressed", "true");
    expect(onApply).not.toHaveBeenCalled();
  });

  it("renders no canvas and never loads the engine while the style is off", () => {
    const { container } = renderStudio();

    expect(container.querySelector(".three-3d-stage")).toBeNull();
    expect(container.querySelector("canvas")).toBeNull();
    expect(createStage).not.toHaveBeenCalled();
    expect(screen.getByText(/3D off — the flat design is live/i)).toBeInTheDocument();
  });

  it("previews a style without applying it, and tells the user the engine is live", async () => {
    const { onApply } = renderStudio();

    fireEvent.click(styleButton("Interactive swarm"));

    expect(onApply).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: /Apply stage settings/i })).toBeEnabled();
    expect(screen.getByText(/Interactive swarm style previewed/i)).toBeInTheDocument();
    await waitFor(() => expect(createStage).toHaveBeenCalledTimes(1));
    expect(createStage.mock.calls[0][0].settings.style).toBe("swarm");
    expect(createStage.mock.calls[0][0].palette).toEqual(palette);
    expect(screen.getByText(/720 instances/i)).toBeInTheDocument();
  });

  it("drives the shelf style with the catalogue it is given", async () => {
    renderStudio();

    fireEvent.click(styleButton("Project shelf"));

    await waitFor(() => expect(createStage).toHaveBeenCalled());
    expect(createStage.mock.calls.at(-1)[0].settings.style).toBe("shelf");
    expect(createStage.mock.calls.at(-1)[0].projects).toEqual(projects);
    expect(screen.getByText(/fixed layout/i)).toBeInTheDocument();
  });

  it("snaps every slider onto its allowed step and cannot be pushed past the ratio ceiling", () => {
    // A 3x screen: the slider still reports 2x, and so does the summary line built from it.
    vi.stubGlobal("devicePixelRatio", 3);
    renderStudio();

    fireEvent.click(styleButton("Vortex"));
    fireEvent.change(screen.getByLabelText("Instances"), { target: { value: "737" } });
    fireEvent.change(screen.getByLabelText("Motion speed"), { target: { value: "133" } });
    fireEvent.change(screen.getByLabelText("Max pixel ratio"), { target: { value: "3" } });

    expect(screen.getByText("720")).toBeInTheDocument();
    expect(screen.getByText("130%")).toBeInTheDocument();
    expect(screen.getByText("2x")).toBeInTheDocument();
    expect(screen.getByText(/720 instances · 2x max · 130% speed/i)).toBeInTheDocument();

    vi.unstubAllGlobals();
  });

  it("applies the draft once the preview is right", () => {
    const { onApply } = renderStudio();

    fireEvent.click(styleButton("Constellation"));
    fireEvent.change(screen.getByLabelText("Brightness"), { target: { value: "80" } });
    fireEvent.click(screen.getByRole("button", { name: /Apply stage settings/i }));

    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_THREE_3D, style: "constellation", brightness: 80 });
    expect(screen.getByRole("button", { name: /Apply stage settings/i })).toBeDisabled();
  });

  it("discards an unsaved preview and hands the flat design back", async () => {
    const { onApply } = renderStudio();

    fireEvent.click(styleButton("Ripple field"));
    await waitFor(() => expect(createStage).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(styleButton("Off")).toHaveAttribute("aria-pressed", "true");
    expect(disposeStage).toHaveBeenCalled();
  });

  it("switches 3D off again through Reset stage to default", async () => {
    const { onApply } = renderStudio({ initialSettings: { ...DEFAULT_THREE_3D, style: "helix" } });

    await waitFor(() => expect(createStage).toHaveBeenCalled());
    fireEvent.click(screen.getByRole("button", { name: /Reset stage to default/i }));

    expect(onApply).toHaveBeenLastCalledWith(DEFAULT_THREE_3D);
    expect(screen.getByText(/3D switched off/i)).toBeInTheDocument();
  });

  it("treats the pointer field, scrim and reveal as switches", () => {
    renderStudio();

    fireEvent.click(styleButton("Interactive swarm"));
    const pointer = screen.getByLabelText("Pointer field");
    expect(pointer).toBeChecked();

    fireEvent.click(pointer);
    expect(pointer).not.toBeChecked();
    expect(screen.getByText(/Pointer field previewed/i)).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Readability scrim"));
    expect(screen.getByLabelText("Reveal on load")).toBeChecked();
  });
});
