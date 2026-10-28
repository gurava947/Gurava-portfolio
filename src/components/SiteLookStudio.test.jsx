import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SiteLookStudio from "./SiteLookStudio";
import { DEFAULT_SITE_LOOK, HEADLINE_STYLES } from "../config/siteLook";

function Harness({ onApply, initialSettings }) {
  const [settings, setSettings] = useState(initialSettings);
  return (
    <SiteLookStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
    />
  );
}

function renderStudio(overrides = {}) {
  const onApply = vi.fn();
  const { initialSettings = DEFAULT_SITE_LOOK, ...rest } = overrides;
  const view = render(<Harness onApply={onApply} initialSettings={initialSettings} {...rest} />);
  const stage = () => view.container.querySelector(".look-studio-stage");
  return { onApply, stage, ...view };
}

describe("SiteLookStudio", () => {
  it("previews a style direction without applying it until Apply look", () => {
    const { onApply, stage } = renderStudio();

    expect(stage()).toHaveClass("is-practice");

    fireEvent.click(screen.getByRole("button", { name: "Dark cinematic" }));

    expect(onApply).not.toHaveBeenCalled();
    expect(stage()).toHaveClass("is-cinematic");
    expect(screen.getByText(/Dark cinematic previewed\. Choose Apply look/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply look/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /Apply look/i }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_SITE_LOOK, preset: "cinematic" });
    expect(screen.getByRole("button", { name: /Apply look/i })).toBeDisabled();
  });

  it("drives the headline animation and background pattern on the preview stage", () => {
    const { onApply, stage } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: "Wave headline motion" }));
    expect(stage()).toHaveAttribute("data-hero-text", "wave");

    fireEvent.click(screen.getByRole("button", { name: "Beams background" }));
    expect(stage()).toHaveAttribute("data-bg-pattern", "beams");
    expect(stage().style.getPropertyValue("--look-pattern-opacity")).toBe("1");

    fireEvent.click(screen.getByRole("button", { name: "Clean background" }));
    expect(stage()).toHaveAttribute("data-bg-pattern", "none");
    expect(stage().style.getPropertyValue("--look-pattern-opacity")).toBe("0");

    expect(onApply).not.toHaveBeenCalled();
  });

  it("switches the brand mark depth with the 3D toggle", () => {
    const { stage } = renderStudio();

    expect(stage()).toHaveAttribute("data-logo-3d", "true");
    expect(stage().querySelector(".look-studio-mark")).toHaveClass("is-3d");

    fireEvent.click(screen.getByRole("button", { name: "Off" }));

    expect(stage()).toHaveAttribute("data-logo-3d", "false");
    expect(stage().style.getPropertyValue("--look-logo-depth")).toBe("0");
    expect(stage().querySelector(".look-studio-mark")).not.toHaveClass("is-3d");
  });

  it("previews a section heading style and only ships it on Apply look", () => {
    const { onApply, stage, container } = renderStudio();

    expect(stage()).toHaveAttribute("data-look-heading", "underline");
    // Every tile paints itself with the real text-treatments.css rules, so the studio cannot drift
    // from the page it is previewing.
    expect(container.querySelectorAll(".look-demo-heading")).toHaveLength(HEADLINE_STYLES.length);

    fireEvent.click(screen.getByRole("button", { name: "Marker heading style" }));

    expect(stage()).toHaveAttribute("data-look-heading", "marker");
    expect(onApply).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Apply look/i }));
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_SITE_LOOK, heading: "marker" });
  });

  it("switches the text reaction layer off on its own", () => {
    const { stage } = renderStudio();

    expect(stage()).toHaveAttribute("data-look-text-fx", "true");

    fireEvent.click(screen.getByRole("button", { name: "Text reactions off" }));

    expect(stage()).toHaveAttribute("data-look-text-fx", "false");
    expect(stage()).toHaveAttribute("data-look-heading", "underline");
  });

  it("previews the featured strip layout and only the rail variant loops the mini shelf", () => {
    const { onApply, container } = renderStudio();
    const strip = () => container.querySelector(".look-studio-strip");

    expect(strip()).toHaveClass("is-grid");
    expect(strip().querySelectorAll(".look-studio-strip-card")).toHaveLength(4);

    fireEvent.click(screen.getByRole("button", { name: "Poster rail" }));

    expect(strip()).toHaveClass("is-rail");
    expect(strip().querySelectorAll(".look-studio-strip-card")).toHaveLength(16);
    expect(screen.getByText(/Poster rail featured strip previewed/i)).toBeInTheDocument();
    expect(onApply).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: /Apply look/i }));
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_SITE_LOOK, featured: "rail" });
  });

  it("discards an unsaved preview through Cancel", () => {
    const { onApply, stage } = renderStudio();

    fireEvent.click(screen.getByRole("button", { name: "Mask reveal headline motion" }));
    expect(stage()).toHaveAttribute("data-hero-text", "mask");

    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/ }));

    expect(onApply).not.toHaveBeenCalled();
    expect(stage()).toHaveAttribute("data-hero-text", "rise");
    expect(screen.getByRole("button", { name: /Apply look/i })).toBeDisabled();
  });

  it("restores the shipped look immediately from a saved non-default setting", () => {
    const { onApply, stage } = renderStudio({
      initialSettings: { preset: "cinematic", heroText: "shimmer", background: "mesh", logo3d: false, featured: "poster" },
    });

    expect(screen.getByRole("button", { name: /Apply look/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /Reset to default/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /Reset to default/i }));

    expect(onApply).toHaveBeenLastCalledWith(DEFAULT_SITE_LOOK);
    expect(stage()).toHaveClass("is-practice");
    expect(stage()).toHaveAttribute("data-hero-text", "rise");
  });
});
