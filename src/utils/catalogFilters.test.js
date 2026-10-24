import { describe, expect, it } from "vitest";
import { filterProjects, pageNumbers, paginateProjects, sortProjects } from "./catalogFilters";

const projects = [
  {
    id: "bootstrap-cards",
    title: "Bootstrap Cards",
    description: "Reusable card layouts",
    collection: "responsive",
    collectionLabel: "Responsive",
    category: "UI Components",
    practiceLabel: "Practice 04",
    technologies: ["Bootstrap", "HTML"],
    sortOrder: 30,
  },
  {
    id: "todo-list",
    title: "Todo List",
    description: "Track daily tasks",
    collection: "static",
    collectionLabel: "Static",
    category: "JavaScript",
    practiceLabel: "Practice 02",
    technologies: ["JavaScript", "HTML"],
    sortOrder: 10,
  },
  {
    id: "python-playground",
    title: "Python Playground",
    description: "Run Python in the browser",
    collection: "python",
    collectionLabel: "Python",
    category: "Python",
    practiceLabel: "Practice Lab",
    technologies: ["Python", "Pyodide"],
    sortOrder: 20,
  },
];

describe("filterProjects", () => {
  it("returns every project when no filters are set", () => {
    expect(filterProjects(projects, {})).toHaveLength(3);
  });

  it("filters by collection, category and technology", () => {
    expect(filterProjects(projects, { collection: "static" }).map((project) => project.id)).toEqual(["todo-list"]);
    expect(filterProjects(projects, { category: "UI Components" }).map((project) => project.id)).toEqual(["bootstrap-cards"]);
    expect(filterProjects(projects, { technology: "HTML" })).toHaveLength(2);
  });

  it("matches search text across title, description, category and technologies", () => {
    expect(filterProjects(projects, { query: "todo" }).map((project) => project.id)).toEqual(["todo-list"]);
    expect(filterProjects(projects, { query: "BROWSER" }).map((project) => project.id)).toEqual(["python-playground"]);
    expect(filterProjects(projects, { query: "javascript" }).map((project) => project.id)).toEqual(["todo-list"]);
    expect(filterProjects(projects, { query: "  ui components  " }).map((project) => project.id)).toEqual(["bootstrap-cards"]);
  });

  it("combines search with other filters", () => {
    expect(filterProjects(projects, { query: "html", collection: "responsive" }).map((project) => project.id)).toEqual([
      "bootstrap-cards",
    ]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterProjects(projects, { query: "not-a-project" })).toEqual([]);
  });
});

describe("sortProjects", () => {
  it("sorts by curated order by default without mutating the input", () => {
    const sorted = sortProjects(projects);
    expect(sorted.map((project) => project.id)).toEqual(["todo-list", "python-playground", "bootstrap-cards"]);
    expect(projects.map((project) => project.id)).toEqual(["bootstrap-cards", "todo-list", "python-playground"]);
  });

  it("sorts by title ascending and descending", () => {
    expect(sortProjects(projects, "titleAsc").map((project) => project.title)).toEqual([
      "Bootstrap Cards",
      "Python Playground",
      "Todo List",
    ]);
    expect(sortProjects(projects, "titleDesc").map((project) => project.title)).toEqual([
      "Todo List",
      "Python Playground",
      "Bootstrap Cards",
    ]);
  });
});

describe("paginateProjects", () => {
  const many = Array.from({ length: 55 }, (_, index) => ({ id: `project-${index + 1}` }));

  it("returns the first page with totals and range", () => {
    const result = paginateProjects(many, 1, 24);
    expect(result.items).toHaveLength(24);
    expect(result.page).toBe(1);
    expect(result.pages).toBe(3);
    expect(result.total).toBe(55);
    expect(result.start).toBe(1);
    expect(result.end).toBe(24);
  });

  it("clamps pages outside the available range", () => {
    expect(paginateProjects(many, 99, 24).page).toBe(3);
    expect(paginateProjects(many, 0, 24).page).toBe(1);
    expect(paginateProjects(many, -5, 24).page).toBe(1);
  });

  it("handles the final partial page", () => {
    const result = paginateProjects(many, 3, 24);
    expect(result.items).toHaveLength(7);
    expect(result.start).toBe(49);
    expect(result.end).toBe(55);
  });

  it("handles an empty list safely", () => {
    const result = paginateProjects([], 2, 24);
    expect(result.items).toEqual([]);
    expect(result.page).toBe(1);
    expect(result.pages).toBe(1);
    expect(result.start).toBe(0);
    expect(result.end).toBe(0);
  });
});

describe("pageNumbers", () => {
  it("lists every page when the count fits the span", () => {
    expect(pageNumbers(2, 4)).toEqual([1, 2, 3, 4]);
  });

  it("centers the window around the current page", () => {
    expect(pageNumbers(6, 10)).toEqual([4, 5, 6, 7, 8]);
  });

  it("clamps the window at both edges", () => {
    expect(pageNumbers(1, 10)).toEqual([1, 2, 3, 4, 5]);
    expect(pageNumbers(10, 10)).toEqual([6, 7, 8, 9, 10]);
  });
});
