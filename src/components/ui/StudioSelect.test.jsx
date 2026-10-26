import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StudioSelect from "./StudioSelect";

const options = [
  { value: "grid", label: "Studio grid" },
  { value: "mosaic", label: "Bento mosaic" },
  { value: "poster", label: "Poster overlay" },
];

function renderSelect(overrides = {}) {
  const onChange = vi.fn();
  render(
    <StudioSelect
      id="card-ui-cardLayout"
      label="Card layout"
      value="grid"
      options={options}
      onChange={onChange}
      {...overrides}
    />,
  );
  return { onChange, trigger: screen.getByRole("button", { name: /Card layout/i }) };
}

describe("StudioSelect", () => {
  it("opens the listbox and selects an option with the mouse", () => {
    const { onChange, trigger } = renderSelect();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Studio grid" })).toHaveAttribute("aria-selected", "true");

    fireEvent.click(screen.getByRole("option", { name: "Poster overlay" }));

    expect(onChange).toHaveBeenCalledWith("poster");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports arrow-key navigation, Home/End and Enter selection", () => {
    const { onChange, trigger } = renderSelect();
    trigger.focus();

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    const items = screen.getAllByRole("option");
    expect(items[0]).toHaveFocus();

    fireEvent.keyDown(items[0], { key: "End" });
    expect(items[2]).toHaveFocus();

    fireEvent.keyDown(items[2], { key: "Home" });
    expect(items[0]).toHaveFocus();

    fireEvent.keyDown(items[0], { key: "ArrowDown" });
    fireEvent.keyDown(items[1], { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith("mosaic");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape outside the menu and returns focus to the trigger", () => {
    const { trigger } = renderSelect({ value: "mosaic" });

    fireEvent.click(trigger);
    screen.getByRole("option", { name: "Bento mosaic" }).blur();
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape and outside pointer presses", () => {
    const { trigger } = renderSelect({ value: "mosaic" });

    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("option", { name: "Bento mosaic" }), { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
