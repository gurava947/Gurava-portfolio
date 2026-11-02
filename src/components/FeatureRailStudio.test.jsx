import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FeatureRailStudio from "./FeatureRailStudio";
import { DEFAULT_FEATURE_RAIL, normalizeFeatureRail } from "../config/featureRail";

const projects = [
  { id: "a", title: "Portfolio Practice Sections", route: "/projects/a", collection: "responsive", thumbnail: "/a.webp" },
  { id: "b", title: "Podcast Page", route: "/projects/b", collection: "static", thumbnail: "/b.webp" },
  { id: "c", title: "Course Sections", route: "/projects/c", collection: "responsive", cardCode: "console.log(1)" },
];

/* The panel has no draft of its own: it writes straight through, and the parent normalizes exactly
   the way the theme hook does, so a test that proves "one control, one key" is testing the real
   merge rather than a copy of it. */
function Harness({ initialSettings = DEFAULT_FEATURE_RAIL, onChange }) {
  const [settings, setSettings] = useState(initialSettings);
  return (
    <FeatureRailStudio
      settings={settings}
      onChange={(patch) => {
        onChange?.(patch);
        setSettings((current) => normalizeFeatureRail({ ...current, ...patch }));
      }}
      projects={projects}
    />
  );
}

function renderStudio(overrides = {}) {
  const onChange = vi.fn();
  const view = render(<Harness onChange={onChange} {...overrides} />);
  const rail = () => view.container.querySelector(".rail-studio-preview .feature-rail");
  return { onChange, rail, ...view };
}

describe("FeatureRailStudio", () => {
  it("applies as you move a control instead of hiding it behind an Apply button", () => {
    const { onChange } = renderStudio();

    expect(screen.queryByRole("button", { name: /Apply/i })).toBeNull();

    fireEvent.change(screen.getByLabelText("Card width"), { target: { value: "380" } });
    expect(onChange).toHaveBeenLastCalledWith({ cardWidth: 380 });
  });

  it("writes only the key a control owns", () => {
    const { onChange } = renderStudio({ initialSettings: { ...DEFAULT_FEATURE_RAIL, cardWidth: 400, gap: 30 } });

    fireEvent.change(screen.getByLabelText("Card spacing"), { target: { value: "26" } });

    expect(onChange).toHaveBeenCalledWith({ gap: 26 });
    expect(screen.getByLabelText("Card spacing")).toHaveValue("26");
    expect(screen.getByLabelText("Card width")).toHaveValue("400");
  });

  it("says what a number means instead of showing a bare zero", () => {
    renderStudio();

    expect(screen.getByLabelText("Card height").closest(".card-ui-range").querySelector("output")).toHaveTextContent("Auto");

    fireEvent.change(screen.getByLabelText("Card height"), { target: { value: "420" } });
    expect(screen.getByLabelText("Card height").closest(".card-ui-range").querySelector("output")).toHaveTextContent("420px");
  });

  it("keeps the numbers when the layout changes", () => {
    const { onChange } = renderStudio({ initialSettings: { ...DEFAULT_FEATURE_RAIL, cardWidth: 460, padding: 20 } });

    fireEvent.click(screen.getByRole("button", { name: /^Grid/ }));

    expect(onChange).toHaveBeenCalledWith({ layout: "grid" });
    expect(screen.getByLabelText("Card width")).toHaveValue("460");
    expect(screen.getByLabelText("Container padding")).toHaveValue("20");
  });

  it("follows the layout in the sample rail it draws", () => {
    const { rail } = renderStudio();

    expect(rail()).toHaveClass("is-carousel");
    fireEvent.click(screen.getByRole("button", { name: /^List/ }));
    expect(rail()).toHaveClass("is-list");
  });

  it("gives up the scroll switches as soon as the cards wrap", () => {
    renderStudio({ initialSettings: { ...DEFAULT_FEATURE_RAIL, wrap: true } });

    expect(screen.getByLabelText("Card wrapping")).toBeChecked();
    ["Navigation arrows", "Scroll indicators", "Drag to scroll"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeDisabled();
    });
  });

  it("puts the switches back in reach when the row scrolls again", () => {
    renderStudio({ initialSettings: { ...DEFAULT_FEATURE_RAIL, wrap: true } });

    fireEvent.click(screen.getByRole("button", { name: /^Carousel/ }));
    fireEvent.click(screen.getByLabelText("Card wrapping"));

    ["Navigation arrows", "Scroll indicators", "Drag to scroll"].forEach((label) => {
      expect(screen.getByLabelText(label)).toBeEnabled();
    });
  });

  it("only offers the reset when there is something to reset", () => {
    const { onChange } = renderStudio();
    const reset = screen.getByRole("button", { name: /Reset to default/i });

    expect(reset).toBeDisabled();

    fireEvent.click(screen.getByRole("button", { name: /^List/ }));
    expect(reset).toBeEnabled();

    fireEvent.click(reset);
    expect(onChange).toHaveBeenLastCalledWith(DEFAULT_FEATURE_RAIL);
    expect(screen.getByLabelText("Card width")).toHaveValue(String(DEFAULT_FEATURE_RAIL.cardWidth));
  });
});
