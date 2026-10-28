import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PosterRail from "./PosterRail";

const projects = [
  { id: "a", title: "Sum of 2495 and 789358", route: "/projects/a", collection: "python", collectionLabel: "Python", cardCode: "print(2495 + 789358)", cardOutput: "791853" },
  { id: "b", title: "Portfolio Practice Sections", route: "/projects/b", collection: "responsive", collectionLabel: "Responsive Web", image: "/assets/thumbs/b.webp" },
];

// The rail listens for the attribute change through a MutationObserver, which delivers its
// callback as a microtask — so the test has to let the queue drain before asserting.
async function setAxis(value) {
  await act(async () => {
    if (value) document.documentElement.setAttribute("data-featured-axis", value);
    else document.documentElement.removeAttribute("data-featured-axis");
  });
}

afterEach(() => {
  document.documentElement.removeAttribute("data-featured-axis");
});

describe("PosterRail", () => {
  it("shuffles vertically by default and keeps each card's own content", () => {
    const { container } = render(<PosterRail projects={projects} />);
    const rail = container.querySelector(".poster-rail");

    expect(rail).toHaveAttribute("data-axis", "vertical");
    expect(container.querySelectorAll(".poster-card")).toHaveLength(2);
    // A build with no screenshot shows its snippet and printed output; one with a screenshot
    // still shows the screenshot. The axis change must not cost either of them.
    expect(rail.querySelector('.poster-card[href="/projects/a"] .code-plate')).toBeInTheDocument();
    expect(rail.querySelector('.poster-card[href="/projects/b"] img')).toBeInTheDocument();
    expect(rail.querySelector(".is-prev")).toHaveAttribute("aria-label", "Scroll builds up");
  });

  it("follows the direction picked in Card Studio without a remount", async () => {
    const { container } = render(<PosterRail projects={projects} />);
    const rail = () => container.querySelector(".poster-rail");

    expect(rail()).toHaveAttribute("data-axis", "vertical");

    await setAxis("horizontal");

    expect(rail()).toHaveAttribute("data-axis", "horizontal");
    expect(rail().querySelector(".is-next")).toHaveAttribute("aria-label", "Scroll builds right");

    await setAxis("vertical");

    expect(rail()).toHaveAttribute("data-axis", "vertical");
    expect(rail().querySelector(".is-prev")).toHaveAttribute("aria-label", "Scroll builds up");
  });
});
