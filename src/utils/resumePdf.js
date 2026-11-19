import { RESUME_CONTENT } from "../data/resume";

const PAGE_MARGIN = 44;
const BOTTOM_MARGIN = 48;
const BODY_LINE_HEIGHT = 12;

function pdfText(value) {
  return String(value || "")
    .replace(/[–—]/g, "-")
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[•·]/g, "-")
    .replace(/\u00a0/g, " ");
}

function validLink(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`);
    return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "mailto:" || url.protocol === "tel:"
      ? url.href
      : "";
  } catch {
    return "";
  }
}

function makeDocument(data) {
  const { jsPDF } = data.pdfModule;
  const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4", compress: true });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE_MARGIN * 2;
  let y = PAGE_MARGIN;

  const ensureSpace = (height) => {
    if (y + height > pageHeight - BOTTOM_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
  };

  const writeLine = (value, { fontSize = 9, bold = false, indent = 0, color = [35, 43, 38], url = "" } = {}) => {
    const safeText = pdfText(value);
    const safeUrl = validLink(url);
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(safeText, contentWidth - indent);
    lines.forEach((line) => {
      ensureSpace(BODY_LINE_HEIGHT);
      doc.text(line, PAGE_MARGIN + indent, y);
      if (safeUrl) {
        doc.link(PAGE_MARGIN + indent, y - fontSize, Math.min(doc.getTextWidth(line), contentWidth - indent), BODY_LINE_HEIGHT, { url: safeUrl });
      }
      y += BODY_LINE_HEIGHT;
    });
  };

  const section = (title) => {
    ensureSpace(28);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(72, 76, 80);
    doc.text(pdfText(title.toUpperCase()), PAGE_MARGIN, y);
    y += 15;
  };

  const entry = (title, meta, description) => {
    ensureSpace(32);
    writeLine(title, { fontSize: 9.5, bold: true });
    if (meta) writeLine(meta, { fontSize: 8, color: [92, 99, 95] });
    if (description) writeLine(description, { fontSize: 8.5 });
    y += 4;
  };

  doc.setProperties({
    title: `${RESUME_CONTENT.name} - Resume`,
    subject: "ATS-friendly professional resume",
    author: RESUME_CONTENT.name,
    creator: "Practice.folio",
  });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(21);
  doc.setTextColor(25, 34, 29);
  doc.text(pdfText(RESUME_CONTENT.name), PAGE_MARGIN, y);
  y += 24;
  writeLine(RESUME_CONTENT.headline, { fontSize: 10, bold: true, color: [93, 72, 178] });

  const profile = data.profile || {};
  const email = String(profile.email || "").trim();
  const phone = String(profile.mobile || "").trim();
  const linkedin = validLink(profile.linkedin);
  const github = validLink(profile.github);
  if (email) writeLine(`Email: ${email}`, { fontSize: 8, url: `mailto:${email}` });
  if (phone) writeLine(`Phone: ${phone}`, { fontSize: 8, url: `tel:${phone.replace(/[^\d+]/g, "")}` });
  if (linkedin) writeLine(`LinkedIn: ${linkedin}`, { fontSize: 8, url: linkedin });
  if (github) writeLine(`GitHub: ${github}`, { fontSize: 8, url: github });

  section("Professional summary");
  writeLine(RESUME_CONTENT.summary, { fontSize: 8.5 });

  section("Technical skills");
  writeLine(RESUME_CONTENT.skills.join(" | "), { fontSize: 8.5 });

  section("Experience");
  const role = RESUME_CONTENT.experience;
  writeLine(`${role.title} - ${role.company}`, { fontSize: 9.5, bold: true });
  writeLine(`${role.dates} | ${role.location} | ${role.workMode}`, { fontSize: 8, color: [92, 99, 95] });
  role.highlights.forEach((highlight) => writeLine(`- ${highlight}`, { fontSize: 8.5, indent: 8 }));
  y += 4;

  section("Selected projects");
  RESUME_CONTENT.projects.slice(0, 3).forEach((project) => {
    entry(project.title, project.dates, project.description);
    if (project.technologies.length) writeLine(`Technologies: ${project.technologies.join(", ")}`, { fontSize: 8, color: [72, 76, 80] });
    project.links.forEach((link) => writeLine(`${link.label}: ${link.url}`, { fontSize: 7.5, url: link.url }));
  });

  doc.addPage();
  y = PAGE_MARGIN;
  section("Additional projects");
  RESUME_CONTENT.projects.slice(3).forEach((project) => {
    entry(project.title, project.dates, project.description);
    if (project.technologies.length) writeLine(`Technologies: ${project.technologies.join(", ")}`, { fontSize: 8, color: [72, 76, 80] });
    project.links.forEach((link) => writeLine(`${link.label}: ${link.url}`, { fontSize: 7.5, url: link.url }));
  });

  section("Education");
  RESUME_CONTENT.education.forEach((education) => {
    writeLine(education.qualification, { fontSize: 9.5, bold: true });
    writeLine(education.institution, { fontSize: 8.5 });
    writeLine(`${education.focus} | ${education.dates}`, { fontSize: 8, color: [92, 99, 95] });
    y += 4;
  });

  section("Certifications");
  (data.certificates || []).forEach((certificate) => {
    const title = certificate.courseTitle || "Certificate";
    const issuer = [certificate.issuer, certificate.issueDate].filter(Boolean).join(" | ");
    const certificateRoute = typeof window !== "undefined" && certificate.route
      ? new URL(certificate.route, window.location.origin).href
      : "";
    const credentialUrl = validLink(certificate.certificateUrl);
    entry(title, issuer, "");
    if (certificateRoute) writeLine(`Portfolio record: ${certificateRoute}`, { fontSize: 7.5, url: certificateRoute });
    if (credentialUrl) writeLine(`Verify: ${credentialUrl}`, { fontSize: 7.5, url: credentialUrl });
  });

  return doc;
}

export async function downloadResumePdf({ profile, certificates = [] } = {}) {
  const pdfModule = await import("jspdf");
  const doc = makeDocument({ pdfModule, profile, certificates });
  doc.save("Guravaiah-Kukka-Resume.pdf");
}
