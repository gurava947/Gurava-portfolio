import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { RESUME_CONTENT } from "../data/resume";
import { downloadResumePdf } from "../utils/resumePdf";
import { pageNumbers, paginateProjects, PROJECTS_PER_PAGE, filterProjects, sortProjects } from "../utils/catalogFilters";
import { prefersReducedMotion } from "../utils/motion";
import MaterialSymbol from "./MaterialSymbol";
import "./ResumePage.css";

const RESUME_SECTIONS = [
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["project-library", "Project catalog"],
  ["education", "Education"],
  ["certifications", "Certifications"],
];
const RESUME_LAYOUT_OPTIONS = [
  { id: "cards", label: "Cards", icon: "grid_view" },
  { id: "tree", label: "Tree", icon: "account_tree" },
  { id: "list", label: "List", icon: "view_list" },
];

function readResumeFilters(search) {
  const params = new URLSearchParams(search);
  return {
    query: params.get("resume_q") || "",
    collection: params.get("resume_collection") || "",
    technology: params.get("resume_technology") || "",
    page: Math.max(1, Number.parseInt(params.get("resume_page") || "1", 10) || 1),
  };
}

function writeResumeFilters(filters) {
  const params = new URLSearchParams(window.location.search);
  ["resume_q", "resume_collection", "resume_technology", "resume_page"].forEach((key) => params.delete(key));
  if (filters.query.trim()) params.set("resume_q", filters.query.trim());
  if (filters.collection) params.set("resume_collection", filters.collection);
  if (filters.technology) params.set("resume_technology", filters.technology);
  if (filters.page > 1) params.set("resume_page", String(filters.page));
  const query = params.toString();
  const url = `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`;
  window.history.replaceState({ ...window.history.state, appRoute: true, appScrollY: window.scrollY }, "", url);
}

function safeWebUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function safeEmail(value) {
  const email = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
}

function safePhone(value) {
  const phone = String(value || "").trim();
  const dialable = phone.replace(/[^\d+]/g, "");
  return /^\+?\d{7,15}$/.test(dialable) ? { display: phone, href: `tel:${dialable}` } : null;
}

function ContactLink({ label, value, href, external = false }) {
  if (!value || !href) return null;
  return (
    <a
      className="resume-contact-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </a>
  );
}

function SectionHeading({ id, children }) {
  return (
    <div className="resume-section-heading">
      <span aria-hidden="true" />
      <h2 id={id}>{children}</h2>
    </div>
  );
}

function ProjectArchiveCard({ project, index, onNavigate }) {
  const cardRef = useRef(null);
  const route = project.route || `/projects/${project.id}`;

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return undefined;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-visible");
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      node.classList.add("is-visible");
      observer.disconnect();
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [project.id]);

  return (
    <article
      className="resume-archive-card"
      data-collection={project.collection}
      ref={cardRef}
      style={{ "--resume-reveal-delay": `${Math.min(index, 6) * 35}ms` }}
    >
      <div className="resume-archive-meta">
        <span>{project.collectionLabel}</span>
        <span>{project.categoryLabel || project.category}</span>
      </div>
      <h3>
        <a href={route} onClick={(event) => onNavigate?.(event, route)}>{project.title}</a>
      </h3>
      <p>{project.description}</p>
      <ul className="resume-archive-tech" aria-label={`${project.title} technologies`}>
        {(project.technologies || []).slice(0, 4).map((technology) => (
          <li key={technology}>{technology}</li>
        ))}
      </ul>
      <a className="resume-archive-open" href={route} onClick={(event) => onNavigate?.(event, route)}>
        Open build <MaterialSymbol name="arrow_outward" />
      </a>
    </article>
  );
}

async function writeClipboard(text) {
  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  try {
    field.select();
    if (!document.execCommand("copy")) throw new Error("The browser did not allow copying.");
  } finally {
    field.remove();
  }
}

export default function ResumePage({
  profile = {},
  certificates = [],
  projects = [],
  collections = [],
  routeSearch = window.location.search,
  backHref = "/",
  onBack,
  onNavigate,
  projectLayout: savedProjectLayout,
  onProjectLayoutChange,
  projectDensity: savedProjectDensity,
  onProjectDensityChange,
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const [pdfStatus, setPdfStatus] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [initialFilters] = useState(() => readResumeFilters(routeSearch));
  const [projectQuery, setProjectQuery] = useState(initialFilters.query);
  const [projectCollection, setProjectCollection] = useState(initialFilters.collection);
  const [projectTechnology, setProjectTechnology] = useState(initialFilters.technology);
  const [projectPage, setProjectPage] = useState(initialFilters.page);
  const [localProjectLayout, setLocalProjectLayout] = useState("cards");
  const [localProjectDensity, setLocalProjectDensity] = useState("comfortable");
  const projectLayout = savedProjectLayout || localProjectLayout;
  const projectDensity = savedProjectDensity || localProjectDensity;
  const deferredProjectQuery = useDeferredValue(projectQuery);

  const email = safeEmail(profile.email);
  const phone = safePhone(profile.mobile);
  const linkedin = safeWebUrl(profile.linkedin);
  const github = safeWebUrl(profile.github);
  const projectCollections = useMemo(() => {
    if (collections.length) return collections;
    const found = new Map();
    projects.forEach((project) => {
      if (!found.has(project.collection)) {
        found.set(project.collection, { id: project.collection, label: project.collectionLabel });
      }
    });
    return Array.from(found.values());
  }, [collections, projects]);
  const technologies = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.technologies || []))).sort((a, b) => a.localeCompare(b)),
    [projects],
  );
  const technologyCounts = useMemo(() => {
    const counts = new Map();
    projects.forEach((project) => {
      (project.technologies || []).forEach((technology) => counts.set(technology, (counts.get(technology) || 0) + 1));
    });
    return Array.from(counts.entries()).sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0])).slice(0, 12);
  }, [projects]);
  const filteredProjects = useMemo(
    () => sortProjects(filterProjects(projects, {
      query: deferredProjectQuery,
      collection: projectCollection,
      technology: projectTechnology,
    })),
    [deferredProjectQuery, projectCollection, projectTechnology, projects],
  );
  const projectPagination = useMemo(
    () => paginateProjects(filteredProjects, projectPage, PROJECTS_PER_PAGE),
    [filteredProjects, projectPage],
  );
  const projectPages = useMemo(
    () => pageNumbers(projectPagination.page, projectPagination.pages),
    [projectPagination.page, projectPagination.pages],
  );
  const treeBranches = useMemo(() => projectCollections.map((collection) => {
    const visible = projectPagination.items.filter((project) => project.collection === collection.id);
    const categories = new Map();
    visible.forEach((project) => {
      const label = project.categoryLabel || project.category;
      if (!categories.has(label)) categories.set(label, []);
      categories.get(label).push(project);
    });
    const count = filteredProjects.filter((project) => project.collection === collection.id).length;
    return { collection, count, categories: Array.from(categories.entries()) };
  }).filter((branch) => branch.categories.length), [filteredProjects, projectCollections, projectPagination.items]);

  useEffect(() => {
    if (projectPagination.page !== projectPage) setProjectPage(projectPagination.page);
  }, [projectPagination.page, projectPage]);

  useEffect(() => {
    writeResumeFilters({
      query: projectQuery,
      collection: projectCollection,
      technology: projectTechnology,
      page: projectPagination.page,
    });
  }, [projectCollection, projectPagination.page, projectQuery, projectTechnology]);

  const updateProjectQuery = (value) => {
    setProjectQuery(value);
    setProjectPage(1);
  };
  const updateProjectCollection = (value) => {
    setProjectCollection(value);
    setProjectPage(1);
  };
  const updateProjectTechnology = (value) => {
    setProjectTechnology(value);
    setProjectPage(1);
  };
  const openProject = (event, route) => {
    if (onNavigate) onNavigate(event, route);
  };
  const updateProjectLayout = (value) => {
    setLocalProjectLayout(value);
    onProjectLayoutChange?.(value);
  };
  const updateProjectDensity = (value) => {
    setLocalProjectDensity(value);
    onProjectDensityChange?.(value);
  };
  const goBack = (event) => {
    if (onBack) onBack(event);
    else openInternal(event, backHref);
  };

  const copyEmail = async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          await writeClipboard(email);
        }
      } else {
        await writeClipboard(email);
      }
      setCopyStatus("Email copied.");
    } catch (error) {
      console.error("Unable to copy the resume email address.", error);
      setCopyStatus("Could not copy the email. Use the email link instead.");
    }
  };

  const createPdf = async () => {
    setIsDownloading(true);
    setPdfStatus("Preparing your resume PDF...");
    try {
      await downloadResumePdf({ profile, certificates });
      setPdfStatus("Your resume PDF has been downloaded.");
    } catch (error) {
      console.error("Unable to generate the resume PDF.", error);
      setPdfStatus("The PDF could not be created. Try Print / Save as PDF instead.");
    } finally {
      setIsDownloading(false);
    }
  };

  const openInternal = (event, route) => {
    if (onNavigate) onNavigate(event, route);
  };

  return (
    <main className="resume-page" id="top">
      <div className="resume-shell">
        <a className="resume-back-link" href={backHref} onClick={goBack}>
          <MaterialSymbol name="arrow_back" /> Back
        </a>
        <header className="resume-hero">
          <div className="resume-hero-copy">
            <p className="resume-eyebrow">Professional resume</p>
            <h1>{RESUME_CONTENT.name}</h1>
            <p className="resume-headline">{RESUME_CONTENT.headline}</p>
            <p className="resume-summary">{RESUME_CONTENT.summary}</p>
          </div>

          <div className="resume-hero-actions" aria-label="Resume actions">
            <button type="button" className="resume-action resume-action-primary" onClick={createPdf} disabled={isDownloading}>
              {isDownloading ? "Preparing PDF..." : "Download ATS PDF"}
            </button>
            <button type="button" className="resume-action resume-action-secondary" onClick={() => window.print()}>
              Print / Save as PDF
            </button>
          </div>

          <p className="resume-action-status" role="status" aria-live="polite">{pdfStatus}</p>
        </header>

        <section className="resume-contact-bar" aria-label="Contact details">
          <ContactLink label="Email" value={email} href={email ? `mailto:${email}` : ""} />
          <ContactLink label="Phone" value={phone?.display} href={phone?.href} />
          <ContactLink label="LinkedIn" value="Profile" href={linkedin} external />
          <ContactLink label="GitHub" value="Profile" href={github} external />
          {email && (
            <button type="button" className="resume-copy-email" onClick={copyEmail}>
              Copy email
            </button>
          )}
          <p className="resume-copy-status" role="status" aria-live="polite">{copyStatus}</p>
        </section>

        <nav className="resume-section-nav" aria-label="Resume sections">
          {RESUME_SECTIONS.map(([id, label]) => (
            <a key={id} href={`#${id}`}>{label}</a>
          ))}
        </nav>

        <div className="resume-columns">
          <div className="resume-main-column">
            <section className="resume-section" id="experience" aria-labelledby="resume-experience-heading">
              <SectionHeading id="resume-experience-heading">Experience</SectionHeading>
              <article className="resume-entry">
                <div className="resume-entry-heading">
                  <div>
                    <h3>{RESUME_CONTENT.experience.title}</h3>
                    <p>{RESUME_CONTENT.experience.company}</p>
                  </div>
                  <span className="resume-entry-dates">{RESUME_CONTENT.experience.dates}</span>
                </div>
                <p className="resume-entry-meta">{RESUME_CONTENT.experience.location} · {RESUME_CONTENT.experience.workMode}</p>
                <ul>
                  {RESUME_CONTENT.experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </article>
            </section>

            <section className="resume-section" id="projects" aria-labelledby="resume-projects-heading">
              <SectionHeading id="resume-projects-heading">Selected projects</SectionHeading>
              <div className="resume-project-grid">
                {RESUME_CONTENT.projects.map((project) => (
                  <article className="resume-project-card" key={project.title}>
                    <div className="resume-entry-heading">
                      <h3>{project.title}</h3>
                      {project.dates && <span className="resume-entry-dates">{project.dates}</span>}
                    </div>
                    <p>{project.description}</p>
                    {project.technologies.length > 0 && (
                      <p className="resume-project-tech">{project.technologies.join(" · ")}</p>
                    )}
                    {project.links.length > 0 && (
                      <div className="resume-project-links" aria-label={`${project.title} links`}>
                        {project.links.map(({ label, url }) => (
                          <a key={label} href={url} target="_blank" rel="noopener noreferrer">{label}<span aria-hidden="true"> ↗</span></a>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>

            <section
              className="resume-section resume-project-library"
              id="project-library"
              aria-labelledby="resume-library-heading"
              data-density={projectDensity}
            >
              <div className="resume-library-heading">
                <SectionHeading id="resume-library-heading">Portfolio project catalog</SectionHeading>
                <span className="resume-library-total">{projects.length} builds</span>
              </div>
              <p className="resume-library-intro">Browse the project records currently in the portfolio. This list is generated from the same catalog used by the Projects page.</p>

              <div className="resume-library-controls">
                <label className="resume-library-search">
                  <span>Search projects</span>
                  <span className="resume-library-input-wrap">
                    <MaterialSymbol name="search" />
                    <input
                      type="search"
                      value={projectQuery}
                      onChange={(event) => updateProjectQuery(event.target.value)}
                      placeholder="Name, category or technology"
                      aria-label="Search portfolio projects"
                    />
                  </span>
                </label>
                <label className="resume-library-filter">
                  <span>Collection</span>
                  <select value={projectCollection} onChange={(event) => updateProjectCollection(event.target.value)} aria-label="Filter projects by collection">
                    <option value="">All collections</option>
                    {projectCollections.map((collection) => (
                      <option key={collection.id} value={collection.id}>{collection.label}</option>
                    ))}
                  </select>
                </label>
                <label className="resume-library-filter">
                  <span>Technology</span>
                  <select value={projectTechnology} onChange={(event) => updateProjectTechnology(event.target.value)} aria-label="Filter projects by technology">
                    <option value="">All technologies</option>
                    {technologies.map((technology) => (
                      <option key={technology} value={technology}>{technology}</option>
                    ))}
                  </select>
                </label>
                <div className="resume-library-layout" role="group" aria-label="Project catalog layout">
                  {RESUME_LAYOUT_OPTIONS.map(({ id, label, icon }) => (
                    <button key={id} type="button" aria-pressed={projectLayout === id} onClick={() => updateProjectLayout(id)}>
                      <MaterialSymbol name={icon} /> {label}
                    </button>
                  ))}
                </div>
                <div className="resume-library-layout" role="group" aria-label="Project card density">
                  {[
                    ["comfortable", "Comfortable"],
                    ["compact", "Compact"],
                  ].map(([value, label]) => (
                    <button key={value} type="button" aria-pressed={projectDensity === value} onClick={() => updateProjectDensity(value)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="resume-library-technology" aria-label="Common technologies in the project catalog">
                <span>Technology highlights</span>
                {technologyCounts.map(([technology, count]) => (
                  <button
                    type="button"
                    key={technology}
                    aria-pressed={projectTechnology === technology}
                    onClick={() => updateProjectTechnology(projectTechnology === technology ? "" : technology)}
                  >
                    {technology}<small>{count}</small>
                  </button>
                ))}
              </div>

              <p className="resume-library-results" aria-live="polite">
                {projectPagination.total
                  ? `Showing ${projectPagination.start}-${projectPagination.end} of ${projectPagination.total} matching builds`
                  : "No matching builds. Try another search or filter."}
              </p>

              {projectPagination.total > 0 && projectLayout === "cards" && (
                <div className="resume-archive-grid">
                  {projectPagination.items.map((project, index) => (
                    <ProjectArchiveCard key={project.id} project={project} index={index} onNavigate={openProject} />
                  ))}
                </div>
              )}

              {projectPagination.total > 0 && projectLayout === "list" && (
                <div className="resume-archive-grid is-list">
                  {projectPagination.items.map((project, index) => (
                    <ProjectArchiveCard key={project.id} project={project} index={index} onNavigate={openProject} />
                  ))}
                </div>
              )}

              {projectPagination.total > 0 && projectLayout === "tree" && (
                <div className="resume-project-tree" data-density={projectDensity}>
                  {treeBranches.map(({ collection, count, categories }) => (
                    <section className={`resume-tree-branch is-${collection.id}`} key={collection.id} aria-label={`${collection.label} project branch`}>
                      <h3>{collection.label}<span>{count} matching builds</span></h3>
                      <div className="resume-tree-categories">
                        {categories.map(([category, entries]) => (
                          <div className="resume-tree-category" key={category}>
                            <h4>{category}<span>{entries.length}</span></h4>
                            <ul>
                              {entries.map((project) => (
                                <li key={project.id}>
                                  <a href={project.route} onClick={(event) => openProject(event, project.route)}>{project.title}</a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              )}

              {projectPagination.pages > 1 && (
                <nav className="resume-library-pagination" aria-label="Project catalog pages">
                  <button type="button" onClick={() => setProjectPage((page) => page - 1)} disabled={projectPagination.page === 1}>
                    <MaterialSymbol name="chevron_left" /> Previous
                  </button>
                  {projectPages.map((page) => (
                    <button
                      type="button"
                      key={page}
                      aria-label={`Go to project page ${page}`}
                      aria-current={page === projectPagination.page ? "page" : undefined}
                      onClick={() => setProjectPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button type="button" onClick={() => setProjectPage((page) => page + 1)} disabled={projectPagination.page === projectPagination.pages}>
                    Next <MaterialSymbol name="chevron_right" />
                  </button>
                </nav>
              )}
              <a className="resume-all-projects" href="/projects" onClick={(event) => openProject(event, "/projects")}>
                Open full project catalog <MaterialSymbol name="arrow_outward" />
              </a>
            </section>
          </div>

          <aside className="resume-side-column">
            <section className="resume-section" id="skills" aria-labelledby="resume-skills-heading">
              <SectionHeading id="resume-skills-heading">Technical skills</SectionHeading>
              <ul className="resume-skill-list">
                {RESUME_CONTENT.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </section>

            <section className="resume-section" id="education" aria-labelledby="resume-education-heading">
              <SectionHeading id="resume-education-heading">Education</SectionHeading>
              <div className="resume-entry-list">
                {RESUME_CONTENT.education.map((item) => (
                  <article className="resume-entry" key={item.institution}>
                    <h3>{item.qualification}</h3>
                    <p>{item.institution}</p>
                    <p className="resume-entry-meta">{item.focus}</p>
                    <span className="resume-entry-dates">{item.dates}</span>
                  </article>
                ))}
              </div>
            </section>

            <section className="resume-section" id="certifications" aria-labelledby="resume-certifications-heading">
              <SectionHeading id="resume-certifications-heading">Certifications</SectionHeading>
              <div className="resume-certificate-list">
                {certificates.map((certificate) => {
                  const route = typeof certificate.route === "string" && certificate.route.startsWith("/certificates/")
                    ? certificate.route
                    : "";
                  const credentialUrl = safeWebUrl(certificate.certificateUrl);
                  const pdfUrl = certificate.certificatePdfUrl || certificate.pdfUrl;
                  return (
                    <article className="resume-certificate-card" key={certificate.slug || certificate.courseTitle}>
                      {route
                        ? <a className="resume-certificate-title" href={route} onClick={(event) => openInternal(event, route)}>{certificate.courseTitle}</a>
                        : <h3 className="resume-certificate-title">{certificate.courseTitle}</h3>}
                      <p>{certificate.issuer}{certificate.issueDate ? ` · ${certificate.issueDate}` : ""}</p>
                      <div className="resume-certificate-links">
                        {credentialUrl && <a href={credentialUrl} target="_blank" rel="noopener noreferrer">Verify credential</a>}
                        {pdfUrl && <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Certificate PDF</a>}
                      </div>
                    </article>
                  );
                })}
              </div>
              <a className="resume-all-certificates" href="/certificates" onClick={(event) => openInternal(event, "/certificates")}>
                Browse all certificates <span aria-hidden="true">→</span>
              </a>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
