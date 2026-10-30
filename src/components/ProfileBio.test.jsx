import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProfileBio from "./ProfileBio";

const bio = {
  eyebrow: "The short version",
  lead: "{name} writes the code twice: once to make it work, and once after reading the error properly.",
  debugging: {
    label: "How the debugging goes",
    lines: [
      "Reproduce it first.",
      "Read the line above the throw.",
      "Bisect the change, not the file.",
    ],
  },
  skills: {
    label: "What the catalog proves",
    note: "No badges.",
    items: [
      { name: "Python", detail: "{python} briefs — running in the browser." },
      { name: "HTML & CSS", detail: "{static} static builds." },
      { name: "Responsive layout", detail: "{responsive} sections measured." },
    ],
  },
};

const figures = { name: "Guravva", python: 129, static: 41 };

function renderBio(props = {}) {
  return render(<ProfileBio bio={bio} figures={figures} {...props} />);
}

function litLine(container) {
  return Array.from(container.querySelectorAll(".profile-bio-lines li")).findIndex((line) => line.classList.contains("is-active"));
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("ProfileBio", () => {
  it("renders nothing when there is no bio to show", () => {
    const { container } = render(<ProfileBio bio={null} figures={figures} />);

    expect(container.innerHTML).toBe("");
  });

  it("opens with the lead, carrying the name the visitor saved", () => {
    renderBio();

    expect(screen.getByText("The short version")).toBeInTheDocument();
    expect(screen.getByText(/^Guravva writes the code twice/)).toBeInTheDocument();
  });

  it("quotes the counts the catalogue already renders", () => {
    renderBio();

    expect(screen.getByText("129 briefs — running in the browser.")).toBeInTheDocument();
    expect(screen.getByText("41 static builds.")).toBeInTheDocument();
    expect(screen.getByText("sections measured.")).toBeInTheDocument();
  });

  it("keeps every debugging rule in the list while only one is lit", () => {
    const { container } = renderBio();

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(litLine(container)).toBe(0);

    act(() => { vi.advanceTimersByTime(5200); });
    expect(litLine(container)).toBe(1);

    act(() => { vi.advanceTimersByTime(10400); });
    expect(litLine(container)).toBe(0);
  });

  it("holds the line while the pointer is over it, and lets go when it leaves", () => {
    const { container } = renderBio();

    fireEvent.mouseOver(screen.getByText("The short version"));
    act(() => { vi.advanceTimersByTime(20000); });
    expect(litLine(container)).toBe(0);

    fireEvent.mouseOut(container.querySelector(".profile-bio"));
    act(() => { vi.advanceTimersByTime(5200); });
    expect(litLine(container)).toBe(1);
  });

  it("asks for no clock at all when the profile tab is hidden", () => {
    renderBio({ paused: true });

    expect(vi.getTimerCount()).toBe(0);
  });

  it("shows the whole list, unwounded, to a reader who asked for reduced motion", () => {
    const { container } = renderBio({ reducedMotion: true });

    expect(container.querySelector(".profile-bio-lines")).toHaveClass("is-static");
    expect(screen.getAllByRole("listitem").filter((line) => line.classList.contains("is-active"))).toHaveLength(0);
    expect(vi.getTimerCount()).toBe(0);
  });
});
