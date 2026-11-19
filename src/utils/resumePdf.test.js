import { beforeEach, describe, expect, it, vi } from "vitest";
import { downloadResumePdf } from "./resumePdf";

const { pdfDoc, pdfText, pdfLinks } = vi.hoisted(() => {
  const textCalls = [];
  const links = [];
  const doc = {
    internal: { pageSize: { getWidth: () => 595, getHeight: () => 842 } },
    setProperties: vi.fn(),
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    setTextColor: vi.fn(),
    splitTextToSize: vi.fn((text) => [String(text)]),
    text: vi.fn((text) => textCalls.push(String(text))),
    getTextWidth: vi.fn((text) => String(text).length * 4),
    link: vi.fn((...args) => links.push(args)),
    addPage: vi.fn(),
    save: vi.fn(),
  };
  return { pdfDoc: doc, pdfText: textCalls, pdfLinks: links };
});

vi.mock("jspdf", () => ({
  jsPDF: vi.fn(function createPdfDocument() {
    return pdfDoc;
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  pdfText.length = 0;
  pdfLinks.length = 0;
});

describe("downloadResumePdf", () => {
  it("creates a two-page, text-based PDF with working contact and certificate links", async () => {
    const profile = {
      email: "resume@example.com",
      mobile: "+1 555 123 4567",
      linkedin: "https://www.linkedin.com/in/example",
      github: "https://github.com/example",
    };
    const certificates = [
      ["programming-foundations", "Programming Foundations with Python"],
      ["static-website", "Build Your Own Static Website"],
      ["responsive-website", "Build Your Own Responsive Website"],
      ["flexbox", "Responsive Web Design using Flexbox Course"],
      ["javascript-essentials", "JavaScript Essentials Course"],
      ["dynamic-web-application", "Build Your Own Dynamic Web Application Course Exam"],
      ["developer-foundations", "Developer Foundations Course Exam"],
      ["introduction-to-databases", "Introduction to Databases Course Exam"],
    ].map(([slug, courseTitle]) => ({
      route: `/certificates/${slug}`,
      courseTitle,
      issuer: "NxtWave Intensive",
      issueDate: "April 29, 2026",
      certificateUrl: `https://certificates.example/${slug}`,
    }));

    await downloadResumePdf({ profile, certificates });

    expect(pdfDoc.addPage).toHaveBeenCalledTimes(1);
    expect(pdfDoc.save).toHaveBeenCalledWith("Guravaiah-Kukka-Resume.pdf");
    expect(pdfText.join("\n")).toContain("Guravaiah (Gurava k) Kukka");
    expect(pdfText.join("\n")).toContain("Build Your Own Static Website");
    expect(pdfLinks.some(([, , , , link]) => link.url === "mailto:resume@example.com")).toBe(true);
    expect(pdfLinks.some(([, , , , link]) => link.url === "https://certificates.example/static-website")).toBe(true);
  });
});
