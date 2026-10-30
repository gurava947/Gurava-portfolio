import { useState } from "react";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Three3DStudio from "./Three3DStudio";
import { DEFAULT_THREE_3D, resolveThree3dPalette, THREE_3D_STYLES } from "../config/three3d";

// The engine speaks WebGL, which jsdom has never seen. The panel is under test here, so the stage is
// replaced by a recorder that reports the settings the panel passed down.
const createStage = vi.fn();
const updateStage = vi.fn();
const disposeStage = vi.fn();
const surfaceCalls = [];

vi.mock("../three/stage3d", () => ({
  isThree3DSupported: () => true,
  createThree3DStage: (options) => {
    createStage(options);
    return {
      update: updateStage,
      dispose: disposeStage,
      setSurface: (surface) => surfaceCalls.push(surface),
      // The governor numbers are part of what the panel reads back, so the recorder reports them too.
      getStats: () => ({
        drawCalls: 1,
        instances: 720,
        drawn: 720,
        triangles: 8640,
        pixelRatio: 2,
        pixelRatioScale: 1,
        governorScale: 1,
        surface: "hero",
      }),
    };
  },
}));

const projects = [
  { id: "p1", title: "Subtract 596 from 193856", category: "python" },
  { id: "p2", title: "Responsive course sections", category: "responsive" },
];

const palette = { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6", mode: "dark" };

function Harness({ onApply, initialSettings = DEFAULT_THREE_3D, stagePalette = palette }) {
  const [settings, setSettings] = useState(initialSettings);
  return (
    <Three3DStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
      projects={projects}
      palette={stagePalette}
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
    // The stage is handed the guarded palette, not the raw theme: with no colour picked the guard is a
    // pass-through, so the three stops are still the theme's and only the coverage figure is new.
    expect(createStage.mock.calls[0][0].palette).toEqual(resolveThree3dPalette({ ...DEFAULT_THREE_3D, style: "swarm" }, palette));
    expect(createStage.mock.calls[0][0].palette.adjusted).toEqual([]);
    expect(screen.getByText(/Interactive swarm · 720 instances/i)).toBeInTheDocument();
    // The surface is pushed by an effect that only runs once the dynamic import has settled, so it is
    // awaited rather than read straight after createStage — under a loaded worker that lands later.
    await waitFor(() => expect(surfaceCalls.at(-1)).toBe("hero"));
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

  it("gives every surface a presence of its own on the one canvas", async () => {
    const { onApply } = renderStudio();

    fireEvent.click(styleButton("Interactive swarm"));
    await waitFor(() => expect(createStage).toHaveBeenCalled());
    // The shipped defaults, read off the panel rather than the config: a wall of cards wants a quieter
    // stage than the landing page, and this is the only place that difference is expressed.
    expect(screen.getByLabelText("Projects")).toHaveValue("70");
    expect(screen.getByLabelText("Certificates")).toHaveValue("85");

    fireEvent.change(screen.getByLabelText("Projects"), { target: { value: "45" } });

    // A dial previews: the canvas in this panel is already thinning itself while nothing is saved.
    expect(onApply).not.toHaveBeenCalled();
    await waitFor(() => expect(updateStage.mock.calls.at(-1)?.[0]?.surfaces.projects).toBe(45));
    expect(updateStage.mock.calls.at(-1)[0].surfaces.hero).toBe(100);

    fireEvent.click(screen.getByRole("button", { name: /Apply stage settings/i }));
    expect(onApply).toHaveBeenCalled();
  });

  it("reports how much of the field the stage is actually drawing", async () => {
    renderStudio();

    fireEvent.click(styleButton("Helix drift"));
    await waitFor(() => expect(screen.getByText(/of 720 instances drawn/i)).toBeInTheDocument());
    expect(screen.getByText(/720 of 720 instances drawn · 100% presence on this surface/i)).toBeInTheDocument();
  });

  it("keeps the governor switched on and lets it be handed back", async () => {
    renderStudio();

    const adaptive = screen.getByLabelText("Frame-rate governor");
    expect(adaptive).toBeChecked();

    fireEvent.click(adaptive);
    expect(adaptive).not.toBeChecked();

    fireEvent.click(styleButton("Vortex"));
    await waitFor(() => expect(createStage).toHaveBeenCalled());
    expect(createStage.mock.calls.at(-1)[0].settings.adaptive).toBe(false);
  });

  it("sends a picked stage colour to the canvas", async () => {
    const { onApply } = renderStudio();

    fireEvent.click(styleButton("Prism scatter"));
    // Wait for the engine to arrive: an update the panel sends before the stage exists is dropped, and
    // the stage is built with whatever settings it was created under.
    await waitFor(() => expect(createStage).toHaveBeenCalled());
    const start = within(screen.getByLabelText("Start colour picker").closest(".three-3d-color-row"));
    expect(start.getByRole("button", { name: /Following theme/i })).toHaveAttribute("aria-pressed", "true");

    fireEvent.change(screen.getByLabelText(/^Start colour R/), { target: { value: "240" } });

    // The row now holds a pick of its own, and the chip becomes the way back to the theme.
    expect(start.getByRole("button", { name: /^Follow theme$/i })).toHaveAttribute("aria-pressed", "false");
    expect(start.getByText("#F05CF6")).toBeInTheDocument();

    await waitFor(() => expect(updateStage.mock.calls.at(-1)?.[0]?.colors.primary).toBe("#f05cf6"));
    // "#f05cf6" is legible against the dark page, so the guard hands the stage the pick untouched.
    expect(updateStage.mock.calls.at(-1)[1].palette.primary).toBe("#f05cf6");
    expect(updateStage.mock.calls.at(-1)[1].palette.adjusted).toEqual([]);
    expect(onApply).not.toHaveBeenCalled();
  });

  it("pulls back a colour the page copy would vanish against", async () => {
    // Light mode at the default wash: a black stop darkens the strip the ramp paints over to roughly
    // 3:1 against the body copy, so the stage is handed a lighter version of the same hue instead.
    renderStudio({ stagePalette: { ...palette, mode: "light" } });

    fireEvent.click(styleButton("Interactive swarm"));
    await waitFor(() => expect(createStage).toHaveBeenCalled());
    ["R", "G", "B"].forEach((channel) => {
      fireEvent.change(screen.getByLabelText(new RegExp(`^Start colour ${channel}`)), { target: { value: "0" } });
    });

    expect(screen.getByText(/Pulled back from #000000/i)).toBeInTheDocument();
    expect(screen.getByText(/contrast ratio/i)).toBeInTheDocument();

    await waitFor(() => expect(updateStage.mock.calls.at(-1)?.[1]?.palette.adjusted).toContain("primary"));
    // What is stored is what was asked for; only what the canvas paints is corrected.
    expect(updateStage.mock.calls.at(-1)[0].colors.primary).toBe("#000000");
    expect(updateStage.mock.calls.at(-1)[1].palette.primary).not.toBe("#000000");
    // The other two stops followed the theme, so the guard never touches them.
    expect(updateStage.mock.calls.at(-1)[1].palette.secondary).toBe("#22d3ee");
  });

  it("hands a stop back to the theme", () => {
    renderStudio();

    fireEvent.click(styleButton("Aurora curtain"));
    fireEvent.change(screen.getByLabelText(/^Middle colour G/), { target: { value: "200" } });
    const middle = within(screen.getByLabelText("Middle colour picker").closest(".three-3d-color-row"));
    fireEvent.click(middle.getByRole("button", { name: /^Follow theme$/i }));

    expect(middle.getByRole("button", { name: /Following theme/i })).toHaveAttribute("aria-pressed", "true");
    expect(middle.getByText("#22D3EE")).toBeInTheDocument();
    expect(screen.queryByText(/Pulled back from/i)).toBeNull();
  });
});
