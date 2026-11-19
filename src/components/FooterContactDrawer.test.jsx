import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FooterContactDrawer from "./FooterContactDrawer";

const items = [
  {
    id: "github",
    label: "GitHub",
    value: "github.com/example",
    href: "https://github.com/example",
    icon: "code",
    actionLabel: "Open GitHub profile",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: "mail",
    actionLabel: "Send email",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    value: "Practice.folio",
    href: "/",
    icon: "language",
    actionLabel: "Visit portfolio",
    internal: true,
  },
];

afterEach(() => {
  window.localStorage.removeItem("practicefolio.footer-contact-order.v1");
  vi.restoreAllMocks();
});

describe("FooterContactDrawer", () => {
  it("shows a responsive contact card and opens external profiles in a new tab", () => {
    render(<FooterContactDrawer items={items} activeId="github" onSelect={vi.fn()} onClose={vi.fn()} onNavigate={vi.fn()} />);

    expect(screen.getByRole("dialog", { name: "GitHub" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open GitHub profile/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Open GitHub profile/ })).toHaveAttribute("rel", "noopener noreferrer");
    expect(within(screen.getByRole("list", { name: "Reorder contact and profile cards" }))
      .getByRole("button", { name: /Email hello@example\.com/ })).toBeInTheDocument();
  });

  it("reorders cards with accessible controls and persists the new order", () => {
    const requestAnimationFrame = vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 0);
    render(<FooterContactDrawer items={items} activeId="github" onSelect={vi.fn()} onClose={vi.fn()} onNavigate={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Move GitHub later" }));

    const list = screen.getByRole("list", { name: "Reorder contact and profile cards" });
    expect(within(list).getAllByRole("listitem").map((item) => item.id)).toEqual([
      "footer-contact-item-email",
      "footer-contact-item-github",
      "footer-contact-item-portfolio",
    ]);
    expect(window.localStorage.getItem("practicefolio.footer-contact-order.v1")).toBe(JSON.stringify(["email", "github", "portfolio"]));
    expect(screen.getByRole("status")).toHaveTextContent("GitHub moved.");
    expect(requestAnimationFrame).toHaveBeenCalledOnce();
  });

  it("supports native drag-and-drop card reordering", () => {
    const dataTransfer = {
      effectAllowed: "all",
      getData: vi.fn(() => "github"),
      setData: vi.fn(),
    };
    render(<FooterContactDrawer items={items} activeId="github" onSelect={vi.fn()} onClose={vi.fn()} onNavigate={vi.fn()} />);

    const listItems = screen.getAllByRole("listitem");
    fireEvent.dragStart(listItems[0], { dataTransfer });
    fireEvent.dragOver(listItems[1], { dataTransfer });
    fireEvent.drop(listItems[1], { dataTransfer });

    expect(window.localStorage.getItem("practicefolio.footer-contact-order.v1")).toBe(JSON.stringify(["email", "github", "portfolio"]));
    expect(dataTransfer.setData).toHaveBeenCalledWith("text/plain", "github");
  });

  it("uses the in-app route action for the portfolio and closes on Escape", () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<FooterContactDrawer items={items} activeId="portfolio" onSelect={vi.fn()} onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("link", { name: /Visit portfolio/ }));
    expect(onClose).toHaveBeenCalled();
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), "/");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
