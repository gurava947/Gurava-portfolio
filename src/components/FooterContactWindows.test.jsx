import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import FooterContactWindows from "./FooterContactWindows";

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
    id: "mobile",
    label: "Mobile",
    value: "+1 555 555 5555",
    href: "tel:+15555555555",
    icon: "call",
    actionLabel: "Call",
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

const defaultProps = {
  items,
  openIds: ["github"],
  minimizedIds: [],
  onOpen: vi.fn(),
  onClose: vi.fn(),
  onMinimize: vi.fn(),
  onNavigate: vi.fn(),
};

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("FooterContactWindows", () => {
  it("renders independent modeless windows with external profiles opening safely in a new tab", () => {
    render(<FooterContactWindows {...defaultProps} openIds={["github", "email"]} />);

    expect(screen.getByRole("dialog", { name: "GitHub" })).not.toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("dialog", { name: "Email" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Open GitHub profile/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /Open GitHub profile/ })).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: "Send email" })).toHaveAttribute("href", "mailto:hello@example.com");
  });

  it("minimizes, restores, and closes windows independently", () => {
    render(<FooterContactWindows {...defaultProps} openIds={["github", "mobile"]} minimizedIds={["github"]} />);

    expect(screen.queryByRole("dialog", { name: "GitHub" })).not.toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Mobile" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Restore GitHub window" }));
    fireEvent.click(screen.getByRole("button", { name: "Minimize Mobile window" }));
    fireEvent.click(screen.getByRole("button", { name: "Close GitHub window" }));

    expect(defaultProps.onOpen).toHaveBeenCalledWith("github");
    expect(defaultProps.onMinimize).toHaveBeenCalledWith("mobile");
    expect(defaultProps.onClose).toHaveBeenCalledWith("github");
  });

  it("allows a window to be dragged within the viewport", () => {
    vi.stubGlobal("PointerEvent", MouseEvent);
    render(<FooterContactWindows {...defaultProps} />);

    const contactWindow = screen.getByRole("dialog", { name: "GitHub" });
    vi.spyOn(contactWindow, "getBoundingClientRect").mockReturnValue({
      left: 100,
      top: 80,
      right: 470,
      bottom: 380,
      width: 370,
      height: 300,
      x: 100,
      y: 80,
      toJSON: () => ({}),
    });
    const header = contactWindow.querySelector(".footer-contact-window-head");

    fireEvent.pointerDown(header, { button: 0, pointerId: 1, clientX: 120, clientY: 100 });
    fireEvent.pointerMove(header, { pointerId: 1, clientX: 160, clientY: 130 });
    fireEvent.pointerUp(header, { pointerId: 1 });

    expect(contactWindow).toHaveStyle({ left: "140px", top: "110px" });
  });

  it("closes only the topmost visible window on Escape", () => {
    render(<FooterContactWindows {...defaultProps} openIds={["github", "mobile"]} minimizedIds={["github"]} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(defaultProps.onClose).toHaveBeenCalledWith("mobile");
  });

  it("uses the in-app route action for the portfolio window", () => {
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<FooterContactWindows {...defaultProps} items={items} openIds={["portfolio"]} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole("link", { name: /Visit portfolio/ }));

    expect(defaultProps.onClose).toHaveBeenCalledWith("portfolio");
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), "/");
  });
});
