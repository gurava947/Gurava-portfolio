import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SelectField } from "./ProjectsCatalog";

const options = [
  { value: "", label: "All technologies" },
  { value: "React", label: "React", count: 74 },
  { value: "CSS", label: "CSS", count: 36 },
];

function renderField(overrides = {}) {
  const onChange = vi.fn();
  render(
    <SelectField
      id="catalog-technology"
      label="Technology"
      icon="technology"
      value=""
      options={options}
      onChange={onChange}
      {...overrides}
    />,
  );
  return { onChange, trigger: screen.getByRole("button", { name: /Technology/ }) };
}

describe("SelectField", () => {
  it("opens a listbox and selects an option with the mouse", () => {
    const { onChange, trigger } = renderField();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    const selected = screen.getByRole("option", { name: /All technologies/i });
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("option", { name: /React 74/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: /CSS 36/i }));

    expect(onChange).toHaveBeenCalledWith("CSS");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("supports arrow-key navigation, Home/End and Enter selection", () => {
    const { onChange, trigger } = renderField();
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

    expect(onChange).toHaveBeenCalledWith("React");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("closes on Escape and outside pointer presses", () => {
    const { trigger } = renderField({ value: "React" });

    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole("option", { name: /React 74/i }), { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
