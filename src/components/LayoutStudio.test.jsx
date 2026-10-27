import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LayoutStudio from "./LayoutStudio";
import { DEFAULT_LAYOUT_SETTINGS, normalizeLayoutSettings } from "../config/layoutPatterns";

const projects = [
  {
    id: "sample-one",
    title: "Sample build",
    description: "A supplied sample project for layout previews.",
    collection: "python",
    collectionLabel: "Python",
    category: "Practice",
    language: "Python",
    practiceLabel: "Exercise",
    previewType: "python",
    technologies: ["Python"],
  },
  {
    id: "sample-two",
    title: "Second sample",
    description: "Another supplied sample project.",
    collection: "static",
    collectionLabel: "Static",
    category: "Practice",
    language: "HTML",
    practiceLabel: "Exercise",
    previewType: "react",
    technologies: ["HTML"],
  },
];

function Harness({ onApply, initialSettings = DEFAULT_LAYOUT_SETTINGS, cardUI = {} }) {
  const [settings, setSettings] = useState(normalizeLayoutSettings(initialSettings));
  return (
    <LayoutStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
      previewProject={projects[0]}
      previewProjects={projects}
      cardUI={cardUI}
    />
  );
}

function renderStudio(overrides = {}) {
  const onApply = vi.fn();
  const { initialSettings, ...rest } = overrides;
  const view = render(
    <Harness onApply={onApply} initialSettings={initialSettings || DEFAULT_LAYOUT_SETTINGS} {...rest} />,
  );
  return { onApply, ...view };
}

describe("LayoutStudio", () => {
  it("previews a pattern without applying it", () => {
    const { container, onApply } = renderStudio();
    expect(container.querySelector('.layout-preview[data-layout-pattern="default"]')).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Two column/i }));

    expect(onApply).not.toHaveBeenCalled();
    expect(container.querySelector('.layout-preview[data-layout-pattern="two-column"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply layout/i })).toBeEnabled();
  });

  it("applies only after Apply and resets to defaults", () => {
    const { onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Two column/i }));
    fireEvent.click(screen.getByRole("button", { name: /Apply layout/i }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_LAYOUT_SETTINGS, projectCards: "two-column" });
    expect(screen.getByRole("button", { name: /Apply layout/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Reset to current default/i }));
    expect(screen.getByRole("button", { name: /Apply layout/i })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: /Apply layout/i }));
    expect(onApply).toHaveBeenLastCalledWith(DEFAULT_LAYOUT_SETTINGS);
  });

  it("cancels an unsaved preview without applying", () => {
    const { container, onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Two column/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/i }));

    expect(onApply).not.toHaveBeenCalled();
    expect(container.querySelector('.layout-preview[data-layout-pattern="default"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply layout/i })).toBeDisabled();
  });

  it("applies a pattern across every suitable area in whole-site scope", () => {
    const { onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Whole site/i }));
    fireEvent.click(screen.getByRole("button", { name: /Two column/i }));
    fireEvent.click(screen.getByRole("button", { name: /Apply layout/i }));

    expect(onApply).toHaveBeenCalledWith({
      projectCards: "two-column",
      certificateCards: "two-column",
      projectPages: "two-column",
      internalPages: "two-column",
    });
  });

  it("shows only patterns that suit the selected area", () => {
    renderStudio();
    expect(screen.getByRole("button", { name: /Masonry/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /F-pattern/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Full-screen/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Certificate cards/i }));
    expect(screen.getByRole("button", { name: /Masonry/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Full-screen/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Project pages/i }));
    expect(screen.getByRole("button", { name: /Full-screen/i })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Masonry/i })).not.toBeInTheDocument();
  });

  it("explains that the 3D shelf card style skips card layout patterns", () => {
    renderStudio({ cardUI: { cardLayout: "depth" } });
    expect(screen.getByRole("note")).toHaveTextContent(/3D shelf card style keeps its side-scroll track/i);

    fireEvent.click(screen.getByRole("button", { name: /Certificate cards/i }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
