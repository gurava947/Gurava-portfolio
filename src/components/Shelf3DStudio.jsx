import { useEffect, useRef, useState } from "react";
import CollectionShelf from "./CollectionShelf";
import {
  DEFAULT_SHELF_3D,
  SHELF_3D_DENSITIES,
  SHELF_3D_LAYOUT_PRESETS,
  SHELF_3D_LIMITS,
  SHELF_3D_MODELS,
  getShelf3dActiveModel,
  getShelf3dDensity,
  getShelf3dLayoutPreset,
  isShelf3dGrid,
  normalizeShelf3d,
  sameShelf3d,
} from "../config/shelf3d";
import "../styles/shelf-3d-studio.css";

const RANGE_CONTROLS = [
  ["cardWidth", "Card width", "px"],
  ["cardHeight", "Card height", "px"],
  ["gap", "Card spacing", "px"],
  ["tilt", "Card angle", "°"],
  ["depth", "Pane depth", "px"],
  ["perspective", "Perspective", "px"],
];

const SWITCHES = [
  ["panes", "Rear deck panes"],
  ["reflection", "Floor reflection"],
  ["stack", "Side stack"],
];

export default function Shelf3DStudio({ settings, onApply, collections = [], projects = [], motion }) {
  const applied = normalizeShelf3d(settings);
  const [draft, setDraft] = useState(applied);
  const [announcement, setAnnouncement] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const appliedRef = useRef(applied);
  const appliedKey = JSON.stringify(applied);
  const dirty = !sameShelf3d(draft, applied);
  const activeLayout = getShelf3dLayoutPreset(draft);
  const activeModel = getShelf3dActiveModel(draft);
  const activeDensity = getShelf3dDensity(draft);
  const atDefault = sameShelf3d(draft, DEFAULT_SHELF_3D) && sameShelf3d(applied, DEFAULT_SHELF_3D);

  useEffect(() => {
    if (sameShelf3d(appliedRef.current, applied)) return;
    setDraft((current) => (sameShelf3d(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [appliedKey]);

  const updateDraft = (patch, message) => {
    setDraft((current) => normalizeShelf3d({ ...current, ...patch }));
    setPreviewKey((current) => current + 1);
    if (message) setAnnouncement(`${message} previewed on the sample shelf. Choose Apply 3D settings to keep it.`);
  };

  const applyLayoutPreset = (preset) => updateDraft(preset.layout, `${preset.label} layout`);
  const applyModel = (model) => updateDraft({ ...model.values, model: model.id }, model.label);
  const applyDensity = (density) => updateDraft({ gap: density.gap }, `${density.label} spacing`);

  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeShelf3d(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement("3D shelf settings applied.");
  };

  const cancelDraft = () => {
    setDraft(applied);
    setAnnouncement("3D preview discarded. The live shelf is unchanged.");
  };

  const resetToDefault = () => {
    const next = { ...DEFAULT_SHELF_3D };
    setDraft(next);
    appliedRef.current = next;
    onApply?.(next);
    setAnnouncement("Default 3D shelf settings restored.");
  };

  return (
    <section className="card-studio-block shelf-3d-studio" aria-labelledby="card-studio-shelf-3d">
      <div className="card-studio-block-head">
        <h3 id="card-studio-shelf-3d">3D Settings</h3>
        <span>Previewed before Apply</span>
      </div>
      <p className="shelf-3d-note">
        Everything here belongs to the 3D collection shelf at the top of the Projects catalogue — layout, card size,
        spacing and the 3D card style. Nothing else on the site changes, and the shelf keeps its current look until
        you choose Apply 3D settings.
      </p>

      <div className="shelf-3d-presets" role="group" aria-label="3D shelf layouts">
        {SHELF_3D_LAYOUT_PRESETS.map((preset) => {
          const active = activeLayout?.id === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              className="shelf-3d-preset"
              aria-pressed={active}
              onClick={() => applyLayoutPreset(preset)}
            >
              <span className={`shelf-3d-swatch is-${preset.id}`} aria-hidden="true"><i /><i /><i /></span>
              <span className="shelf-3d-preset-copy">
                <strong>{preset.label}</strong>
                <small>{preset.note}</small>
              </span>
              {active && <span className="shelf-3d-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="shelf-3d-grid">
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Columns</span>
          <div className="card-studio-segments" role="group" aria-label="Columns of cards">
            {[1, 2, 3].map((columns) => (
              <button
                key={columns}
                type="button"
                className="card-studio-segment"
                aria-pressed={draft.columns === columns}
                onClick={() => updateDraft({ columns }, `${columns} column layout`)}
              >
                {columns}
              </button>
            ))}
          </div>
        </div>
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Rows</span>
          <div className="card-studio-segments" role="group" aria-label="Rows of cards">
            {[1, 2].map((rows) => (
              <button
                key={rows}
                type="button"
                className="card-studio-segment"
                aria-pressed={draft.rows === rows}
                onClick={() => updateDraft({ rows }, `${rows} row layout`)}
              >
                {rows}
              </button>
            ))}
          </div>
        </div>
        <div className="card-studio-quick-row">
          <span className="card-studio-quick-label">Density</span>
          <div className="card-studio-segments" role="group" aria-label="Shelf density">
            {SHELF_3D_DENSITIES.map((density) => (
              <button
                key={density.id}
                type="button"
                className="card-studio-segment"
                aria-pressed={activeDensity?.id === density.id}
                onClick={() => applyDensity(density)}
              >
                {density.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card-ui-settings-grid shelf-3d-ranges">
        {RANGE_CONTROLS.map(([key, label, unit]) => {
          const { min, max, step } = SHELF_3D_LIMITS[key];
          return (
            <div className="card-ui-range" key={key}>
              <div>
                <label htmlFor={`shelf-3d-${key}`}>{label}</label>
                <output htmlFor={`shelf-3d-${key}`}>{draft[key]}{unit}</output>
              </div>
              <input
                id={`shelf-3d-${key}`}
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

      <div className="shelf-3d-models" role="group" aria-label="3D card styles">
        {SHELF_3D_MODELS.map((model) => (
          <button
            key={model.id}
            type="button"
            className="shelf-3d-model"
            aria-pressed={activeModel?.id === model.id}
            onClick={() => applyModel(model)}
          >
            <strong>{model.label}</strong>
            <small>{model.note}</small>
          </button>
        ))}
      </div>

      <div className="shelf-3d-switches">
        {SWITCHES.map(([key, label]) => (
          <label className="card-ui-toggle" key={key} htmlFor={`shelf-3d-toggle-${key}`}>
            <input
              id={`shelf-3d-toggle-${key}`}
              type="checkbox"
              checked={draft[key]}
              onChange={(event) => updateDraft({ [key]: event.target.checked }, label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className="shelf-3d-preview">
        <div className="shelf-3d-preview-head">
          <span>Live preview</span>
          <strong>
            {draft.columns} × {draft.rows} · {draft.cardWidth}×{draft.cardHeight} · {draft.gap}px
            {isShelf3dGrid(draft) ? " · grid" : " · single"}
          </strong>
          <button type="button" className="shelf-3d-replay" onClick={() => setPreviewKey((current) => current + 1)}>
            Replay
          </button>
        </div>
        <CollectionShelf
          key={previewKey}
          preview
          collections={collections}
          projects={projects}
          motion={motion}
          shelf3d={draft}
        />
        <p className="shelf-3d-preview-note">
          The sample updates as you drag. Phones always keep one window across the full width; the grid, size and
          spacing you choose apply from the tablet measure up.
        </p>
      </div>

      <div className="layout-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved 3D preview" : "3D settings applied"}
        </span>
        <div className="layout-studio-action-buttons">
          <button type="button" className="layout-studio-action is-reset" onClick={resetToDefault} disabled={atDefault}>
            Reset to default
          </button>
          <button type="button" className="layout-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="layout-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply 3D settings
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
