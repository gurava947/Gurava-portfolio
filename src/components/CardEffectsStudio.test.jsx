import { useState } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CardEffectsStudio from "./CardEffectsStudio";
import { DEFAULT_CARD_EFFECTS, normalizeCardEffects } from "../config/cardEffects";
import { DEFAULT_CARD_UI_SETTINGS } from "../hooks/useTheme";

const project = {
  id: "sample-project",
  title: "Sample project",
  description: "A supplied project used to preview card effects.",
  collection: "responsive",
  collectionLabel: "Responsive",
  category: "Practice",
  language: "HTML & CSS",
  practiceLabel: "Exercise",
  previewType: "react",
  technologies: ["HTML", "CSS"],
  route: "/projects/sample-project",
};

const certificate = {
  slug: "sample-certificate",
  courseTitle: "Sample certificate",
  certificateId: "SAMPLE-001",
  eyebrow: "Certificate",
  route: "/certificates/sample-certificate",
  assets: [],
  performance: [
    { key: "grade", label: "Grade", value: "A" },
    { key: "percentage", label: "Percentage", value: "100%" },
    { key: "score", label: "Score", value: "280/280" },
  ],
  topics: ["One", "Two"],
};

function Harness({ onApply, initialSettings = DEFAULT_CARD_EFFECTS }) {
  const [settings, setSettings] = useState(normalizeCardEffects(initialSettings));
  return (
    <CardEffectsStudio
      settings={settings}
      onApply={(next) => {
        onApply?.(next);
        setSettings(next);
      }}
      cardUI={DEFAULT_CARD_UI_SETTINGS}
      previewProject={project}
      previewProjects={[project]}
      previewCertificates={[certificate]}
    />
  );
}

function renderStudio() {
  const onApply = vi.fn();
  const view = render(<Harness onApply={onApply} />);
  return { onApply, ...view };
}

function projectCard(container) {
  return container.querySelector(".fx-studio-stage .lab-project-card");
}

function certificateCard(container) {
  return container.querySelector(".fx-studio-stage .lab-certificate-card");
}

describe("CardEffectsStudio", () => {
  it("previews project and certificate effects without applying them", () => {
    const { container, onApply } = renderStudio();
    expect(projectCard(container)).toHaveAttribute("data-card-fx", "none");
    expect(certificateCard(container)).toHaveAttribute("data-card-fx", "none");

    fireEvent.click(screen.getByRole("button", { name: /Pointer tilt/i }));

    expect(onApply).not.toHaveBeenCalled();
    expect(projectCard(container)).toHaveAttribute("data-card-fx", "tilt");
    expect(certificateCard(container)).toHaveAttribute("data-card-fx", "none");
    expect(screen.getByRole("button", { name: /Apply effects/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /Certificate cards/i }));
    fireEvent.click(screen.getByRole("button", { name: /Foil sheen/i }));

    expect(onApply).not.toHaveBeenCalled();
    expect(certificateCard(container)).toHaveAttribute("data-card-fx", "foil");
    expect(projectCard(container)).toHaveAttribute("data-card-fx", "tilt");
  });

  it("applies, resets and applies the defaults again", () => {
    const { onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Pointer tilt/i }));
    fireEvent.click(screen.getByRole("button", { name: /Apply effects/i }));

    expect(onApply).toHaveBeenCalledTimes(1);
    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_CARD_EFFECTS, projects: "tilt" });
    expect(screen.getByRole("button", { name: /Apply effects/i })).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /Reset to default/i }));
    expect(screen.getByRole("button", { name: /Apply effects/i })).toBeEnabled();
    fireEvent.click(screen.getByRole("button", { name: /Apply effects/i }));
    expect(onApply).toHaveBeenLastCalledWith(DEFAULT_CARD_EFFECTS);
  });

  it("cancels an unsaved preview without applying", () => {
    const { container, onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Curtain reveal/i }));
    expect(screen.getByText(/Quick look/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Cancel$/i }));

    expect(onApply).not.toHaveBeenCalled();
    expect(projectCard(container)).toHaveAttribute("data-card-fx", "none");
    expect(screen.queryByText(/Quick look/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply effects/i })).toBeDisabled();
  });

  it("keeps the chosen treatment while effects are switched off", () => {
    const { container } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Depth layers/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Off$/i }));

    expect(projectCard(container)).toHaveAttribute("data-card-fx", "none");
    expect(screen.getByText(/Effects are off for the live cards/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apply effects/i })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: /^On$/i }));
    expect(projectCard(container)).toHaveAttribute("data-card-fx", "parallax");
  });

  it("updates the intensity variables on the preview cards", () => {
    const { container } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /^Strong$/i }));

    expect(projectCard(container).style.getPropertyValue("--fx-tilt")).toBe("10deg");
    expect(projectCard(container).style.getPropertyValue("--fx-glow")).toBe("1");
    expect(projectCard(container).style.getPropertyValue("--fx-lift")).toBe("8px");
  });

  it("opens a full draft preview and applies from it", () => {
    const { onApply } = renderStudio();
    fireEvent.click(screen.getByRole("button", { name: /Pointer tilt/i }));
    fireEvent.click(screen.getByRole("button", { name: /^Preview$/i }));

    const dialog = screen.getByRole("dialog", { name: /3D card effects/i });
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: /Close effect preview/i })).toHaveFocus();
    expect(dialog.querySelector(".fx-preview-stage .lab-project-card")).toHaveAttribute("data-card-fx", "tilt");
    expect(dialog.querySelector(".fx-preview-stage .lab-certificate-card")).toHaveAttribute("data-card-fx", "none");
    expect(onApply).not.toHaveBeenCalled();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog", { name: /3D card effects/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /^Preview$/i }));
    const reopened = screen.getByRole("dialog", { name: /3D card effects/i });
    fireEvent.click(within(reopened).getByRole("button", { name: /Apply effects/i }));

    expect(onApply).toHaveBeenCalledWith({ ...DEFAULT_CARD_EFFECTS, projects: "tilt" });
    expect(screen.queryByRole("dialog", { name: /3D card effects/i })).not.toBeInTheDocument();
  });
});
