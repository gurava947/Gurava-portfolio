import { useEffect, useRef, useState } from "react";
import CertificateCard from "./CertificateCard";
import ProjectCard from "./ProjectCard";
import {
  DEFAULT_LAYOUT_SETTINGS,
  LAYOUT_AREAS,
  getLayoutPattern,
  getLayoutPatternsForArea,
  getPatternAreas,
  normalizeLayoutSettings,
  sameLayoutSettings,
} from "../config/layoutPatterns";

const PREVIEW_CERT_COPY = { openLabel: "Open certificate" };

function PatternSwatch({ pattern }) {
  return (
    <span className={`layout-swatch is-${pattern.id}`} aria-hidden="true">
      <i /><i /><i /><i />
    </span>
  );
}

function MiniCards({ projects, cardUI, count = 4, className = "" }) {
  return (
    <div className={`layout-preview-cards${className ? ` ${className}` : ""}`}>
      {projects.slice(0, count).map((project) => (
        <ProjectCard key={project.id} project={project} cardUI={cardUI} preview />
      ))}
    </div>
  );
}

function ProjectPagePreview({ project, pattern }) {
  if (!project) return <p className="layout-preview-empty">Project details appear here once the catalog is ready.</p>;
  return (
    <div className="layout-preview-page is-project" data-layout-pattern={pattern}>
      <div className="layout-preview-hero">
        <div className="layout-preview-copy">
          <span className="layout-preview-eyebrow">{project.collectionLabel} · {project.category}</span>
          <strong className="layout-preview-title">{project.title}</strong>
          <p>{project.description}</p>
          <div className="layout-preview-chips">
            {(project.technologies || []).slice(0, 3).map((technology) => <span key={technology}>{technology}</span>)}
          </div>
        </div>
        <dl className="layout-preview-facts">
          <div><dt>Collection</dt><dd>{project.collectionLabel}</dd></div>
          <div><dt>Category</dt><dd>{project.category}</dd></div>
          <div><dt>Practice</dt><dd>{project.practiceLabel}</dd></div>
          <div><dt>Preview</dt><dd>{project.previewType === "python" ? "Live Python" : "Live build"}</dd></div>
        </dl>
      </div>
      <div className="layout-preview-panel">
        <span className="layout-preview-panel-bar" />
        <span className="layout-preview-panel-line" />
        <span className="layout-preview-panel-line is-short" />
        <strong>Live preview</strong>
      </div>
      <div className="layout-preview-desc">
        <div className="layout-preview-copy">
          <span className="layout-preview-eyebrow">Project description</span>
          <strong className="layout-preview-subtitle">How it works</strong>
          <p>{project.description}</p>
        </div>
        <aside className="layout-preview-aside">
          <span>Expected output</span>
          <code>{(project.cardOutput || "Supplied output").slice(0, 46)}</code>
        </aside>
      </div>
    </div>
  );
}

function InternalPagePreview({ projects, cardUI, pattern }) {
  return (
    <div className="layout-preview-page is-internal" data-layout-pattern={pattern}>
      <div className="layout-preview-hero is-internal">
        <div className="layout-preview-copy">
          <span className="layout-preview-eyebrow">All builds</span>
          <strong className="layout-preview-title">Projects <em>catalog</em></strong>
          <p>Every supplied build, organized for fast scanning and filtering.</p>
        </div>
        <div className="layout-preview-count">
          <span>Layout</span>
          <strong>{getLayoutPattern(pattern)?.label || "Default"}</strong>
          <small>Live draft</small>
        </div>
      </div>
      <div className="layout-preview-catalog">
        <div className="layout-preview-controls" aria-hidden="true">
          <span>Search</span>
          <span>Category</span>
          <span>Technology</span>
          <span>Sort</span>
        </div>
        <div className="layout-preview-results">
          <div className="layout-preview-results-head"><span>Results</span><span>Page 1</span></div>
          <MiniCards projects={projects} cardUI={cardUI} count={3} className="is-mini" />
        </div>
        <div className="layout-preview-summary" aria-hidden="true">
          <span>Summary</span>
          <strong>Filtered view</strong>
          <small>Page structure preview</small>
        </div>
      </div>
    </div>
  );
}

function LayoutPreview({ area, pattern, projects, certificates, cardUI }) {
  if (area === "certificateCards") {
    return (
      <div className="layout-preview is-cards is-certificates" data-layout-pattern={pattern}>
        <div className="layout-preview-cards">
          {certificates.slice(0, 3).map((certificate) => (
            <CertificateCard key={certificate.slug} certificate={certificate} copy={PREVIEW_CERT_COPY} />
          ))}
          {certificates.length === 0 && <p className="layout-preview-empty">Certificate cards appear here once the records are ready.</p>}
        </div>
      </div>
    );
  }
  if (area === "projectPages") {
    return (
      <div className="layout-preview">
        <ProjectPagePreview project={projects[0]} pattern={pattern} />
      </div>
    );
  }
  if (area === "internalPages") {
    return (
      <div className="layout-preview">
        <InternalPagePreview projects={projects} cardUI={cardUI} pattern={pattern} />
      </div>
    );
  }
  return (
    <div className="layout-preview is-cards" data-layout-pattern={pattern}>
      <MiniCards projects={projects} cardUI={cardUI} count={5} />
      {projects.length === 0 && <p className="layout-preview-empty">Project cards appear here once the catalog is ready.</p>}
    </div>
  );
}

export default function LayoutStudio({
  settings,
  onApply,
  previewProject,
  previewProjects = [],
  previewCertificates = [],
  cardUI = {},
}) {
  const applied = normalizeLayoutSettings(settings);
  const [area, setArea] = useState("projectCards");
  const [scope, setScope] = useState("area");
  const [draft, setDraft] = useState(applied);
  const [announcement, setAnnouncement] = useState("");
  const appliedRef = useRef(applied);
  const dirty = !sameLayoutSettings(draft, applied);
  const activeArea = LAYOUT_AREAS.find((item) => item.id === area) || LAYOUT_AREAS[0];
  const patterns = getLayoutPatternsForArea(area);
  const activePattern = getLayoutPattern(draft[area]);
  const projectPool = previewProjects.length
    ? previewProjects
    : previewProject
      ? [previewProject]
      : [];
  const siteAreas = getPatternAreas(draft[area]);
  const shelfStyle = area === "projectCards" && (cardUI?.cardLayout === "rail" || cardUI?.cardLayout === "depth");

  useEffect(() => {
    if (sameLayoutSettings(appliedRef.current, applied)) return;
    setDraft((current) => (sameLayoutSettings(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [applied]);

  const choosePattern = (patternId) => {
    setDraft((current) => {
      if (scope === "site") {
        const targets = getPatternAreas(patternId);
        const next = { ...current };
        targets.forEach((areaId) => { next[areaId] = patternId; });
        return normalizeLayoutSettings(next);
      }
      return normalizeLayoutSettings({ ...current, [area]: patternId });
    });
    const label = getLayoutPattern(patternId)?.label || "Layout";
    setAnnouncement(scope === "site"
      ? `${label} previewed across every suitable area. Choose Apply layout to keep it.`
      : `${label} previewed for ${activeArea.label.toLowerCase()}. Choose Apply layout to keep it.`);
  };

  const selectArea = (nextArea) => {
    setArea(nextArea);
    setAnnouncement("");
  };

  const resetDraft = () => {
    setDraft({ ...DEFAULT_LAYOUT_SETTINGS });
    setAnnouncement("Current default layouts loaded in the preview. Choose Apply layout to keep them.");
  };
  const cancelDraft = () => {
    setDraft(applied);
    setAnnouncement("Layout preview discarded. The live portfolio is unchanged.");
  };
  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeLayoutSettings(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement(scope === "site"
      ? "Layouts applied to every selected area. The live portfolio is updated."
      : `Layout applied to ${activeArea.label.toLowerCase()}. The live portfolio is updated.`);
  };

  return (
    <section className="card-studio-block layout-studio" aria-labelledby="card-studio-layout">
      <div className="card-studio-block-head">
        <h3 id="card-studio-layout">Layout customization</h3>
        <span>Previewed before Apply</span>
      </div>
      <p className="layout-studio-note">
        The site keeps its current layout until you choose Apply. Pick an area, preview a suitable pattern, then keep it.
      </p>

      <div className="layout-studio-scope" role="group" aria-label="Layout scope">
        <button
          type="button"
          aria-pressed={scope === "area"}
          onClick={() => setScope("area")}
        >
          Selected area
        </button>
        <button
          type="button"
          aria-pressed={scope === "site"}
          onClick={() => setScope("site")}
        >
          Whole site
        </button>
        <span>
          {scope === "site"
            ? `${activePattern?.label || "This pattern"} fits ${siteAreas.length} of ${LAYOUT_AREAS.length} areas.`
            : `Only ${activeArea.label.toLowerCase()} change.`}
        </span>
      </div>

      <div className="layout-studio-areas" role="group" aria-label="Layout area">
        {LAYOUT_AREAS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="layout-studio-area"
            aria-pressed={area === item.id}
            onClick={() => selectArea(item.id)}
          >
            <strong>{item.label}</strong>
            <small>{item.note}</small>
            <i aria-hidden="true">{getLayoutPattern(draft[item.id])?.label || "Default"}</i>
          </button>
        ))}
      </div>

      {shelfStyle && (
        <p className="layout-studio-warning" role="note">
          The side-scroll card style keeps its rail, so card layout patterns are not applied to it.
          Switch the card style to Studio, Bento, Editorial, or Poster to use them.
        </p>
      )}

      <div className="layout-studio-patterns" role="group" aria-label={`${activeArea.label} layout patterns`}>
        {patterns.map((pattern) => {
          const active = draft[area] === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              className="layout-studio-pattern"
              aria-pressed={active}
              title={`${pattern.label} — ${pattern.note}`}
              onClick={() => choosePattern(pattern.id)}
            >
              <PatternSwatch pattern={pattern} />
              <span className="layout-studio-pattern-copy">
                <strong>{pattern.label}</strong>
                <small>{pattern.note}</small>
              </span>
              {active && <span className="layout-studio-pattern-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="layout-studio-preview">
        <div className="layout-studio-preview-head">
          <span>Live preview</span>
          <strong>{activePattern?.label || "Current default"} · {activeArea.label}</strong>
        </div>
        <div className="layout-studio-preview-stage" aria-hidden="true" inert>
          <LayoutPreview
            area={area}
            pattern={draft[area]}
            projects={projectPool}
            certificates={previewCertificates}
            cardUI={cardUI}
          />
        </div>
        <p className="layout-studio-preview-note">
          The draft above is isolated from the live site. Nothing changes until you choose Apply layout.
        </p>
      </div>

      <div className="layout-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved layout preview" : "Layout applied"}
        </span>
        <div className="layout-studio-action-buttons">
          <button type="button" className="layout-studio-action is-reset" onClick={resetDraft}>
            Reset to current default
          </button>
          <button type="button" className="layout-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="layout-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply layout
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
