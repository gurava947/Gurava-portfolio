import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CollectionCredits from "./CollectionCredits";

// The real credit copy from catalog/source/site.json, trimmed to what these tests assert on.
const copy = {
  highlightLabel: "Program",
  highlight: {
    name: "NXTWAVE",
    label: "All Access",
    program: "CCBP 4.0 · Full Stack Web Development",
    community: "All Active Full Stack Developers",
    note: "The program that supplied every build on this page.",
  },
  thanksLabel: "Special thanks",
  thanks: {
    name: "Mr. Atthuluri Rahul",
    honorific: "Rahul sir",
    role: "CEO · NXTWAVE / NIAT",
    messageLabel: "A note of thanks",
    message: "Rahul sir, thank you for the trust, the opportunity and the standard you set.",
    messageBy: "Guravaiah K",
  },
  madeWith: { name: "Guravaiah K", note: "The name behind every commit." },
};

describe("CollectionCredits", () => {
  it("presents the program, the thanks and the maker as three separate voices", () => {
    const { container } = render(<CollectionCredits copy={copy} />);

    expect(screen.getByText("NXTWAVE")).toBeInTheDocument();
    expect(screen.getByText("All Access · CCBP 4.0 · Full Stack Web Development")).toBeInTheDocument();
    expect(screen.getByText("All Active Full Stack Developers")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mr. Atthuluri Rahul" })).toBeInTheDocument();
    expect(screen.getByText("Rahul sir · CEO · NXTWAVE / NIAT")).toBeInTheDocument();
    expect(screen.getByText("Guravaiah K", { selector: ".home-credit-maker" })).toBeInTheDocument();
    expect(container.querySelectorAll(".home-credit-card")).toHaveLength(3);
  });

  // The thanks band must never read as a statement the CEO made: it is a note written by the
  // builder and addressed to him, so it carries its own label and signature instead of
  // blockquote semantics.
  it("frames the thanks message as the builder's own note, not a quote from him", () => {
    const { container } = render(<CollectionCredits copy={copy} />);

    expect(screen.queryByRole("blockquote")).not.toBeInTheDocument();
    expect(screen.getByText("A note of thanks")).toBeInTheDocument();
    expect(screen.getByText(copy.thanks.message)).toBeInTheDocument();
    expect(screen.getByText("— Guravaiah K")).toBeInTheDocument();
    expect(container.textContent).not.toMatch(/[\u0C00-\u0C7F]/);
  });

  it("credits the maker by name alone", () => {
    const { container } = render(<CollectionCredits copy={copy} />);
    const maker = container.querySelector(".is-maker");

    expect(maker).toHaveTextContent("Guravaiah K");
    expect(maker.querySelector(".home-credit-label")).not.toBeInTheDocument();
    expect(screen.queryByText("Made with")).not.toBeInTheDocument();
  });

  it("omits optional lines the catalog does not supply", () => {
    const { container } = render(
      <CollectionCredits
        copy={{
          ...copy,
          highlight: { name: "NXTWAVE" },
          thanks: { name: "Mr. Atthuluri Rahul", message: "thank you" },
        }}
      />,
    );

    expect(container.querySelector(".home-credit-community")).not.toBeInTheDocument();
    expect(screen.getByText("thank you")).toBeInTheDocument();
    // The band keeps its label and the maker's own name as the author, rather than inventing one.
    expect(screen.getByText("A note of thanks")).toBeInTheDocument();
    expect(screen.getByText("— Guravaiah K")).toBeInTheDocument();
  });

  it("renders nothing without copy", () => {
    const { container } = render(<CollectionCredits copy={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
