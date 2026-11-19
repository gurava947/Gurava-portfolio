import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GlassFolderCard from "./GlassFolderCard";

const collection = {
  id: "python",
  label: "Python",
  count: 389,
  description: "Python practice builds.",
};

describe("GlassFolderCard", () => {
  it("uses the applied shelf motion preset and timing", () => {
    render(
      <GlassFolderCard
        collection={collection}
        motion={{ preset: "depth", intensity: "strong", duration: 460, delay: 80 }}
      />,
    );

    const card = screen.getByRole("link", { name: /Python/ });
    expect(card).toHaveAttribute("data-shelf-motion", "depth");
    expect(card.style.getPropertyValue("--shelf-motion-duration")).toBe("460ms");
    expect(card.style.getPropertyValue("--shelf-motion-shift")).toBe("24px");
  });
});
