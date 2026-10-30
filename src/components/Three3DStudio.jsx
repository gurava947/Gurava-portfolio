import { memo, useEffect, useMemo, useRef, useState } from "react";
import Three3DStage from "./Three3DStage";
import {
  DEFAULT_THREE_3D,
  MAX_PIXEL_RATIO,
  THREE_3D_LIMITS,
  THREE_3D_STYLE_OPTIONS,
  THREE_3D_SURFACES,
  describeThree3d,
  describeThree3dLegibility,
  normalizeThree3d,
  resolvePixelRatio,
  resolveThree3dPalette,
  sameThree3d,
} from "../config/three3d";
import { hexToRgb, rgbToHex } from "../utils/stageColor";
import "../styles/three-3d-studio.css";

const RANGE_CONTROLS = [
  ["count", "Instances", ""],
  ["speed", "Motion speed", "%"],
  ["size", "Instance size", ""],
  ["depth", "Scene depth", ""],
  ["brightness", "Brightness", "%"],
  ["pixelRatioCap", "Max pixel ratio", "x"],
];

const SWITCHES = [
  ["pointer", "Pointer field"],
  ["scrim", "Readability scrim"],
  ["reveal", "Reveal on load"],
  ["adaptive", "Frame-rate governor"],
];

/* The ramp the engine falls back to when a stop is missing, mirrored here so the swatch shows the
   colour the stage will actually paint rather than an empty box. */
const RAMP_FALLBACK = { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6" };

const COLOR_CHANNELS = [
  ["primary", "Start colour"],
  ["secondary", "Middle colour"],
  ["accent", "End colour"],
];

function StageColorRow({ channel, label, picked, effective, onPick, onFollowTheme, pulledBack }) {
  const shown = picked || effective || RAMP_FALLBACK[channel] || "#888888";
  const rgb = hexToRgb(shown) || { r: 136, g: 136, b: 136 };
  const setChannel = (key) => (event) => {
    const value = Number(event.target.value);
    if (!Number.isFinite(value)) return;
    onPick(rgbToHex({ ...rgb, [key]: value }));
  };

  return (
    <div className="three-3d-color-row" data-follow-theme={!picked}>
      <div className="three-3d-color-head">
        <label htmlFor={`three-3d-color-${channel}`}>{label}</label>
        <output htmlFor={`three-3d-color-${channel}`}>{shown.toUpperCase()}</output>
      </div>
      <div className="three-3d-color-controls">
        <input
          id={`three-3d-color-${channel}`}
          className="three-3d-color-swatch"
          type="color"
          value={shown}
          onChange={(event) => onPick(event.target.value)}
          aria-label={`${label} picker`}
        />
        {["r", "g", "b"].map((key) => (
          <input
            key={key}
            className="three-3d-color-channel"
            type="number"
            min={0}
            max={255}
            step={1}
            value={rgb[key]}
            onChange={setChannel(key)}
            aria-label={`${label} ${key.toUpperCase()} (0-255)`}
          />
        ))}
        <button
          type="button"
          className="three-3d-color-follow"
          aria-pressed={!picked}
          onClick={onFollowTheme}
        >
          {picked ? "Follow theme" : "Following theme"}
        </button>
      </div>
      {pulledBack && (
        <p className="three-3d-color-guard">
          Pulled back from {picked.toUpperCase()} so the page copy stays readable over it.
        </p>
      )}
    </div>
  );
}

function Three3DStudio({ settings, onApply, projects = [], palette, reducedMotion = false }) {
  const applied = normalizeThree3d(settings);
  const [draft, setDraft] = useState(applied);
  const [announcement, setAnnouncement] = useState("");
  const [stats, setStats] = useState(null);
  const appliedRef = useRef(applied);
  const appliedKey = JSON.stringify(applied);
  const dirty = !sameThree3d(draft, applied);
  const atDefault = sameThree3d(draft, DEFAULT_THREE_3D) && sameThree3d(applied, DEFAULT_THREE_3D);
  const activeStyle = THREE_3D_STYLE_OPTIONS.find(({ id }) => id === draft.style) || THREE_3D_STYLE_OPTIONS[0];
  /* The preview paints the guarded palette, not the raw picks: what the panel shows is what the stage
     will actually draw, including any colour the readability guard had to pull back. */
  const previewPalette = useMemo(() => resolveThree3dPalette(draft, palette), [draft, palette]);
  const legibility = useMemo(() => describeThree3dLegibility(draft, palette), [draft, palette]);

  useEffect(() => {
    if (sameThree3d(appliedRef.current, applied)) return;
    setDraft((current) => (sameThree3d(current, appliedRef.current) ? applied : current));
    appliedRef.current = applied;
  }, [appliedKey]);

  const updateDraft = (patch, message) => {
    setDraft((current) => normalizeThree3d({ ...current, ...patch }));
    if (message) setAnnouncement(`${message} previewed below. Choose Apply stage settings to keep it.`);
  };

  const applyStyle = (style) => updateDraft(
    { style: style.id },
    style.id === "off" ? "3D switched off" : `${style.label} style`,
  );

  const applyDraft = () => {
    if (!dirty) return;
    const next = normalizeThree3d(draft);
    onApply?.(next);
    appliedRef.current = next;
    setDraft(next);
    setAnnouncement(next.style === "off"
      ? "3D settings applied. The flat design is live and the engine is unloaded."
      : "3D settings applied.");
  };

  const cancelDraft = () => {
    setDraft(applied);
    setAnnouncement("3D preview discarded. The live stage is unchanged.");
  };

  const resetToDefault = () => {
    const next = { ...DEFAULT_THREE_3D };
    setDraft(next);
    appliedRef.current = next;
    onApply?.(next);
    setAnnouncement("3D switched off. The site is back to its shipped look.");
  };

  // Returning the same object when nothing moved keeps this callback from feeding its own re-render:
  // the stage reports after every update, and an unconditional setState would loop. The governor's own
  // numbers are part of the comparison because they are the reason the panel is being told at all.
  const readStats = (next) => setStats((current) => (
    current
    && current.drawCalls === next.drawCalls
    && current.instances === next.instances
    && current.pixelRatio === next.pixelRatio
    && current.drawn === next.drawn
    && current.governorScale === next.governorScale
    && current.meanFrameMs === next.meanFrameMs
    && current.surface === next.surface
      ? current
      : next
  ));

  return (
    <section className="card-studio-block three-3d-studio" aria-labelledby="card-studio-three-3d">
      <div className="card-studio-block-head">
        <h3 id="card-studio-three-3d">3D Stage</h3>
        <span>Off by default</span>
      </div>
      <p className="three-3d-note">
        Nothing here is live until you choose a style: while it reads <strong>Off</strong> the site is the same
        flat design it shipped as, and the Three.js engine is not even downloaded. Picking a style fetches the
        engine and paints one WebGL canvas behind the page — the interactive swarm is the particle system, the
        project shelf lays the catalogue out on a fixed 3D deck.
      </p>

      <div className="three-3d-styles" role="group" aria-label="3D styles">
        {THREE_3D_STYLE_OPTIONS.map((style) => {
          const active = draft.style === style.id;
          return (
            <button
              key={style.id}
              type="button"
              className={`three-3d-style${style.id === "off" ? " is-off" : ""}`}
              aria-pressed={active}
              onClick={() => applyStyle(style)}
            >
              <span className={`three-3d-style-swatch is-${style.id}`} aria-hidden="true" />
              <span className="three-3d-style-copy">
                <strong>{style.label}</strong>
                <small>{style.note}</small>
              </span>
              {active && <span className="three-3d-check" aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      <div className="card-ui-settings-grid three-3d-ranges">
        {RANGE_CONTROLS.map(([key, label, unit]) => {
          const { min, max, step } = THREE_3D_LIMITS[key];
          return (
            <div className="card-ui-range" key={key}>
              <div>
                <label htmlFor={`three-3d-${key}`}>{label}</label>
                <output htmlFor={`three-3d-${key}`}>{draft[key]}{unit}</output>
              </div>
              <input
                id={`three-3d-${key}`}
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

      <div className="three-3d-surfaces" role="group" aria-label="Presence by surface">
        <p className="three-3d-subhead">
          One canvas sits behind the whole site, so these dials are how it changes between the parts of
          it: they set how many of the instances it draws and how deep the field sits on that surface,
          and it moves between them by easing rather than by rebuilding, which is why crossing from the
          landing page into the catalogue costs nothing.
        </p>
        {THREE_3D_SURFACES.map(({ id, label, note }) => {
          const { min, max, step } = THREE_3D_LIMITS.surfacePresence;
          return (
            <div className="card-ui-range three-3d-surface" key={id}>
              <div>
                <label htmlFor={`three-3d-surface-${id}`}>{label}</label>
                <output htmlFor={`three-3d-surface-${id}`}>{draft.surfaces[id]}%</output>
              </div>
              <input
                id={`three-3d-surface-${id}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={draft.surfaces[id]}
                onChange={(event) => updateDraft({ surfaces: { ...draft.surfaces, [id]: Number(event.target.value) } })}
              />
              <small className="three-3d-surface-note">{note}</small>
            </div>
          );
        })}
      </div>

      <div className="three-3d-colors" role="group" aria-label="Stage colours">
        <p className="three-3d-subhead">
          The three stops of the colour ramp, as hex or as RGB. Leaving a stop on <em>Following theme</em>
          keeps the palette the Look studio picks — that is the shipped design, and nothing here changes
          it until you set a colour of your own.
        </p>
        {COLOR_CHANNELS.map(([channel, label]) => (
          <StageColorRow
            key={channel}
            channel={channel}
            label={label}
            picked={draft.colors[channel]}
            effective={previewPalette[channel]}
            pulledBack={previewPalette.adjusted.includes(channel)}
            onPick={(value) => updateDraft({ colors: { ...draft.colors, [channel]: value } }, `${label} previewed`)}
            onFollowTheme={() => updateDraft({ colors: { ...draft.colors, [channel]: "" } }, `${label} follows the theme`)}
          />
        ))}
        {legibility?.worstRatio && (
          <p className="three-3d-legibility">
            At {draft.brightness}% brightness the ramp can cover about {Math.round(legibility.coverage * 100)}%
            of the page; held to that, the copy keeps a {legibility.worstRatio.toFixed(1)}:1 contrast ratio.
            {legibility.adjusted.length ? ` ${legibility.adjusted.length} colour${legibility.adjusted.length === 1 ? " was" : "s were"} pulled back to hold it.` : ""}
          </p>
        )}
      </div>

      <div className="three-3d-switches">
        {SWITCHES.map(([key, label]) => (
          <label className="card-ui-toggle" key={key} htmlFor={`three-3d-toggle-${key}`}>
            <input
              id={`three-3d-toggle-${key}`}
              type="checkbox"
              checked={draft[key]}
              onChange={(event) => updateDraft({ [key]: event.target.checked }, label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <div className={`three-3d-preview${draft.style === "off" ? " is-off" : ""}`}>
        <div className="three-3d-preview-head">
          <span>Live preview</span>
          <strong>{describeThree3d(draft, window.devicePixelRatio || 1)}</strong>
        </div>
        <Three3DStage
          settings={draft}
          projects={projects}
          palette={previewPalette}
          surface="hero"
          reducedMotion={reducedMotion || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches}
          onStats={readStats}
          className="is-preview"
          fallback={(
            <p className="three-3d-unsupported">
              This browser has no WebGL context, so the stage stays on the flat design.
            </p>
          )}
        />
        <p className="three-3d-governor">
          {stats
            ? `${stats.drawn} of ${stats.instances} instances drawn · ${draft.surfaces.hero}% presence on this surface`
              + `${stats.governorScale < 1 ? `, ${Math.round(stats.governorScale * 100)}% left by the governor` : ""}`
              + `${stats.pixelRatioScale < 1 ? ` · device ratio held to ${Math.round(stats.pixelRatioScale * 100)}%` : ""}`
            : "Counting the first frames…"}
        </p>
        <p className="three-3d-preview-note">
          {activeStyle.id === "off"
            ? "The preview is empty because 3D is off — that is the shipped design."
            : `One InstancedMesh draws this scene${stats ? ` in ${stats.drawCalls} draw call${stats.drawCalls === 1 ? "" : "s"}` : ""}, at a device ratio capped to ${resolvePixelRatio(window.devicePixelRatio || 1, draft.pixelRatioCap)}x (the ceiling is ${MAX_PIXEL_RATIO}x). Motion is driven by a Three.js clock, so it is identical at any frame rate.`}
        </p>
      </div>

      <div className="layout-studio-actions">
        <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
          <i aria-hidden="true" /> {dirty ? "Unsaved stage preview" : "Stage settings applied"}
        </span>
        <div className="layout-studio-action-buttons">
          <button type="button" className="layout-studio-action is-reset" onClick={resetToDefault} disabled={atDefault}>
            Reset stage to default
          </button>
          <button type="button" className="layout-studio-action is-cancel" onClick={cancelDraft} disabled={!dirty}>
            Cancel
          </button>
          <button type="button" className="layout-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            Apply stage settings
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}

/* Memoised because one studio holding local draft state must not re-render the other
   five: the panels together are the bulk of the settings column. */
export default memo(Three3DStudio);
