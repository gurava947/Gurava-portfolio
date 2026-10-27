import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CertificateCard from "./CertificateCard";
import ProjectCard from "./ProjectCard";
import {
  CERTIFICATE_EFFECTS,
  DEFAULT_CARD_EFFECTS,
  EFFECT_INTENSITIES,
  PROJECT_EFFECTS,
  getCertificateEffect,
  getProjectEffect,
  normalizeCardEffects,
  sameEffectsSettings,
} from "../config/cardEffects";
import { getCardStyleVariables } from "../utils/cardStyle";

const AREA_OPTIONS = [
  { id: "projects", label: "Project cards", note: "Featured and catalog cards" },
  { id: "certificates", label: "Certificate cards", note: "Certificate shelf cards" },
];

const INTENSITY_LABELS = { subtle: "Subtle", medium: "Medium", strong: "Strong" };
const PREVIEW_CERT_COPY = { openLabel: "Open certificate" };
const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex='-1'])";

function EffectSwatch({ effect, kind }) {
  return (
    <span className={`fx-swatch is-${effect} is-${kind}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

function EffectsPreviewDialog({ open, effects, cardUI, project, certificate, dirty, onClose, onApply }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);
  const closeHandlerRef = useRef(onClose);

  useEffect(() => {
    closeHandlerRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    restoreRef.current = document.activeElement;
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

  const normalized = normalizeCardEffects(effects);
  const projectEffect = getProjectEffect(normalized.enabled ? normalized.projects : "none");
  const certificateEffect = getCertificateEffect(normalized.enabled ? normalized.certificates : "none");

  return createPortal(
    <div
      className="fx-preview-overlay"
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className="fx-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fx-preview-title"
        aria-describedby="fx-preview-description"
        data-card-preview-dialog
        data-fx-preview-dialog
        tabIndex={-1}
      >
        <header className="fx-preview-head">
          <div>
            <span className="fx-preview-eyebrow">Preview only</span>
            <h2 id="fx-preview-title">3D card effects</h2>
            <p id="fx-preview-description">Nothing here is live yet. Hover a sample to test the draft motion.</p>
          </div>
          <button ref={closeRef} type="button" className="fx-preview-close" aria-label="Close effect preview" onClick={onClose}>×</button>
        </header>
        <div className="fx-preview-meta">
          <span>Project · {projectEffect.label}</span>
          <span>Certificate · {certificateEffect.label}</span>
          <span>{INTENSITY_LABELS[normalized.intensity]} intensity</span>
        </div>
        <div className="fx-preview-stage" style={getCardStyleVariables(cardUI)}>
          <div className="fx-preview-card">
            <span className="fx-preview-label">Project card</span>
            {project
              ? <ProjectCard project={project} cardUI={cardUI} fx={normalized} preview />
              : <p className="fx-preview-empty">Project samples appear once the catalog is ready.</p>}
          </div>
          <div className="fx-preview-card">
            <span className="fx-preview-label">Certificate card</span>
            {certificate
              ? <CertificateCard certificate={certificate} copy={PREVIEW_CERT_COPY} fx={normalized} preview />
              : <p className="fx-preview-empty">Certificate samples appear once the records are ready.</p>}
          </div>
        </div>
        <footer className="fx-preview-foot">
          <span>{dirty ? "Draft effects, not yet on the live cards." : "These effects are live on the portfolio."}</span>
          <div className="fx-preview-actions">
            <button type="button" className="fx-preview-action is-discard" onClick={onClose}>Close preview</button>
            <button type="button" className="fx-preview-action is-apply" onClick={onApply} disabled={!dirty}>Apply effects</button>
          </div>
        </footer>
      </div>
    </div>,
    document.body,
  );
}

export default function CardEffectsStudio({ settings, onApply, cardUI = {}, previewProject, previewProjects = [], previewCertificates = [] }) {
  const applied = normalizeCardEffects(settings);
  const [draft, setDraft] = useState(applied);
  const [area, setArea] = useState("projects");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const appliedRef = useRef(applied);
  const appliedKey = `${applied.enabled}|${applied.intensity}|${applied.projects}|${applied.certificates}`;
  const dirty = !sameEffectsSettings(draft, applied);
  const project = previewProject || previewProjects[0] || null;
  const certificate = previewCertificates[0] || null;
  const options = area === "projects" ? PROJECT_EFFECTS : CERTIFICATE_EFFECTS;
  const activeArea = AREA_OPTIONS.find((item) => item.id === area) || AREA_OPTIONS[0];
  const projectEffect = getProjectEffect(draft.enabled ? draft.projects : "none");
  const certificateEffect = getCertificateEffect(draft.enabled ? draft.certificates : "none");

  useEffect(() => {
    if (sameEffectsSettings(appliedRef.current, applied)) return;
    setDraft((current) => (sameEffectsSettings(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [appliedKey]);

  const updateDraft = (patch) => {
    setDraft((current) => normalizeCardEffects({ ...current, ...patch }));
  };
  const chooseEffect = (option) => {
    updateDraft({ [area]: option.id });
    setAnnouncement(`${option.label} previewed for ${activeArea.label.toLowerCase()}. Apply effects to keep it.`);
  };
  const chooseIntensity = (intensity) => {
    updateDraft({ intensity });
    setAnnouncement(`${INTENSITY_LABELS[intensity]} intensity previewed. Apply effects to keep it.`);
  };
  const toggleEnabled = (enabled) => {
    updateDraft({ enabled });
    setAnnouncement(enabled ? "Card effects previewed as on. Apply effects to keep it." : "Card effects previewed as off. Apply effects to keep it.");
  };
  const resetDraft = () => {
    setDraft({ ...DEFAULT_CARD_EFFECTS });
    setAnnouncement("Default effects loaded in the preview. Apply effects to keep them.");
  };
  const cancelDraft = () => {
    setDraft(applied);
    setAnnouncement("Effect preview discarded. The live cards are unchanged.");
  };
  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeCardEffects(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement("Card effects applied. The live cards now use the selected treatment.");
  };
  const openPreview = () => {
    setPreviewOpen(true);
    setAnnouncement("Effect preview opened. The live cards are unchanged.");
  };
  const applyFromPreview = () => {
    applyDraft();
    setPreviewOpen(false);
  };

  return (
    <section className="card-studio-block fx-studio" aria-labelledby="card-studio-effects">
      <div className="card-studio-block-head">
        <h3 id="card-studio-effects">3D card effects</h3>
        <span>Previewed before Apply</span>
      </div>
      <p className="fx-studio-note">
        Choose a treatment for project and certificate cards, test the draft on real samples, then keep it.
        The live portfolio stays as it is until you choose Apply effects.
      </p>

      <div className="fx-studio-controls">
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Effects</span>
          <div className="card-studio-segments" role="group" aria-label="Card effects">
            <button type="button" className="card-studio-segment" aria-pressed={draft.enabled} onClick={() => toggleEnabled(true)}>
              On
            </button>
            <button type="button" className="card-studio-segment" aria-pressed={!draft.enabled} onClick={() => toggleEnabled(false)}>
              Off
            </button>
          </div>
        </div>
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Intensity</span>
          <div className="card-studio-segments" role="group" aria-label="Effect intensity">
            {EFFECT_INTENSITIES.map((intensity) => (
              <button
                key={intensity}
                type="button"
                className="card-studio-segment"
                aria-pressed={draft.intensity === intensity}
                onClick={() => chooseIntensity(intensity)}
              >
                {INTENSITY_LABELS[intensity]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fx-studio-areas" role="group" aria-label="Effect area">
        {AREA_OPTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="fx-studio-area"
            aria-pressed={area === item.id}
            onClick={() => setArea(item.id)}
          >
            <strong>{item.label}</strong>
            <small>{item.note}</small>
          </button>
        ))}
      </div>

      <div className="fx-studio-grid" role="group" aria-label={`${activeArea.label} effects`}>
        {options.map((option) => {
          const active = draft[area] === option.id;
          return (
            <button
              key={option.id}
              type="button"
              className="fx-studio-option"
              aria-pressed={active}
              onClick={() => chooseEffect(option)}
            >
              <EffectSwatch effect={option.id} kind={area === "projects" ? "project" : "certificate"} />
              <span className="fx-studio-option-copy">
                <strong>{option.label}</strong>
                <small>{option.note}</small>
              </span>
              {active && <span className="fx-studio-option-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      {!draft.enabled && (
        <p className="fx-studio-warning" role="note">
          Effects are off for the live cards. Your selected treatments stay saved here and return when you switch On and apply.
        </p>
      )}

      <div className="fx-studio-preview">
        <div className="fx-studio-preview-head">
          <span>Live preview</span>
          <strong>{INTENSITY_LABELS[draft.intensity]} · draft only</strong>
        </div>
        <div className="fx-studio-stage" style={getCardStyleVariables(cardUI)}>
          <div className="fx-studio-sample">
            <span className="fx-studio-sample-label">Project card <strong>{projectEffect.label}</strong></span>
            {project
              ? <ProjectCard project={project} cardUI={cardUI} fx={draft} preview />
              : <p className="fx-studio-empty">Project samples appear once the catalog is ready.</p>}
          </div>
          <div className="fx-studio-sample">
            <span className="fx-studio-sample-label">Certificate card <strong>{certificateEffect.label}</strong></span>
            {certificate
              ? <CertificateCard certificate={certificate} copy={PREVIEW_CERT_COPY} fx={draft} preview />
              : <p className="fx-studio-empty">Certificate samples appear once the records are ready.</p>}
          </div>
        </div>
        <p className="fx-studio-preview-note">
          Hover a sample to test pointer motion. The draft is isolated from the live site. Nothing changes until you choose Apply effects.
        </p>
      </div>

      <div className="fx-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved effect preview" : "Effects applied"}
        </span>
        <div className="fx-studio-action-buttons">
          <button type="button" className="fx-studio-action is-preview" onClick={openPreview} disabled={!project && !certificate}>
            Preview
          </button>
          <button type="button" className="fx-studio-action is-reset" onClick={resetDraft}>
            Reset to default
          </button>
          <button type="button" className="fx-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="fx-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply effects
          </button>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
      <EffectsPreviewDialog
        open={previewOpen}
        effects={draft}
        cardUI={cardUI}
        project={project}
        certificate={certificate}
        dirty={dirty}
        onClose={() => setPreviewOpen(false)}
        onApply={applyFromPreview}
      />
    </section>
  );
}
