import { memo, useState } from "react";
import FeatureRail from "./FeatureRail";
import { DEFAULT_FEATURE_RAIL, RAIL_LIMITS, RAIL_LAYOUTS, RAIL_ORIENTATIONS, sameFeatureRail } from "../config/featureRail";

const SAMPLE_COUNT = 6;

const RANGE_CONTROLS = [
  ["cardWidth", "Card width", (value) => `${value}px`],
  ["cardHeight", "Card height", (value) => (value === 0 ? "Auto" : `${value}px`)],
  ["gap", "Card spacing", (value) => `${value}px`],
  ["cardsPerView", "Cards per view", (value) => (value === 0 ? "Auto" : String(value))],
  ["padding", "Container padding", (value) => `${value}px`],
];

const SWITCHES = [
  ["arrows", "Navigation arrows", "Arrow buttons at the end of the row"],
  ["indicators", "Scroll indicators", "One dot per page of cards"],
  ["drag", "Drag to scroll", "Pull the row sideways with a mouse"],
  ["wrap", "Card wrapping", "Fold the cards onto new rows instead of scrolling"],
];

/* The rail takes the fewest drafts of anything in this panel: each control writes straight through
   to the live rail behind the panel, so there is no Apply step to forget. */
function FeatureRailStudio({ settings, onChange, projects = [], cardUI = {}, fx = {} }) {
  const [announcement, setAnnouncement] = useState("");
  const sample = projects.slice(0, SAMPLE_COUNT);

  const update = (patch, message) => {
    if (!onChange) return;
    onChange(patch);
    if (message) setAnnouncement(`${message} applied.`);
  };

  const resetToDefault = () => {
    if (!onChange) return;
    onChange(DEFAULT_FEATURE_RAIL);
    setAnnouncement("Default card layout restored.");
  };

  return (
    <section className="card-studio-block rail-studio" aria-labelledby="card-studio-rail">
      <div className="card-studio-block-head">
        <h3 id="card-studio-rail">Project card layout</h3>
        <span>Applies immediately</span>
      </div>
      <p className="rail-studio-note">
        The suggested-builds rail on the home page, the &quot;More from&quot; rail on a project page,
        the catalogue&apos;s scrolling band and the 3D collection shelf. Every control changes them as
        you move it — there is nothing to apply. Two things keep their own mind: a size you set in
        3D Settings wins here, because the shelf&apos;s posters are measured for depth, and the
        catalogue band is a grid whose paging is measured against its columns, so the direction and
        the arrows belong to the two card rails.
      </p>

      <div className="rail-studio-layouts" role="group" aria-label="Card layout">
        {RAIL_LAYOUTS.map((layout) => (
          <button
            key={layout.id}
            type="button"
            className={`rail-studio-layout${settings.layout === layout.id ? " is-active" : ""}`}
            aria-pressed={settings.layout === layout.id}
            onClick={() => update({ layout: layout.id, wrap: layout.id !== "carousel" }, layout.label)}
          >
            <strong>{layout.label}</strong>
            <small>{layout.note}</small>
          </button>
        ))}
      </div>

      {/* Which way the strip runs is a rail choice, not a look choice: it decides what the width,
          the count and the paging mean, so it sits with them instead of in Site look. */}
      <div className="card-studio-quick-row">
        <span className="card-studio-quick-label">Direction</span>
        <div className="card-studio-segments" role="group" aria-label="Card direction">
          {RAIL_ORIENTATIONS.map((orientation) => (
            <button
              key={orientation.id}
              type="button"
              className="card-studio-segment"
              aria-pressed={settings.orientation === orientation.id}
              title={orientation.note}
              onClick={() => update({ orientation: orientation.id }, `${orientation.label} direction`)}
            >
              {orientation.label}
            </button>
          ))}
        </div>
      </div>

      <div className="card-ui-settings-grid rail-studio-ranges">
        {RANGE_CONTROLS.map(([key, label, format]) => {
          const { min, max, step } = RAIL_LIMITS[key];
          return (
            <div className="card-ui-range" key={key}>
              <div>
                <label htmlFor={`rail-${key}`}>{label}</label>
                <output htmlFor={`rail-${key}`}>{format(settings[key])}</output>
              </div>
              <input
                id={`rail-${key}`}
                type="range"
                min={min}
                max={max}
                step={step}
                value={settings[key]}
                onChange={(event) => update({ [key]: Number(event.target.value) })}
              />
            </div>
          );
        })}
      </div>

      <div className="rail-studio-switches">
        {SWITCHES.map(([key, label, note]) => {
          const disabled = settings.layout !== "carousel" || (key !== "wrap" && settings.wrap);
          return (
            <label className="card-ui-toggle" key={key} htmlFor={`rail-toggle-${key}`} title={note}>
              <input
                id={`rail-toggle-${key}`}
                type="checkbox"
                checked={settings[key]}
                disabled={disabled}
                onChange={(event) => update({ [key]: event.target.checked }, label)}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>

      {sample.length > 0 ? (
        <div className="rail-studio-preview">
          <div className="rail-studio-preview-head">
            <span>In-panel preview</span>
            <strong>{`${RAIL_LAYOUTS.find((layout) => layout.id === settings.layout)?.label} · ${RAIL_ORIENTATIONS.find((orientation) => orientation.id === settings.orientation)?.label}`}</strong>
          </div>
          <FeatureRail
            projects={sample}
            rail={settings}
            cardUI={cardUI}
            fx={fx}
            eyebrow="Card layout sample"
          />
        </div>
      ) : null}

      <div className="rail-studio-foot">
        <p className="rail-studio-hint">
          {settings.layout === "carousel"
            ? "Cards per view splits the visible width; leave it on Auto to use the card width you typed."
            : `${settings.wrap ? "Wrapping" : "Scrolling"} is fixed in the ${settings.layout} layout, so the arrows and dots follow it.`}
        </p>
        <button
          type="button"
          className="layout-studio-action is-reset"
          onClick={resetToDefault}
          disabled={sameFeatureRail(settings, DEFAULT_FEATURE_RAIL)}
        >
          Reset to default
        </button>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}

/* Memoised because one studio holding local draft state must not re-render the other
   five: the panels together are the bulk of the settings column. */
export default memo(FeatureRailStudio);
