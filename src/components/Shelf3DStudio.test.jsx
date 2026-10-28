import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Shelf3DStudio from "./Shelf3DStudio";
import { DEFAULT_SHELF_3D } from "../config/shelf3d";

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

function Harness({ onApply, initialSettings, ...rest }) {
  const [settings, setSettings] = useState(initialSettings);
  return (
    <Shelf3DStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
      collections={collections}
      projects={projects}
      {...rest}
    />
  );
}

function renderStudio(overrides = {}) {
  const onApply = vi.fn();
  const { initialSettings = DEFAULT_SHELF_3D, ...rest } = overrides;
  const view = render(<Harness onApply={onApply} initialSettings={initialSettings} {...rest} />);
  const preview = () => view.container.querySelector('[data-preview="true"]');
  return { onApply, preview, ...view };
}

describe("Shelf3DStudio", () => {
  it("leaves the preview shelf untouched at the shipped default", () => {
    const { preview } = renderStudio();
    const root = preview();

    expect(root.hasAttribute("data-shelf-3d-grid")).toBe(false);
    expect(root.hasAttribute("data-shelf-3d-panes")).toBe(false);
    expect(root.getAttribute("style")).not.toContain("--shelf-3d-");
    expect(screen.getByRole("button", { name: /Apply 3D settings/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Reset to default/i })).toBeDisabled();
  });

  it("previews a layout preset as a grid without applying it", () => {
    const { onApply, preview } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: /^Pair/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(preview()).toHaveAttribute("data-shelf-3d-grid", "true");
    expect(preview().style.getPropertyValue("--shelf-3d-columns")).toBe("2");
    expect(preview().style.getPropertyValue("--shelf-3d-card-width")).toBe("560px");
    expect(screen.getByText(/Pair layout previewed/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Apply 3D settings/i }));

    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_SHELF_3D, columns: 2, cardWidth: 560, cardHeight: 468, gap: 24 });
    expect(screen.getByRole("button", { name: /Apply 3D settings/i })).toBeDisabled();
  });

  it("sizes a card independently through the width and height sliders", () => {
    const { preview } = renderStudio();

    fireEvent.change(screen.getByLabelText("Card width"), { target: { value: "640" } });
    fireEvent.change(screen.getByLabelText("Card height"), { target: { value: "520" } });

    expect(preview().style.getPropertyValue("--shelf-3d-card-width")).toBe("640px");
    expect(preview().style.getPropertyValue("--shelf-3d-card-height")).toBe("520px");
    expect(screen.getByText("640px")).toBeInTheDocument();
    expect(screen.getByText("520px")).toBeInTheDocument();
  });

  it("treats density as the spacing shortcut and the model as the 3D numbers", () => {
    const { preview } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: /^Airy$/ }));
    expect(preview().style.getPropertyValue("--shelf-3d-gap")).toBe("34px");

    fireEvent.click(screen.getByRole("button", { name: /^Single frame/ }));
    expect(preview()).toHaveAttribute("data-shelf-3d-panes", "off");
    expect(preview().style.getPropertyValue("--shelf-3d-depth")).toBe("0px");
    expect(screen.getByRole("button", { name: /^Compact$/ })).not.toHaveAttribute("aria-pressed", "true");
  });

  it("switches the display parts off and back on", () => {
    const { preview } = renderStudio();

    fireEvent.click(screen.getByLabelText("Floor reflection"));
    fireEvent.click(screen.getByLabelText("Side stack"));

    expect(preview()).toHaveAttribute("data-shelf-3d-reflection", "off");
    expect(preview()).toHaveAttribute("data-shelf-3d-stack", "off");

    fireEvent.click(screen.getByLabelText("Floor reflection"));
    expect(preview().hasAttribute("data-shelf-3d-reflection")).toBe(false);
  });

  it("cancels an unsaved preview and restores the default immediately", () => {
    const { onApply, preview } = renderStudio({ initialSettings: { ...DEFAULT_SHELF_3D, columns: 3, rows: 2 } });

    fireEvent.change(screen.getByLabelText("Card spacing"), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(preview().style.getPropertyValue("--shelf-3d-gap")).toBe("");
    expect(preview()).toHaveAttribute("data-shelf-3d-grid", "true");

    fireEvent.click(screen.getByRole("button", { name: /Reset to default/i }));

    expect(onApply).toHaveBeenLastCalledWith(DEFAULT_SHELF_3D);
    expect(preview().hasAttribute("data-shelf-3d-grid")).toBe(false);
  });
});
