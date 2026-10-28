import { useEffect, useRef, useState } from "react";
import {
  BACKGROUND_PATTERNS,
  DEFAULT_SITE_LOOK,
  FEATURED_STYLES,
  HERO_TEXT_STYLES,
  LOOK_PRESETS,
  getBackgroundPattern,
  getFeaturedStyle,
  getHeroTextStyle,
  getLookPreset,
  getSiteLookVariables,
  normalizeSiteLook,
  sameSiteLook,
} from "../config/siteLook";
import "../styles/site-look-studio.css";

const DEMO_WORDS = ["Built,", "refined,"];
const DEMO_ACCENT = "kept in practice.";
const STRIP_TILES = [0, 1, 2, 3, 4, 5, 6, 7];

function LookOptionCard({ active, label, note, onClick, children, ariaLabel }) {
  return (
    <button
      type="button"
      className={`look-studio-option${active ? " is-active" : ""}`}
      aria-pressed={active}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="look-studio-option-preview" aria-hidden="true">{children}</span>
      <span className="look-studio-option-copy">
        <strong>{label}</strong>
        <small>{note}</small>
      </span>
      {active && <span className="look-studio-option-check" aria-hidden="true">✓</span>}
    </button>
  );
}

export default function SiteLookStudio({ settings, onApply }) {
  const applied = normalizeSiteLook(settings);
  const [draft, setDraft] = useState(applied);
  const [announcement, setAnnouncement] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const appliedRef = useRef(applied);
  const appliedKey = `${applied.preset}|${applied.heroText}|${applied.background}|${applied.logo3d}|${applied.featured}`;
  const dirty = !sameSiteLook(draft, applied);
  const atDefault = sameSiteLook(draft, DEFAULT_SITE_LOOK) && sameSiteLook(applied, DEFAULT_SITE_LOOK);
  const activePreset = getLookPreset(draft.preset);
  const activeHeroText = getHeroTextStyle(draft.heroText);
  const activeBackground = getBackgroundPattern(draft.background);
  const activeFeatured = getFeaturedStyle(draft.featured);

  useEffect(() => {
    if (sameSiteLook(appliedRef.current, applied)) return;
    setDraft((current) => (sameSiteLook(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [appliedKey]);

  const updateDraft = (patch, message) => {
    setDraft((current) => normalizeSiteLook({ ...current, ...patch }));
    setPreviewKey((current) => current + 1);
    if (message) setAnnouncement(message);
  };

  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeSiteLook(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement("Look applied to the portfolio.");
  };

  const cancelDraft = () => {
    setDraft(applied);
    setPreviewKey((current) => current + 1);
    setAnnouncement("Look preview discarded. The live portfolio is unchanged.");
  };

  const resetToDefault = () => {
    const next = { ...DEFAULT_SITE_LOOK };
    setDraft(next);
    appliedRef.current = next;
    onApply?.(next);
    setAnnouncement("Default look restored.");
  };

  return (
    <section className="card-studio-block look-studio" aria-labelledby="card-studio-look">
      <div className="card-studio-block-head">
        <h3 id="card-studio-look">Site look</h3>
        <span>Previewed before Apply</span>
      </div>
      <p className="look-studio-note">
        Style direction for the whole page: the hero headline animation, the background behind everything and the
        brand mark. Nothing changes on the live portfolio until you choose Apply look.
      </p>

      <div className="card-studio-quick-row">
        <span className="card-studio-quick-label">Direction</span>
        <div className="card-studio-segments" role="group" aria-label="Style direction">
          {LOOK_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="card-studio-segment"
              aria-pressed={draft.preset === preset.id}
              onClick={() => updateDraft({ preset: preset.id }, `${preset.label} previewed. Choose Apply look to keep it.`)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="look-studio-groups">
        <div className="look-studio-group">
          <h4>Headline motion</h4>
          <div className="look-studio-options" role="group" aria-label="Hero title animation">
            {HERO_TEXT_STYLES.map((style) => (
              <LookOptionCard
                key={style.id}
                active={draft.heroText === style.id}
                label={style.label}
                note={style.note}
                ariaLabel={`${style.label} headline motion`}
                onClick={() => updateDraft({ heroText: style.id }, `${style.label} previewed. Choose Apply look to keep it.`)}
              >
                <span className={`look-demo-text is-${style.id}`}><i>B</i><i>u</i><i>i</i><i>l</i><i>t</i></span>
              </LookOptionCard>
            ))}
          </div>
        </div>

        <div className="look-studio-group">
          <h4>Background</h4>
          <div className="look-studio-options" role="group" aria-label="Background pattern">
            {BACKGROUND_PATTERNS.map((pattern) => (
              <LookOptionCard
                key={pattern.id}
                active={draft.background === pattern.id}
                label={pattern.label}
                note={pattern.note}
                ariaLabel={`${pattern.label} background`}
                onClick={() => updateDraft({ background: pattern.id }, `${pattern.label} previewed. Choose Apply look to keep it.`)}
              >
                <span className={`look-demo-pattern is-${pattern.id}`} />
              </LookOptionCard>
            ))}
          </div>
        </div>
      </div>

      <div className="look-studio-switch-row">
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">3D brand mark</span>
          <div className="card-studio-segments" role="group" aria-label="Three dimensional brand mark">
            {[true, false].map((value) => (
              <button
                key={String(value)}
                type="button"
                className="card-studio-segment"
                aria-pressed={draft.logo3d === value}
                onClick={() => updateDraft({ logo3d: value }, `Brand mark ${value ? "3D on" : "flat"} previewed.`)}
              >
                {value ? "On" : "Off"}
              </button>
            ))}
          </div>
        </div>

        {/* The featured strip is the only Look option that swaps a whole home section,
            so it gets its own labelled row instead of joining the pattern grid. */}
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Featured strip</span>
          <div className="card-studio-segments" role="group" aria-label="Featured builds layout">
            {FEATURED_STYLES.map((style) => (
              <button
                key={style.id}
                type="button"
                className="card-studio-segment"
                aria-pressed={draft.featured === style.id}
                title={style.note}
                onClick={() => updateDraft({ featured: style.id }, `${style.label} featured strip previewed. Choose Apply look to keep it.`)}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="look-studio-preview">
        <div className="look-studio-preview-head">
          <span>Live preview</span>
          <strong>
            {activePreset.label} · {activeHeroText.label} · {activeBackground.label} · {activeFeatured.label}
          </strong>
          <button type="button" className="look-studio-replay" onClick={() => setPreviewKey((current) => current + 1)}>
            Replay
          </button>
        </div>
        <div
          key={previewKey}
          className={`look-studio-stage is-${draft.preset}`}
          data-hero-text={draft.heroText}
          data-bg-pattern={draft.background}
          data-logo-3d={String(draft.logo3d)}
          style={getSiteLookVariables(draft)}
        >
          <span className="look-studio-stage-bg" aria-hidden="true" />
          <span className={`look-studio-mark${draft.logo3d ? " is-3d" : ""}`} aria-hidden="true">G</span>
          <p className="look-studio-stage-title">
            {DEMO_WORDS.map((word, index) => (
              <span className="hero-word" style={{ "--word-index": index }} key={word}>{`${word} `}</span>
            ))}{" "}
            <span className="hero-word hero-word-accent" style={{ "--word-index": DEMO_WORDS.length }}>{DEMO_ACCENT}</span>
          </p>
          {/* Rail variants need a doubled track so the -50% scroll loop is seamless. */}
          <div className={`look-studio-strip is-${draft.featured}`} aria-hidden="true">
            <div className="look-studio-strip-track">
              {(draft.featured === "grid"
                ? STRIP_TILES.slice(0, 4)
                : [...STRIP_TILES, ...STRIP_TILES]
              ).map((tile, position) => (
                <span className="look-studio-strip-card" key={`${draft.featured}-${position}`}><i /></span>
              ))}
            </div>
          </div>
        </div>
        <p className="look-studio-preview-note">
          The draft is isolated to this stage. Only Apply look changes the live portfolio, and it stays on this browser.
        </p>
      </div>

      <div className="layout-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved look preview" : "Look applied"}
        </span>
        <div className="layout-studio-action-buttons">
          <button type="button" className="layout-studio-action is-reset" onClick={resetToDefault} disabled={atDefault}>
            Reset to default
          </button>
          <button type="button" className="layout-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="layout-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply look
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
