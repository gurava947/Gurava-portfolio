import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CardMotionStudio from "./CardMotionStudio";
import { DEFAULT_SHELF_MOTION } from "../config/cardMotion";

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
    <CardMotionStudio
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
  const { initialSettings = DEFAULT_SHELF_MOTION, ...rest } = overrides;
  const view = render(<Harness onApply={onApply} initialSettings={initialSettings} {...rest} />);
  const preview = () => view.container.querySelector('[data-preview="true"]');
  return { onApply, preview, ...view };
}

describe("CardMotionStudio", () => {
  it("previews a preset without changing the applied motion until Apply", () => {
    const { onApply, preview } = renderStudio();
    expect(preview()).toHaveAttribute("data-shelf-motion", "studio");

    fireEvent.click(screen.getByRole("button", { name: /^Depth/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(preview()).toHaveAttribute("data-shelf-motion", "depth");
    expect(screen.getByText(/Depth previewed for the collection shelf/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply motion/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /Apply motion/i }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_SHELF_MOTION, preset: "depth" });
    expect(screen.getByRole("button", { name: /Apply motion/i })).toBeDisabled();
  });

  it("previews the stacked glass and reflection effects without applying", () => {
    const { onApply, preview } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: /^Stacked glass/ }));
    expect(preview()).toHaveAttribute("data-shelf-motion", "stack");
    expect(screen.getByText(/Stacked glass previewed for the collection shelf/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Reflection/ }));
    expect(preview()).toHaveAttribute("data-shelf-motion", "reflect");
    expect(onApply).not.toHaveBeenCalled();
  });

  it("adjusts intensity and timing with live preview variables", () => {
    const { preview } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: /^Strong$/ }));
    expect(preview().style.getPropertyValue("--shelf-motion-shift")).toBe("24px");
    expect(preview().style.getPropertyValue("--shelf-motion-tilt")).toBe("5deg");

    const speed = screen.getByLabelText("Transition speed");
    fireEvent.change(speed, { target: { value: "600" } });
    expect(screen.getByText("600ms")).toBeInTheDocument();
    expect(preview().style.getPropertyValue("--shelf-motion-duration")).toBe("600ms");

    fireEvent.change(screen.getByLabelText("Stagger delay"), { target: { value: "100" } });
    expect(screen.getByText("100ms")).toBeInTheDocument();
    expect(preview().style.getPropertyValue("--shelf-motion-delay")).toBe("100ms");
  });

  it("cancels an unsaved preview without applying", () => {
    const { onApply, preview } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: /^Soft fade/ }));
    expect(preview()).toHaveAttribute("data-shelf-motion", "fade");

    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(preview()).toHaveAttribute("data-shelf-motion", "studio");
    expect(screen.getByRole("button", { name: /Apply motion/i })).toBeDisabled();
  });

  it("restores the shipped default motion immediately", () => {
    const { onApply, preview } = renderStudio({
      initialSettings: { preset: "glass", intensity: "strong", duration: 520, delay: 120 },
    });

    expect(screen.getByRole("button", { name: /Apply motion/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Reset to default/i }));

    expect(onApply).toHaveBeenCalledWith(DEFAULT_SHELF_MOTION);
    expect(preview()).toHaveAttribute("data-shelf-motion", "studio");
    expect(preview().style.getPropertyValue("--shelf-motion-shift")).toBe("16px");
  });
});
