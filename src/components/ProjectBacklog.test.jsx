import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectBacklog from "./ProjectBacklog";

const copy = {
  eyebrow: "Filed, not shipped",
  title: "Backlog",
  note: "Everything above this line is built and runs. Everything here is not.",
  status: "Planned · not built",
  runs: "Runs today?",
  runsAnswer: "No",
  whyLabel: "Why it is not built",
  evidenceLabel: "How to check",
};

const backlog = [
  {
    id: "backlog-mongo-catalogue",
    title: "MongoDB-backed catalogue",
    area: "Data layer",
    summary: "The catalogue is stored in SQLite and flattened to JSON at build time.",
    notBuiltBecause: "The static deploy opens no database at all.",
    evidence: "A repository-wide search for mongoose returns nothing.",
    status: "planned",
    live: false,
  },
  {
    id: "backlog-stage-default",
    title: "The 3D stage switched on by default",
    area: "Performance",
    summary: "The particle stage ships with its style set to off.",
    notBuiltBecause: "It is a 570 kB chunk and a full-viewport canvas.",
    evidence: "DEFAULT_THREE_3D_STYLE_ID is \"off\".",
    status: "planned",
    live: false,
  },
];

describe("ProjectBacklog", () => {
  it("says plainly that a planned entry is not built and does not pretend to be a card", () => {
    const { container } = render(<ProjectBacklog backlog={backlog} copy={copy} />);

    expect(screen.getByRole("heading", { name: "Backlog" })).toBeInTheDocument();
    expect(screen.getAllByText("Planned · not built")).toHaveLength(2);
    expect(screen.getByText("MongoDB-backed catalogue")).toBeInTheDocument();
    expect(screen.getByText("The static deploy opens no database at all.")).toBeInTheDocument();
    expect(screen.getByText("A repository-wide search for mongoose returns nothing.")).toBeInTheDocument();
    expect(screen.getAllByText("Runs today?")).toHaveLength(2);
    expect(screen.getAllByText("No")).toHaveLength(2);

    // Nothing here is a route: a planned entry has no component, thumbnail or detail page to open.
    expect(container.querySelectorAll("a, button")).toHaveLength(0);
    expect(container.querySelectorAll("img")).toHaveLength(0);
    expect(container.querySelectorAll("article")).toHaveLength(0);
  });

  it("names every surface the stage can modulate between", () => {
    const { container } = render(<ProjectBacklog backlog={backlog} copy={copy} />);

    expect(container.querySelector("[data-three3d-surface]").dataset.three3dSurface).toBe("page");
  });

  it("draws nothing when the catalogue has no planned work or no copy for it", () => {
    const empty = render(<ProjectBacklog backlog={[]} copy={copy} />);
    expect(empty.container.innerHTML).toBe("");

    const noCopy = render(<ProjectBacklog backlog={backlog} copy={undefined} />);
    expect(noCopy.container.innerHTML).toBe("");

    const cached = render(<ProjectBacklog backlog={undefined} copy={copy} />);
    expect(cached.container.innerHTML).toBe("");
  });
});
