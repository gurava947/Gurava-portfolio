import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ProjectCard from "./ProjectCard";
import { getCardStyleVariables } from "../utils/cardStyle";
import "./CardPreviewDialog.css";

const FOCUSABLE = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function PreviewGlyph({ name }) {
  const shared = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };
  if (name === "refresh") {
    return <svg {...shared}><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4.5V10h5.4" /></svg>;
  }
  if (name === "check") {
    return <svg {...shared}><path d="m5 12.5 4.2 4L19 6.5" /></svg>;
  }
  return <svg {...shared}><path d="M6 6l12 12M18 6 6 18" /></svg>;
}

export default function CardPreviewDialog({
  open,
  cardUI,
  effects = {},
  preset = {},
  projects = [],
  copy = {},
  dirty = false,
  onClose,
  onApply,
  onDiscard,
}) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const closeHandlerRef = useRef(onClose);
  const [motionKey, setMotionKey] = useState(0);

  useEffect(() => {
    closeHandlerRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
    setMotionKey((key) => key + 1);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeHandlerRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const items = [...dialog.querySelectorAll(FOCUSABLE)].filter((node) => node.getClientRects().length > 0);
      if (!items.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      const restore = restoreRef.current;
      if (restore instanceof HTMLElement && document.contains(restore)) restore.focus();
    };
  }, [open]);

  if (!open) return null;

  const layout = cardUI.cardLayout || "grid";
  const isRail = layout === "rail" || layout === "depth";
  const gridClass = isRail
    ? `lab-project-grid card-preview-grid is-card-rail${layout === "depth" ? " is-card-depth" : ""}`
    : `lab-project-grid card-preview-grid is-card-${layout}`;
  const hasEntrance = cardUI.entranceIntensity && cardUI.entranceIntensity !== "none";
  const title = preset.label ? `${preset.label} preview` : (copy.previewDialogTitle || "Layout preview");
  const sampleCount = projects.length;

  return createPortal(
    <div
      className="card-preview-overlay"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className="card-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-preview-title"
        aria-describedby="card-preview-description"
        data-card-preview-dialog
        tabIndex={-1}
      >
        <header className="card-preview-head">
          <div className="card-preview-heading">
            <span className="card-preview-eyebrow">
              <i aria-hidden="true" /> {copy.previewDialogEyebrow || "Preview only"}
            </span>
            <h2 id="card-preview-title">{title}</h2>
            <p id="card-preview-description">
              {copy.previewDialogHint || "Nothing here is live yet. Hover a card to test its motion, or replay the entrance."}
            </p>
          </div>
          <div className="card-preview-head-actions">
            <button
              type="button"
              className="card-preview-ghost"
              onClick={() => setMotionKey((key) => key + 1)}
              disabled={!hasEntrance}
              title={hasEntrance ? undefined : (copy.previewNoEntrance || "This preset uses hover motion only.")}
            >
              <PreviewGlyph name="refresh" /> {copy.previewReplay || "Replay motion"}
            </button>
            <button ref={closeRef} type="button" className="card-preview-close" aria-label={copy.previewClose || "Close preview"} onClick={onClose}>
              <PreviewGlyph name="close" />
            </button>
          </div>
        </header>

        <div className="card-preview-body">
          <div className="card-preview-meta">
            <span>{preset.note || copy.previewCustom || "Your selected card style"}</span>
            <span>{preset.motion || copy.previewMotion || "Hover to preview motion"}</span>
            <span>{sampleCount} {copy.previewProjectsLabel || (sampleCount === 1 ? "project" : "projects")}</span>
          </div>
          <div className="card-preview-stage" style={getCardStyleVariables(cardUI)}>
            {projects.length ? (
              <div className={gridClass} key={motionKey}>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    cardUI={cardUI}
                    fx={effects}
                    preview
                    animatePreview
                  />
                ))}
              </div>
            ) : (
              <p className="card-preview-empty">{copy.previewNoProjects || "Project cards will appear once the catalog is ready."}</p>
            )}
          </div>
        </div>

        <footer className="card-preview-foot">
          <div className="card-preview-scope">
            <span className={`card-preview-status${dirty ? " is-dirty" : ""}`} aria-hidden="true" />
            <p>
              {dirty ? (copy.previewPending || "Previewing a change. The live portfolio is unchanged.") : (copy.previewApplied || "This is the design currently applied to the portfolio.")}
              <small>{copy.previewGlobal || "Global style · every project card shares it. Individual cards have no overrides."}</small>
            </p>
          </div>
          <div className="card-preview-actions">
            <button type="button" className="card-preview-action is-discard" onClick={onDiscard}>
              {copy.cancel || "Cancel"}
            </button>
            <button type="button" className="card-preview-action is-apply" onClick={onApply} disabled={!dirty}>
              <PreviewGlyph name="check" /> {dirty ? (copy.apply || "Apply") : (copy.previewAlreadyApplied || "Applied")}
            </button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}
