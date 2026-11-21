import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CertificateCard from "./CertificateCard";

describe("CertificateCard", () => {
  it("uses the card-sized derivative without changing the full certificate asset", () => {
    const certificate = {
      courseTitle: "Responsive web design",
      assets: [{
        role: "certificate",
        url: "/assets/certificates/responsive.webp",
        thumbnail_url: "/assets/certificates/responsive-thumb.webp",
        alt_text: "Issued certificate",
      }],
      performance: [],
      topics: [],
    };

    render(<CertificateCard certificate={certificate} preview headingLevel={2} />);

    expect(screen.getByRole("img", { name: "Issued certificate" })).toHaveAttribute(
      "src",
      "/assets/certificates/responsive-thumb.webp",
    );
    expect(screen.getByRole("heading", { name: "Responsive web design", level: 2 })).toBeInTheDocument();
  });
});
