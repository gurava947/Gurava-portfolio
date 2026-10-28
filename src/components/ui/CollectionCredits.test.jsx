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
    message: "ఆయన వల్ల ఇదంతా సాధ్యమైంది.",
    messageTranslation: "this portfolio became possible because of his support",
    messageBy: "Guravaiah K",
  },
  madeWithLabel: "Made with",
  madeWith: { name: "గురువయ్య", transliteration: "Guravaiah K", note: "The name behind every commit." },
};

describe("CollectionCredits", () => {
  it("presents the program, the thanks and the maker as three separate voices", () => {
    const { container } = render(<CollectionCredits copy={copy} />);

    expect(screen.getByText("NXTWAVE")).toBeInTheDocument();
    expect(screen.getByText("All Access · CCBP 4.0 · Full Stack Web Development")).toBeInTheDocument();
    expect(screen.getByText("All Active Full Stack Developers")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mr. Atthuluri Rahul" })).toBeInTheDocument();
    expect(screen.getByText("Rahul sir · CEO · NXTWAVE / NIAT")).toBeInTheDocument();
    expect(screen.getByText("గురువయ్య")).toBeInTheDocument();
    expect(container.querySelectorAll(".home-credit-card")).toHaveLength(3);
  });

  // The thanks band must never read as a statement the CEO made: it is an epigraph written by the
  // builder, so it carries its own label and signature instead of blockquote semantics.
  it("frames the thanks message as the builder's own note, not a quote from him", () => {
    render(<CollectionCredits copy={copy} />);

    expect(screen.queryByRole("blockquote")).not.toBeInTheDocument();
    expect(screen.getByText("A note of thanks")).toBeInTheDocument();
    expect(screen.getByText("ఆయన వల్ల ఇదంతా సాధ్యమైంది.")).toBeInTheDocument();
    expect(screen.getByText("this portfolio became possible because of his support")).toBeInTheDocument();
    expect(screen.getByText("— Guravaiah K")).toBeInTheDocument();
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
    expect(container.querySelector(".home-credit-translated")).not.toBeInTheDocument();
  });

  it("renders nothing without copy", () => {
    const { container } = render(<CollectionCredits copy={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});
