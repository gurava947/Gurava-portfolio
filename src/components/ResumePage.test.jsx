import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ResumePage from "./ResumePage";
import { downloadResumePdf } from "../utils/resumePdf";

vi.mock("../utils/resumePdf", () => ({
  downloadResumePdf: vi.fn(),
}));

const profile = {
  email: "resume@example.com",
  mobile: "+1 (555) 123-4567",
  linkedin: "https://www.linkedin.com/in/example",
  github: "https://github.com/example",
};

const certificates = [
  {
    slug: "static-website",
    route: "/certificates/static-website",
    courseTitle: "Build Your Own Static Website",
    issuer: "NxtWave Intensive",
    issueDate: "April 29, 2026",
    certificateUrl: "https://certificates.example/static",
    certificatePdfUrl: "/assets/static-certificate.pdf",
  },
];

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

afterEach(() => {
  vi.clearAllMocks();
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else delete navigator.clipboard;
  window.localStorage.removeItem("practicefolio.resume-project-layout.v1");
  window.localStorage.removeItem("practicefolio.resume-project-density.v1");
  window.history.replaceState({}, "", "/");
});

const projectCatalog = Array.from({ length: 25 }, (_, index) => ({
  id: `python-project-${index + 1}`,
  title: `Python project ${index + 1}`,
  route: `/projects/python-project-${index + 1}`,
  collection: "python",
  collectionLabel: "Python",
  category: "Python",
  categoryLabel: "Python",
  description: `Practice build ${index + 1}.`,
  technologies: index === 24 ? ["Python 3.10", "WebRTC"] : ["Python 3.10", "Pyodide"],
}));

const collections = [{ id: "python", label: "Python", count: projectCatalog.length }];

describe("ResumePage", () => {
  it("links each listed certificate to its detail route and external verification", () => {
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<ResumePage profile={profile} certificates={certificates} onNavigate={onNavigate} />);

    const certificateLink = screen.getByRole("link", { name: "Build Your Own Static Website" });
    expect(certificateLink).toHaveAttribute("href", "/certificates/static-website");
    fireEvent.click(certificateLink);
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), "/certificates/static-website");
    expect(screen.getByRole("link", { name: "Verify credential" })).toHaveAttribute("href", "https://certificates.example/static");
    expect(screen.getByRole("link", { name: "Certificate PDF" })).toHaveAttribute("href", "/assets/static-certificate.pdf");
  });

  it("copies the public email address and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<ResumePage profile={profile} certificates={certificates} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy email" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("resume@example.com"));
    expect(await screen.findByText("Email copied.")).toBeInTheDocument();
  });

  it("offers a direct PDF download and hands it the same profile and certificate data", async () => {
    downloadResumePdf.mockResolvedValue(undefined);
    render(<ResumePage profile={profile} certificates={certificates} />);

    fireEvent.click(screen.getByRole("button", { name: "Download ATS PDF" }));

    await waitFor(() => expect(downloadResumePdf).toHaveBeenCalledWith({ profile, certificates }));
    expect(await screen.findByText("Your resume PDF has been downloaded.")).toBeInTheDocument();
  });

  it("opens the browser print flow from the resume action", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<ResumePage profile={profile} certificates={certificates} />);

    fireEvent.click(screen.getByRole("button", { name: "Print / Save as PDF" }));

    expect(print).toHaveBeenCalledOnce();
    print.mockRestore();
  });

  it("keeps projects without supplied destinations as non-links", () => {
    render(<ResumePage profile={profile} certificates={certificates} />);

    const cardWallet = screen.getByText("AI-Powered Digital Card Wallet - Prototype");
    expect(cardWallet.closest("article").querySelector("a")).toBeNull();
    expect(screen.getAllByRole("link", { name: /Live demo/ }).map((link) => link.getAttribute("href"))).toContain("https://guravaportfolio.vercel.app/");
  });

  it("uses the supplied catalog for the web archive and paginates project links", async () => {
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(<ResumePage profile={profile} certificates={certificates} projects={projectCatalog} collections={collections} onNavigate={onNavigate} />);

    expect(screen.getByText("25 builds")).toBeInTheDocument();
    expect(screen.getByText("Showing 1-24 of 25 matching builds")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Python project 1" })).toHaveAttribute("href", "/projects/python-project-1");
    expect(screen.queryByRole("link", { name: "Python project 25" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    const lastProject = await screen.findByRole("link", { name: "Python project 25" });
    expect(screen.getByText("Showing 25-25 of 25 matching builds")).toBeInTheDocument();
    fireEvent.click(lastProject);
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), "/projects/python-project-25");
  });

  it("filters project catalog by technology and displays its tree layout", async () => {
    render(<ResumePage profile={profile} certificates={certificates} projects={projectCatalog} collections={collections} />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search portfolio projects" }), { target: { value: "WebRTC" } });

    expect(await screen.findByText("Showing 1-1 of 1 matching builds")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Python project 25" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Tree/ }));

    expect(screen.getByRole("region", { name: "Python project branch" })).toBeInTheDocument();
  });

  it("restores archive search and page from the route and exposes a back action", () => {
    const onBack = vi.fn((event) => event.preventDefault());
    const onNavigate = vi.fn((event) => event.preventDefault());
    render(
      <ResumePage
        profile={profile}
        certificates={certificates}
        projects={projectCatalog}
        collections={collections}
        routeSearch="?resume_q=Python&resume_page=2"
        backHref="/projects"
        onBack={onBack}
        onNavigate={onNavigate}
      />,
    );

    expect(screen.getByRole("searchbox", { name: "Search portfolio projects" })).toHaveValue("Python");
    expect(screen.getByText("Showing 25-25 of 25 matching builds")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Back/ })).toHaveAttribute("href", "/projects");
    expect(window.location.search).toBe("?resume_q=Python&resume_page=2");

    fireEvent.click(screen.getByRole("link", { name: /Back/ }));
    fireEvent.click(screen.getByRole("link", { name: "Python project 25" }));

    expect(onBack).toHaveBeenCalledWith(expect.anything());
    expect(onNavigate).toHaveBeenCalledWith(expect.anything(), "/projects/python-project-25");
  });

  it("synchronizes archive layout and density controls with the settings state", () => {
    const onProjectLayoutChange = vi.fn();
    const onProjectDensityChange = vi.fn();
    render(
      <ResumePage
        profile={profile}
        certificates={certificates}
        projects={projectCatalog}
        collections={collections}
        projectLayout="tree"
        projectDensity="compact"
        onProjectLayoutChange={onProjectLayoutChange}
        onProjectDensityChange={onProjectDensityChange}
      />,
    );

    expect(screen.getByRole("button", { name: /Tree/ })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Compact" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: /List/ }));
    fireEvent.click(screen.getByRole("button", { name: "Comfortable" }));

    expect(onProjectLayoutChange).toHaveBeenCalledWith("list");
    expect(onProjectDensityChange).toHaveBeenCalledWith("comfortable");
  });

  it("clears project filters from the separated filter panel", async () => {
    render(<ResumePage profile={profile} certificates={certificates} projects={projectCatalog} collections={collections} />);

    fireEvent.change(screen.getByRole("searchbox", { name: "Search portfolio projects" }), { target: { value: "WebRTC" } });
    expect(await screen.findByText("Showing 1-1 of 1 matching builds")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));

    expect(screen.getByRole("searchbox", { name: "Search portfolio projects" })).toHaveValue("");
    expect(await screen.findByText("Showing 1-24 of 25 matching builds")).toBeInTheDocument();
  });

  it("applies the selected resume layout and keeps section and contact links usable", () => {
    render(
      <ResumePage
        profile={profile}
        certificates={certificates}
        projects={projectCatalog}
        collections={collections}
        sectionLayout="horizontal"
        surface="glass"
      />,
    );

    const resume = document.querySelector(".resume-page");
    expect(resume).toHaveAttribute("data-layout", "horizontal");
    expect(resume).toHaveAttribute("data-surface", "glass");
    expect(screen.getByRole("link", { name: /Email/ })).toHaveAttribute("href", "mailto:resume@example.com");
    expect(screen.getByRole("link", { name: /Phone/ })).toHaveAttribute("href", "tel:+15551234567");
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute("href", "https://www.linkedin.com/in/example");

    for (const link of screen.getByRole("navigation", { name: "Resume sections" }).querySelectorAll("a")) {
      expect(document.querySelector(link.getAttribute("href"))).not.toBeNull();
    }
  });
});
