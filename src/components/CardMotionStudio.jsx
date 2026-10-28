import { useEffect, useRef, useState } from "react";
import CollectionShelf from "./CollectionShelf";
import {
  DEFAULT_SHELF_MOTION,
  MOTION_INTENSITIES,
  SHELF_MOTION_LIMITS,
  SHELF_MOTION_PRESETS,
  getShelfMotionPreset,
  normalizeShelfMotion,
  sameShelfMotion,
} from "../config/cardMotion";
import { DEFAULT_SHELF_3D } from "../config/shelf3d";
import "../styles/card-motion-studio.css";

const INTENSITY_LABELS = { subtle: "Subtle", medium: "Medium", strong: "Strong" };

const RANGE_CONTROLS = [
  ["duration", "Transition speed", "ms"],
  ["delay", "Stagger delay", "ms"],
];

function MotionSwatch({ preset }) {
  return (
    <span className={`motion-swatch is-${preset.id}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export default function CardMotionStudio({ settings, onApply, collections = [], projects = [], shelf3d = DEFAULT_SHELF_3D }) {
  const applied = normalizeShelfMotion(settings);
  const [draft, setDraft] = useState(applied);
  const [announcement, setAnnouncement] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const appliedRef = useRef(applied);
  const appliedKey = `${applied.preset}|${applied.intensity}|${applied.duration}|${applied.delay}`;
  const dirty = !sameShelfMotion(draft, applied);
  const activePreset = getShelfMotionPreset(draft.preset);
  const atDefault = sameShelfMotion(draft, DEFAULT_SHELF_MOTION) && sameShelfMotion(applied, DEFAULT_SHELF_MOTION);

  useEffect(() => {
    if (sameShelfMotion(appliedRef.current, applied)) return;
    setDraft((current) => (sameShelfMotion(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [appliedKey]);

  const updateDraft = (patch) => {
    setDraft((current) => normalizeShelfMotion({ ...current, ...patch }));
    setPreviewKey((current) => current + 1);
  };

  const choosePreset = (preset) => {
    updateDraft({ preset: preset.id });
    setAnnouncement(`${preset.label} previewed for the collection shelf. Choose Apply motion to keep it.`);
  };

  const chooseIntensity = (intensity) => {
    updateDraft({ intensity });
    setAnnouncement(`${INTENSITY_LABELS[intensity]} intensity previewed. Choose Apply motion to keep it.`);
  };

  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeShelfMotion(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement("Card motion applied to the collection shelf.");
  };

  const cancelDraft = () => {
    setDraft(applied);
    setAnnouncement("Card motion preview discarded. The live shelf is unchanged.");
  };

  const resetToDefault = () => {
    const next = { ...DEFAULT_SHELF_MOTION };
    setDraft(next);
    appliedRef.current = next;
    onApply?.(next);
    setAnnouncement("Default shelf motion restored.");
  };

  return (
    <section className="card-studio-block motion-studio" aria-labelledby="card-studio-motion">
      <div className="card-studio-block-head">
        <h3 id="card-studio-motion">Card motion</h3>
        <span>Previewed before Apply</span>
      </div>
      <p className="motion-studio-note">
        Controls the stacked glass collection shelf at the top of the Projects catalog. The live shelf keeps its current
        motion until you choose Apply motion.
      </p>

      <div className="motion-studio-presets" role="group" aria-label="Card motion presets">
        {SHELF_MOTION_PRESETS.map((preset) => {
          const active = draft.preset === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              className="motion-studio-preset"
              aria-pressed={active}
              onClick={() => choosePreset(preset)}
            >
              <MotionSwatch preset={preset} />
              <span className="motion-studio-preset-copy">
                <strong>{preset.label}</strong>
                <small>{preset.note}</small>
              </span>
              {active && <span className="motion-studio-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="card-studio-quick-row">
        <span className="card-studio-quick-label">Intensity</span>
        <div className="card-studio-segments" role="group" aria-label="Card motion intensity">
          {MOTION_INTENSITIES.map((intensity) => (
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

      <div className="card-ui-settings-grid motion-studio-ranges">
        {RANGE_CONTROLS.map(([key, label, unit]) => {
          const { min, max, step } = SHELF_MOTION_LIMITS[key];
          return (
            <div className="card-ui-range" key={key}>
              <div>
                <label htmlFor={`shelf-motion-${key}`}>{label}</label>
                <output htmlFor={`shelf-motion-${key}`}>{draft[key]}{unit}</output>
              </div>
              <input
                id={`shelf-motion-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={draft[key]}
                onChange={(event) => updateDraft({ [key]: Number(event.target.value) })}
              />
            </div>
          );
        })}
      </div>

      <div className="motion-studio-preview">
        <div className="motion-studio-preview-head">
          <span>Live preview</span>
          <strong>{activePreset.label} · {INTENSITY_LABELS[draft.intensity]} · {draft.duration}ms</strong>
          <button
            type="button"
            className="motion-studio-replay"
            onClick={() => setPreviewKey((current) => current + 1)}
          >
            Replay
          </button>
        </div>
        <CollectionShelf
          key={previewKey}
          preview
          collections={collections}
          projects={projects}
          motion={draft}
          shelf3d={shelf3d}
        />
        <p className="motion-studio-preview-note">
          Hover a sample to test the draft. The live shelf is isolated from this preview; only Apply motion changes it.
        </p>
      </div>

      <div className="layout-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved motion preview" : "Motion applied"}
        </span>
        <div className="layout-studio-action-buttons">
          <button type="button" className="layout-studio-action is-reset" onClick={resetToDefault} disabled={atDefault}>
            Reset to default
          </button>
          <button type="button" className="layout-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="layout-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply motion
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
