import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import "./styles/theme.css";
import "./App.css";
import "./styles/portfolio-effects.css";
import "./styles/project-lab.css";
import "./styles/unified.css";
import "./styles/card-layouts.css";
import "./styles/layout-patterns.css";
import "./styles/card-effects.css";
import { DEFAULT_CARD_UI_SETTINGS, DEFAULT_LOADER_SETTINGS, normalizeCardUISettings, normalizeLoaderSettings, useTheme } from "./hooks/useTheme";
import { useCatalog } from "./hooks/useCatalog";
import { useProjectDetail } from "./hooks/useProjectDetail";
import { attachImageFallbacks } from "./utils/imageFallback";
import CardPreviewDialog from "./components/CardPreviewDialog";
import CardEffectsStudio from "./components/CardEffectsStudio";
import CardMotionStudio from "./components/CardMotionStudio";
import CertificateCard from "./components/CertificateCard";
import { LoadSpinner } from "./components/LoadSpinner";
import ProjectCard from "./components/ProjectCard";
import GlassFolderCard from "./components/ui/GlassFolderCard";
import LayoutStudio from "./components/LayoutStudio";
import StudioSelect from "./components/ui/StudioSelect";
import { CARD_QUICK_CONTROLS, CARD_STYLE_PRESETS, getActiveCardPresetId } from "./config/cardPresets";
import { CARD_LAYOUTS, getCardStyleVariables, sameCardSettings } from "./utils/cardStyle";

const PROFILE_STORAGE_KEY = "myapp.guravva.profile.v1";

// Route bodies are split so the home page does not ship catalog, detail or certificate code.
const ProjectDetail = lazy(() => import("./components/ProjectDetail"));
const ProjectsCatalog = lazy(() => import("./components/ProjectsCatalog"));
const CertificatesIndex = lazy(() => import("./components/CertificatesIndex"));
const CertificateShowcase = lazy(() => import("./components/CertificateShowcase"));

function RouteFallback({ loader }) {
  return (
    <div className="lab-route-fallback" aria-busy="true">
      <LoadSpinner settings={loader} label="Loading page" size="lg" />
    </div>
  );
}

function NavIcon({ name, className = "nav-control-icon" }) {
  const iconProps = {
    "aria-hidden": true,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  if (name === "sun") {
    return <svg {...iconProps}><circle cx="12" cy="12" r="4.2" /><path d="M12 2.4v2.2m0 14.8v2.2M2.4 12h2.2m14.8 0h2.2M5.2 5.2l1.6 1.6m10.4 10.4 1.6 1.6M5.2 18.8l1.6-1.6m10.4-10.4 1.6-1.6" /></svg>;
  }
  if (name === "moon") {
    return <svg {...iconProps}><path d="M20.6 14.4A8.6 8.6 0 0 1 9.6 3.4a8.7 8.7 0 1 0 11 11Z" /><path d="M16.2 4.4 17 6.4l2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" /></svg>;
  }
  if (name === "certificate") {
    return <svg {...iconProps}><circle cx="12" cy="9" r="5.2" /><path d="m9.1 13.7-1.4 6.1 4.3-2.5 4.3 2.5-1.4-6.1" /><path d="m12 6.6.8 1.5 1.7.3-1.2 1.2.3 1.7-1.6-.8-1.6.8.3-1.7-1.2-1.2 1.7-.3.8-1.5Z" /></svg>;
  }
  if (name === "projects") {
    return <svg {...iconProps}><rect x="3.4" y="3.4" width="7.2" height="7.2" rx="2" /><rect x="13.4" y="3.4" width="7.2" height="7.2" rx="2" /><rect x="3.4" y="13.4" width="7.2" height="7.2" rx="2" /><rect x="13.4" y="13.4" width="7.2" height="7.2" rx="2" /></svg>;
  }
  if (name === "mail") {
    return <svg {...iconProps}><rect x="3" y="5.2" width="18" height="13.6" rx="2.6" /><path d="m3.6 7.2 7.3 5.3a2 2 0 0 0 2.2 0l7.3-5.3" /></svg>;
  }
  return <svg {...iconProps}><path d="M7 17 17 7M8.6 7H17v8.4" /></svg>;
}

function ProfileIcon({ name }) {
  const common = {
    "aria-hidden": true,
    className: "profile-icon",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };
  if (name === "edit") return <svg {...common}><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></svg>;
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "remove") return <svg {...common}><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>;
  if (name === "save") return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="3.6" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" /></svg>;
  if (name === "sliders") return <svg {...common}><path d="M4 7h8m4 0h4M4 17h4m4 0h8" /><circle cx="14" cy="7" r="2.2" /><circle cx="10" cy="17" r="2.2" /></svg>;
  if (name === "refresh") return <svg {...common}><path d="M4 12a8 8 0 1 0 2.4-5.7" /><path d="M4 4.5V10h5.4" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12.5 4.2 4L19 6.5" /></svg>;
  if (name === "eye") return <svg {...common}><path d="M2.8 12S6.3 5.8 12 5.8 21.2 12 21.2 12 17.7 18.2 12 18.2 2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.9" /></svg>;
  if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
  return <svg {...common}><path d="M14 3h7v7m-1-6-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6" /></svg>;
}

function OptionGlyph({ name }) {
  const common = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.9,
    viewBox: "0 0 24 24",
  };
  if (name === "image") return <svg {...common}><rect x="3.5" y="4.5" width="17" height="15" rx="2.4" /><circle cx="9" cy="10" r="1.6" /><path d="m4.5 17 4.8-4.7 3.4 3.3 3.2-3.1 3.6 3.6" /></svg>;
  if (name === "layout") return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="2.6" /><path d="M3.5 9.5h17M9.5 9.5v11" /></svg>;
  if (name === "shadow") return <svg {...common}><rect x="4" y="4" width="12" height="12" rx="2.4" /><path d="M8 20h10a2 2 0 0 0 2-2V8" /></svg>;
  if (name === "spacing") return <svg {...common}><path d="M4.5 7.5v9M19.5 7.5v9M8.5 12h7" /><path d="m10.5 10-2 2 2 2m3-4 2 2-2 2" /></svg>;
  if (name === "type") return <svg {...common}><path d="M4.5 7V5.5h15V7M12 5.5v13M8.8 18.5h6.4" /></svg>;
  if (name === "spark") return <svg {...common}><path d="m12 3.5 1.7 4.6 4.6 1.7-4.6 1.7L12 16.1l-1.7-4.6-4.6-1.7 4.6-1.7L12 3.5Z" /><path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" /></svg>;
  if (name === "easing") return <svg {...common}><path d="M4 18.5C10 18.5 10 5.5 20 5.5" /><path d="M16.8 5.5H20v3.2" /></svg>;
  if (name === "motion") return <svg {...common}><path d="M5 8.5h9M5 12h13M5 15.5h7" /><path d="m17 8.5 2 2-2 2" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="7.5" /></svg>;
}

const CARD_UI_CONTROL_ICONS = {
  imageFit: "image",
  cardLayout: "layout",
  shadowDepth: "shadow",
  cardGap: "spacing",
  fontFamily: "type",
  hoverHighlight: "spark",
  transitionEasing: "easing",
  entranceIntensity: "motion",
};

function externalProfileUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function readSavedProfile(defaultProfile) {
  try {
    const saved = window.sessionStorage.getItem(PROFILE_STORAGE_KEY);
    if (!saved) return defaultProfile;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return defaultProfile;
    const profile = { ...defaultProfile };
    Object.keys(defaultProfile).forEach((field) => {
      if (field !== "links" && typeof parsed[field] === "string") profile[field] = parsed[field];
    });
    if (typeof defaultProfile.email === "string") profile.email = defaultProfile.email;
    if (Array.isArray(parsed.links)) {
      profile.links = parsed.links
        .filter((link) => link && typeof link.label === "string" && link.label.trim() && typeof link.url === "string" && externalProfileUrl(link.url))
        .map(({ label, url }) => ({ label, url }));
    }
    return profile;
  } catch (error) {
    console.warn("Unable to read the saved profile.", error);
    return defaultProfile;
  }
}

const CARD_UI_NUMBER_CONTROLS = {
  Shape: [
    ["radius", "Overall radius", 0, 40, 1, "px"],
    ["topLeftRadius", "Top-left radius", 0, 40, 1, "px"],
    ["topRightRadius", "Top-right radius", 0, 40, 1, "px"],
    ["bottomRightRadius", "Bottom-right radius", 0, 40, 1, "px"],
    ["bottomLeftRadius", "Bottom-left radius", 0, 40, 1, "px"],
  ],
  Borders: [
    ["borderTopWidth", "Top border width", 0, 8, 1, "px"],
    ["borderRightWidth", "Right border width", 0, 8, 1, "px"],
    ["borderBottomWidth", "Bottom border width", 0, 8, 1, "px"],
    ["borderLeftWidth", "Left border width", 0, 8, 1, "px"],
  ],
  Sizing: [
    ["maxWidth", "Card max width", 240, 520, 10, "px"],
    ["minHeight", "Card minimum height", 0, 600, 10, "px"],
  ],
  CardHeight: [
    ["mobileImageHeight", "Mobile image height", 120, 240, 5, "px"],
    ["tabletImageHeight", "Tablet image height", 140, 280, 5, "px"],
    ["desktopImageHeight", "Desktop image height", 160, 320, 5, "px"],
  ],
  Typography: [
    ["fontSize", "Font size", 12, 24, 1, "px"],
    ["fontWeight", "Font weight", 300, 800, 100, ""],
  ],
  Motion: [
    ["hoverScale", "Hover scale", 1, 1.04, 0.01, "×"],
    ["tiltIntensity", "3D tilt intensity", 0, 14, 1, "°"],
    ["transitionDuration", "Transition duration", 0, 600, 25, "ms"],
  ],
};

const CARD_UI_COLOR_CONTROLS = [
  ["backgroundColor", "Card background"],
  ["borderColor", "Card border"],
  ["textColor", "Card text"],
  ["borderTopColor", "Top border"],
  ["borderRightColor", "Right border"],
  ["borderBottomColor", "Bottom border"],
  ["borderLeftColor", "Left border"],
];

const CARD_UI_SELECT_CONTROLS = [
  ["fontFamily", "Font family", [
    ["theme", "Theme default"], ["system", "System UI"], ["arial", "Arial"], ["georgia", "Georgia"], ["monospace", "Monospace"],
  ]],
  ["hoverHighlight", "Hover highlight", [
    ["none", "None"], ["subtle", "Subtle"], ["medium", "Medium"],
  ]],
  ["transitionEasing", "Transition easing", [
    ["smooth", "Smooth"], ["standard", "Standard"],
  ]],
  ["entranceIntensity", "Entrance animation", [
    ["none", "None"], ["subtle", "Subtle"], ["medium", "Medium"],
  ]],
];

const CARD_UI_LAYOUT_CONTROLS = [
  ["imageFit", "Image fit", [
    ["contain", "Fit · show the full preview"],
    ["cover", "Fill · crop the edges"],
  ]],
  ["cardLayout", "Card layout", [
    ["grid", "Studio grid"],
    ["mosaic", "Bento mosaic"],
    ["editorial", "Editorial index"],
    ["poster", "Poster overlay"],
    ["rail", "Side-scroll rail"],
    ["depth", "3D side-scroll rail"],
  ]],
];

const CARD_UI_SURFACE_CONTROLS = [
  ["shadowDepth", "Shadow depth", [
    ["none", "None"], ["soft", "Soft"], ["raised", "Raised"], ["floating", "Floating"],
  ]],
  ["cardGap", "Card spacing", [
    ["compact", "Compact"], ["cozy", "Cozy"], ["spacious", "Spacious"],
  ]],
];

function CardUIColorControl({ setting, label, value, onChange, themeMode }) {
  const dark = themeMode === "dark";
  const themeColor = setting === "backgroundColor" ? (dark ? "#202822" : "#ffffff")
    : setting === "textColor" ? (dark ? "#eef2e8" : "#18231d")
      : dark ? "#3a453b" : "#dfe8d9";

  return (
    <div className="card-ui-color-control">
      <label htmlFor={`card-ui-${setting}`}>{label}</label>
      <div className="card-ui-color-row">
        <input
          id={`card-ui-${setting}`}
          type="color"
          value={value === "theme" ? themeColor : value}
          onChange={(event) => onChange(setting, event.target.value)}
          aria-label={`${label} color`}
        />
        <button
          type="button"
          className="card-ui-theme-color"
          onClick={() => onChange(setting, "theme")}
          aria-pressed={value === "theme"}
        >
          Theme
        </button>
      </div>
    </div>
  );
}

function CardUISettings({ settings, onChange, themeMode }) {
  const setValue = (key, value) => {
    if (key === "radius") {
      onChange({
        radius: value,
        topLeftRadius: value,
        topRightRadius: value,
        bottomRightRadius: value,
        bottomLeftRadius: value,
      });
      return;
    }
    onChange({ [key]: value });
  };

  const rangeControl = ([key, label, min, max, step, unit]) => (
    <div className="card-ui-range" key={key}>
      <div>
        <label htmlFor={`card-ui-${key}`}>{label}</label>
        <output htmlFor={`card-ui-${key}`}>{settings[key]}{unit}</output>
      </div>
      <input
        id={`card-ui-${key}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={settings[key]}
        onChange={(event) => setValue(key, Number(event.target.value))}
      />
    </div>
  );

  const selectControl = ([key, label, options]) => (
    <StudioSelect
      key={key}
      id={`card-ui-${key}`}
      label={label}
      icon={<OptionGlyph name={CARD_UI_CONTROL_ICONS[key]} />}
      value={settings[key]}
      options={options.map(([optionValue, text]) => ({ value: optionValue, label: text }))}
      onChange={(nextValue) => setValue(key, nextValue)}
    />
  );

  const colorControl = ([key, label]) => (
    <CardUIColorControl key={key} setting={key} label={label} value={settings[key]} onChange={setValue} themeMode={themeMode} />
  );

  return (
    <fieldset className="card-ui-settings">
      <legend>Fine-tune</legend>
      <p className="card-ui-hint">Preview any change here, then choose Apply to keep it. These settings are global: every project card shares them. Low-contrast custom colors return to theme colors.</p>

      <details className="card-ui-details">
        <summary><span>Layout &amp; media</span><small>Bento, editorial, poster, rail</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_LAYOUT_CONTROLS.map(selectControl)}
          {CARD_UI_SURFACE_CONTROLS.map(selectControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Colors</span><small>Surface, border, text</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_COLOR_CONTROLS.slice(0, 3).map(colorControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Shape &amp; size</span><small>Rounding, width, height</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_NUMBER_CONTROLS.Shape.map(rangeControl)}
          {CARD_UI_NUMBER_CONTROLS.Sizing.map(rangeControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Borders</span><small>Widths and edges</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_NUMBER_CONTROLS.Borders.map(rangeControl)}
          {CARD_UI_COLOR_CONTROLS.slice(3).map(colorControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Card height</span><small>Thumbnail sizes</small></summary>
        <div className="card-ui-details-heading">
          <span>Portfolio thumbnail heights by screen size</span>
          <button
            type="button"
            className="card-ui-reset"
            onClick={() => onChange({ mobileImageHeight: 150, tabletImageHeight: 175, desktopImageHeight: 190 })}
          >
            Reset height
          </button>
        </div>
        <div className="card-ui-settings-grid">
          {CARD_UI_NUMBER_CONTROLS.CardHeight.map(rangeControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Typography</span><small>Family, size, weight</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_SELECT_CONTROLS.slice(0, 1).map(selectControl)}
          {CARD_UI_NUMBER_CONTROLS.Typography.map(rangeControl)}
        </div>
      </details>

      <details className="card-ui-details">
        <summary><span>Motion</span><small>Hover, entrance, feedback</small></summary>
        <div className="card-ui-settings-grid">
          {CARD_UI_SELECT_CONTROLS.slice(1).map(selectControl)}
          {CARD_UI_NUMBER_CONTROLS.Motion.map(rangeControl)}
          <div className="card-ui-toggles">
            {[
              ["scrollReveal", "Scroll reveal"],
              ["pressFeedback", "Click and press feedback"],
              ["deviceSwitchTransition", "Preview device transition"],
            ].map(([key, label]) => (
              <label className="card-ui-toggle" htmlFor={`card-ui-${key}`} key={key}>
                <input id={`card-ui-${key}`} type="checkbox" checked={settings[key]} onChange={(event) => setValue(key, event.target.checked)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </details>
    </fieldset>
  );
}

function CardStudio({
  settings,
  onApply,
  themeMode,
  previewProject,
  previewProjects = [],
  previewCertificates = [],
  copy = {},
  loaderSettings,
  layoutSettings,
  onLayoutApply,
  effectsSettings,
  onEffectsApply,
  motionSettings,
  onMotionApply,
  shelfCollections = [],
  shelfProjects = [],
}) {
  const appliedLoader = loaderSettings || DEFAULT_LOADER_SETTINGS;
  const [draftCardUI, setDraftCardUI] = useState(settings);
  const [draftLoader, setDraftLoader] = useState(appliedLoader);
  const [announcement, setAnnouncement] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const appliedCardRef = useRef(settings);
  const appliedLoaderRef = useRef(appliedLoader);
  const cardDirty = !sameCardSettings(draftCardUI, settings);
  const loaderDirty = !sameCardSettings(draftLoader, appliedLoader);
  const dirty = cardDirty || loaderDirty;
  const activePresetId = getActiveCardPresetId(draftCardUI);
  const activePreset = CARD_STYLE_PRESETS.find((preset) => preset.id === activePresetId) || null;
  const appliedCopy = copy.applied || "{name} style applied";
  const loader = draftLoader;
  const dialogProjects = previewProjects.length
    ? previewProjects
    : previewProject
      ? [previewProject]
      : [];

  useEffect(() => {
    const cardChanged = !sameCardSettings(appliedCardRef.current, settings);
    const loaderChanged = !sameCardSettings(appliedLoaderRef.current, appliedLoader);
    if (!cardChanged && !loaderChanged) return;
    if (sameCardSettings(draftCardUI, appliedCardRef.current)) setDraftCardUI(settings);
    if (sameCardSettings(draftLoader, appliedLoaderRef.current)) setDraftLoader(appliedLoader);
    appliedCardRef.current = settings;
    appliedLoaderRef.current = appliedLoader;
  }, [settings, appliedLoader, draftCardUI, draftLoader]);

  const updateDraftCardUI = (patch) => {
    setDraftCardUI((current) => normalizeCardUISettings({ ...current, ...patch }));
  };
  const updateDraftLoader = (patch) => {
    setDraftLoader((current) => normalizeLoaderSettings({ ...current, ...patch }));
  };
  const applyPreset = (preset) => {
    setDraftCardUI(normalizeCardUISettings({ ...preset.settings }));
    setAnnouncement(`${appliedCopy.replace("{name}", preset.label)}. ${copy.applyHint || "Choose Apply to keep it."}`);
  };
  const applyQuick = (control, option) => {
    updateDraftCardUI(option.patch);
    setAnnouncement(`${control.label}: ${option.label}. ${copy.applyHint || "Choose Apply to keep it."}`);
  };
  const resetDraft = () => {
    setDraftCardUI({ ...DEFAULT_CARD_UI_SETTINGS });
    setDraftLoader({ ...DEFAULT_LOADER_SETTINGS });
    setAnnouncement(copy.previewDefaults || "Default style loaded in the preview. Choose Apply to keep it.");
  };
  const cancelDraft = () => {
    setDraftCardUI(settings);
    setDraftLoader(appliedLoader);
    setAnnouncement(copy.cancelAnnouncement || "Preview changes discarded.");
  };
  const applyDraft = () => {
    if (!dirty) return;
    const nextCardUI = normalizeCardUISettings(draftCardUI);
    const nextLoader = normalizeLoaderSettings(draftLoader);
    setDraftCardUI(nextCardUI);
    setDraftLoader(nextLoader);
    appliedCardRef.current = nextCardUI;
    appliedLoaderRef.current = nextLoader;
    onApply(nextCardUI, nextLoader);
    setAnnouncement(copy.applyAnnouncement || "Card and loading styles applied.");
  };
  const openPreview = () => {
    setPreviewOpen(true);
    setAnnouncement(copy.previewOpened || "Layout preview opened. The live portfolio is unchanged.");
  };
  const closePreview = () => setPreviewOpen(false);
  const applyFromPreview = () => {
    applyDraft();
    setPreviewOpen(false);
  };
  const discardFromPreview = () => {
    cancelDraft();
    setPreviewOpen(false);
  };

  return (
    <div className="card-studio">
      <div className="card-studio-intro">
        <p>{copy.description || "Preview a look on a real card, then Apply to keep it everywhere."}</p>
        <span className="card-studio-scope"><ProfileIcon name="sliders" /> {copy.scope || "Global card style"}</span>
      </div>

      <section className="card-studio-block card-studio-presets-block" aria-labelledby="card-studio-presets">
        <div className="card-studio-block-head">
          <h3 id="card-studio-presets">{copy.presetsLabel || "Curated looks"}</h3>
          <span>{copy.presetsHint || "Complete styles you can adjust"}</span>
        </div>
        <div className="card-studio-presets" role="group" aria-label={copy.presetsLabel || "Curated looks"}>
          {CARD_STYLE_PRESETS.map((preset) => {
            const active = activePresetId === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                className={`card-studio-preset${active ? " is-active" : ""}`}
                aria-pressed={active}
                onClick={() => applyPreset(preset)}
              >
                <span className={`card-studio-swatch is-${preset.id}`} aria-hidden="true"><span /><span /></span>
                <span className="card-studio-preset-copy">
                  <strong>{preset.label}</strong>
                  <small>{preset.note}</small>
                </span>
                {active && <span className="card-studio-preset-check" aria-hidden="true"><ProfileIcon name="check" /></span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card-studio-block card-studio-preview-block" aria-labelledby="card-studio-preview">
        <div className="card-studio-block-head">
          <h3 id="card-studio-preview">{copy.previewLabel || "Live preview"}</h3>
          <span className={`card-studio-preview-hint${dirty ? " is-dirty" : ""}`}>
            <i aria-hidden="true" /> {dirty ? (copy.previewDirty || "Unsaved preview") : (copy.previewClean || "Applied design")}
          </span>
        </div>
        <div className="card-studio-preview">
          <div
            className={`card-studio-preview-stage${draftCardUI.cardLayout === "depth" ? " is-depth" : ""}`}
            style={getCardStyleVariables(draftCardUI)}
            data-card-layout={draftCardUI.cardLayout}
            aria-hidden="true"
          >
            {previewProject
              ? <ProjectCard project={previewProject} cardUI={draftCardUI} preview />
              : <p className="card-studio-preview-empty">Cards appear here once the catalog is ready.</p>}
          </div>
          <p className="card-studio-preview-note">{copy.previewHint || "Hover the sample to test motion. Open Preview to see the layout across real projects. Only Apply changes the live portfolio."}</p>
        </div>
      </section>

      <section className="card-studio-block card-studio-quick-block" aria-labelledby="card-studio-quick">
        <div className="card-studio-block-head">
          <h3 id="card-studio-quick">{copy.quickLabel || "Quick style"}</h3>
          <span>{copy.quickHint || "Common adjustments, one tap away"}</span>
        </div>
        <div className="card-studio-quick">
          {CARD_QUICK_CONTROLS.map((control) => {
            const activeValue = control.getActive(draftCardUI);
            return (
              <div className="card-studio-quick-row" key={control.id}>
                <span className="card-studio-quick-label">{control.label}</span>
                <div className="card-studio-segments" role="group" aria-label={control.label}>
                  {control.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className="card-studio-segment"
                      aria-pressed={activeValue === option.value}
                      onClick={() => applyQuick(control, option)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="card-studio-block card-studio-loader-block" aria-labelledby="card-studio-loader">
        <div className="card-studio-block-head">
          <h3 id="card-studio-loader">{copy.loaderLabel || "Loading indicators"}</h3>
          <span>{copy.loaderHint || "Previewed before Apply"}</span>
        </div>
        <div className="loader-studio">
          <div className="loader-studio-controls">
            <div className="card-studio-quick-row">
              <span className="card-studio-quick-label">Display</span>
              <div className="card-studio-segments" role="group" aria-label="Loading indicator display">
                <button
                  type="button"
                  className="card-studio-segment"
                  aria-pressed={loader.enabled}
                  onClick={() => updateDraftLoader({ enabled: true })}
                >
                  On
                </button>
                <button
                  type="button"
                  className="card-studio-segment"
                  aria-pressed={!loader.enabled}
                  onClick={() => updateDraftLoader({ enabled: false })}
                >
                  Off
                </button>
              </div>
            </div>
            <div className="card-studio-quick-row">
              <span className="card-studio-quick-label">Style</span>
              <div className="card-studio-segments" role="group" aria-label="Loading indicator style">
                {[["ring", "Ring"], ["dots", "Dots"], ["bar", "Bar"]].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className="card-studio-segment"
                    aria-pressed={loader.style === value}
                    onClick={() => updateDraftLoader({ style: value })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="card-studio-quick-row">
              <span className="card-studio-quick-label">Speed</span>
              <div className="card-studio-segments" role="group" aria-label="Loading indicator speed">
                {[["calm", "Calm"], ["normal", "Normal"], ["fast", "Fast"]].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className="card-studio-segment"
                    aria-pressed={loader.speed === value}
                    onClick={() => updateDraftLoader({ speed: value })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <label className="card-ui-toggle" htmlFor="card-ui-loader-labels">
              <input
                id="card-ui-loader-labels"
                type="checkbox"
                checked={loader.labels}
                onChange={(event) => updateDraftLoader({ labels: event.target.checked })}
              />
              <span>{copy.loaderText || "Show loading text"}</span>
            </label>
          </div>
          <div className="loader-studio-sample" aria-hidden="true">
            <span className="loader-studio-sample-label">{copy.loaderSample || "Live sample"}</span>
            <LoadSpinner settings={loader} label={copy.loaderSampleLabel || "Loading your content"} size="lg" />
            {!loader.enabled && !loader.labels && (
              <span className="loader-studio-off">{copy.loaderOff || "Indicators are off"}</span>
            )}
          </div>
        </div>
      </section>

      <LayoutStudio
        settings={layoutSettings}
        onApply={onLayoutApply}
        previewProject={previewProject}
        previewProjects={previewProjects}
        previewCertificates={previewCertificates}
        cardUI={draftCardUI}
      />

      <CardEffectsStudio
        settings={effectsSettings}
        onApply={onEffectsApply}
        cardUI={draftCardUI}
        previewProject={previewProject}
        previewProjects={previewProjects}
        previewCertificates={previewCertificates}
      />

      <CardMotionStudio
        settings={motionSettings}
        onApply={onMotionApply}
        collections={shelfCollections}
        projects={shelfProjects}
      />

      <CardUISettings settings={draftCardUI} onChange={updateDraftCardUI} themeMode={themeMode} />

      <div className="card-studio-actions">
        <div className="card-studio-actions-status">
          <span className={`card-studio-actions-dot${dirty ? " is-dirty" : ""}`} aria-hidden="true" />
          <span>{dirty ? (copy.unsaved || "Unsaved preview") : (copy.saved || "All changes applied")}</span>
        </div>
        <div className="card-studio-actions-buttons">
          <button type="button" className="card-studio-action is-preview" onClick={openPreview} disabled={!dialogProjects.length}>
            <ProfileIcon name="eye" /> {copy.previewAction || "Preview"}
          </button>
          <button type="button" className="card-studio-action is-reset" onClick={resetDraft}>
            {copy.resetDefault || "Reset to default"}
          </button>
          <button type="button" className="card-studio-action is-cancel" onClick={cancelDraft}>
            {copy.cancel || "Cancel"}
          </button>
          <button type="button" className="card-studio-action is-apply" onClick={applyDraft} disabled={!dirty}>
            <ProfileIcon name="check" /> {copy.apply || "Apply"}
          </button>
        </div>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
      <CardPreviewDialog
        open={previewOpen}
        cardUI={draftCardUI}
        effects={effectsSettings}
        preset={{
          label: activePreset ? activePreset.label : (copy.previewCustomLabel || "Custom"),
          note: activePreset ? activePreset.note : (copy.previewCustomNote || "Your adjusted card style"),
          motion: activePreset ? activePreset.motion : (copy.previewMotion || "Hover to preview motion"),
        }}
        projects={dialogProjects}
        copy={copy}
        dirty={dirty}
        onClose={closePreview}
        onApply={applyFromPreview}
        onDiscard={discardFromPreview}
      />
    </div>
  );
}

function GuravvaProfilePopover({
  onClose,
  copy,
  defaultProfile,
  cardUISettings,
  onCardUIChange,
  themeMode,
  previewProject,
  previewProjects,
  previewCertificates,
  loaderSettings,
  onLoaderChange,
  layoutSettings,
  onLayoutChange,
  effectsSettings,
  onEffectsChange,
  motionSettings,
  onMotionChange,
  shelfCollections,
  shelfProjects,
}) {
  const [profile, setProfile] = useState(() => readSavedProfile(defaultProfile));
  const [draft, setDraft] = useState(profile);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState("profile");
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const firstInputRef = useRef(null);
  const editButtonRef = useRef(null);
  const studioCopy = copy.cardStudio || {};
  const tabCopy = copy.tabs || {};
  const profileInitial = (profile.name || copy.eyebrow || "G").trim().charAt(0).toUpperCase();

  useEffect(() => {
    if (editing) firstInputRef.current?.focus();
    else if (feedback === copy.saved) editButtonRef.current?.focus();
  }, [editing, feedback, copy.saved]);

  const selectTab = (nextTab) => {
    setTab(nextTab);
    window.requestAnimationFrame(() => {
      document.getElementById(nextTab === "profile" ? "guravva-profile-tab" : "guravva-cards-tab")?.focus();
    });
  };
  const handleTabKeyDown = (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextTab = event.key === "Home"
      ? "profile"
      : event.key === "End"
        ? "cards"
        : tab === "profile" ? "cards" : "profile";
    if (nextTab !== tab) selectTab(nextTab);
  };

  const updateField = (field, value) => {
    if (field === "email") return;
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setFeedback("");
  };
  const startEditing = () => {
    setDraft({ ...profile, links: profile.links.map((link) => ({ ...link })) });
    setErrors({});
    setFeedback("");
    setEditing(true);
  };
  const cancelEditing = () => {
    setDraft({ ...profile, links: profile.links.map((link) => ({ ...link })) });
    setErrors({});
    setFeedback("");
    setEditing(false);
  };
  const addLink = () => setDraft((current) => ({ ...current, links: [...current.links, { label: "", url: "" }] }));
  const updateLink = (index, field, value) => setDraft((current) => ({
    ...current,
    links: current.links.map((link, linkIndex) => linkIndex === index ? { ...link, [field]: value } : link),
  }));
  const removeLink = (index) => setDraft((current) => ({
    ...current,
    links: current.links.filter((_, linkIndex) => linkIndex !== index),
  }));
  const saveProfile = (event) => {
    event.preventDefault();
    const nextErrors = {};
    const email = defaultProfile.email || draft.email.trim();
    if (email && !/^\[.*\]$/.test(email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = copy.invalidEmail;
    ["linkedin", "github"].forEach((field) => {
      const value = draft[field].trim();
      if (value && !/^\[.*\]$/.test(value) && !externalProfileUrl(value)) nextErrors[field] = copy.invalidUrl;
    });
    draft.links.forEach((link, index) => {
      const label = link.label.trim();
      const url = link.url.trim();
      if (Boolean(label) !== Boolean(url)) nextErrors[`link-${index}`] = copy.linkPairRequired;
      else if (url && !externalProfileUrl(url)) nextErrors[`link-${index}`] = copy.invalidUrl;
    });
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setFeedback(copy.correctFields);
      return;
    }
    const savedProfile = {
      ...draft,
      name: draft.name.trim(),
      age: draft.age.trim(),
      mobile: draft.mobile.trim(),
      email,
      linkedin: draft.linkedin.trim(),
      github: draft.github.trim(),
      links: draft.links.map(({ label, url }) => ({ label: label.trim(), url: url.trim() })).filter((link) => link.label && link.url),
    };
    try {
      window.sessionStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(savedProfile));
    } catch (error) {
      console.error("Unable to save profile in this browser session.", error);
      setFeedback(copy.saveFailed);
      return;
    }
    setProfile(savedProfile);
    setDraft(savedProfile);
    setErrors({});
    setFeedback(copy.saved);
    setEditing(false);
  };

  const profileFields = [
    { field: "name", type: "text", ref: firstInputRef },
    { field: "age", type: "text" },
    { field: "mobile", type: "tel" },
    { field: "email", type: "email", readOnly: true },
    { field: "linkedin", type: "text" },
    { field: "github", type: "text" },
  ];
  const profileRows = [
    { field: "age", value: profile.age, href: "" },
    { field: "mobile", value: profile.mobile, href: profile.mobile ? `tel:${profile.mobile.replace(/[^\d+]/g, "")}` : "" },
    { field: "email", value: profile.email, href: profile.email.includes("@") ? `mailto:${profile.email}` : "" },
    { field: "linkedin", value: profile.linkedin, href: externalProfileUrl(profile.linkedin) },
    { field: "github", value: profile.github, href: externalProfileUrl(profile.github) },
  ];

  return (
    <section
      className={`profile-popover${tab === "cards" ? " is-studio" : ""}`}
      id="guravva-profile"
      role="dialog"
      aria-labelledby="guravva-profile-title"
      aria-describedby="profile-status"
    >
      <div className="profile-popover-top">
        <div className="profile-popover-heading">
          <div className="profile-identity">
            <span className="profile-avatar" aria-hidden="true">{profileInitial}</span>
            <div className="profile-identity-copy">
              <p className="profile-popover-eyebrow">{tab === "cards" ? (studioCopy.eyebrow || "Card studio") : copy.eyebrow}</p>
              <h2 id="guravva-profile-title">{tab === "cards" ? (studioCopy.title || "Design your cards") : editing ? copy.editTitle : profile.name}</h2>
            </div>
          </div>
          <div className="profile-view-actions">
            {tab === "profile" && !editing && (
              <button ref={editButtonRef} className="profile-edit-button" type="button" onClick={startEditing}>
                <ProfileIcon name="edit" /> {copy.edit}
              </button>
            )}
            <button className="profile-popover-close" type="button" aria-label={copy.close} onClick={onClose}>×</button>
          </div>
        </div>

        <div className="profile-tabs" role="tablist" aria-label="Guravva profile and card settings">
          <button
            className="profile-tab"
            id="guravva-profile-tab"
            type="button"
            role="tab"
            aria-selected={tab === "profile"}
            aria-controls="guravva-profile-panel"
            tabIndex={tab === "profile" ? 0 : -1}
            onClick={() => selectTab("profile")}
            onKeyDown={handleTabKeyDown}
          >
            <ProfileIcon name="user" /> {tabCopy.profile || "Profile"}
          </button>
          <button
            className="profile-tab"
            id="guravva-cards-tab"
            type="button"
            role="tab"
            aria-selected={tab === "cards"}
            aria-controls="guravva-card-studio"
            tabIndex={tab === "cards" ? 0 : -1}
            onClick={() => selectTab("cards")}
            onKeyDown={handleTabKeyDown}
          >
            <ProfileIcon name="sliders" /> {tabCopy.cards || "Card studio"}
          </button>
        </div>
      </div>

      <div className="profile-panel" id="guravva-profile-panel" role="tabpanel" aria-labelledby="guravva-profile-tab" hidden={tab !== "profile"}>
        {!editing ? (
          <>
            <dl className="profile-details">
              {profileRows.map(({ field, value, href }) => (
                <div key={field}>
                  <dt>{copy.labels[field]}</dt>
                  <dd>{href ? <a href={href} aria-label={copy.labels[field]} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{value || copy.placeholders[field]}</a> : value || copy.placeholders[field]}</dd>
                </div>
              ))}
              {profile.links.map(({ label, url }, index) => (
                <div key={`${label}-${index}`}>
                  <dt>{label}</dt>
                  <dd><a href={externalProfileUrl(url)} aria-label={label} title={url} target="_blank" rel="noreferrer">{label}</a></dd>
                </div>
              ))}
            </dl>
            {profile.links.length === 0 && <p className="profile-empty-links">{copy.noLinks}</p>}
          </>
        ) : (
          <form className="profile-form" onSubmit={saveProfile} noValidate>
            <div className="profile-form-grid">
              {profileFields.map(({ field, type, ref }) => {
                const id = `profile-${field}`;
                return (
                  <div className="profile-field" key={field}>
                    <label htmlFor={id}>{copy.formLabels[field]}</label>
                    <input
                      ref={ref}
                      id={id}
                      name={field}
                      type={type}
                      value={draft[field]}
                      readOnly={field === "email"}
                      onChange={(event) => updateField(field, event.target.value)}
                      aria-invalid={Boolean(errors[field])}
                      aria-describedby={errors[field] ? `${id}-error` : undefined}
                      autoComplete="off"
                    />
                    {errors[field] && <span className="profile-field-error" id={`${id}-error`}>{errors[field]}</span>}
                  </div>
                );
              })}
            </div>
            <fieldset className="profile-custom-links">
              <legend>{copy.customLinks}</legend>
              {draft.links.map((link, index) => (
                <div className="profile-custom-link-row" key={index}>
                  <div className="profile-field">
                    <label htmlFor={`custom-link-label-${index}`}>{copy.linkLabel}</label>
                    <input id={`custom-link-label-${index}`} value={link.label} onChange={(event) => updateLink(index, "label", event.target.value)} />
                  </div>
                  <div className="profile-field">
                    <label htmlFor={`custom-link-url-${index}`}>{copy.linkUrl}</label>
                    <input id={`custom-link-url-${index}`} type="text" value={link.url} onChange={(event) => updateLink(index, "url", event.target.value)} aria-invalid={Boolean(errors[`link-${index}`])} aria-describedby={errors[`link-${index}`] ? `custom-link-error-${index}` : undefined} />
                  </div>
                  <button className="profile-remove-link" type="button" aria-label={copy.removeLink.replace("{number}", String(index + 1))} onClick={() => removeLink(index)}>
                    <ProfileIcon name="remove" />
                  </button>
                  {errors[`link-${index}`] && <span className="profile-field-error profile-link-error" id={`custom-link-error-${index}`}>{errors[`link-${index}`]}</span>}
                </div>
              ))}
              {draft.links.length === 0 && <p className="profile-empty-links">{copy.emptyLinks}</p>}
              <button className="profile-add-link" type="button" onClick={addLink}><ProfileIcon name="plus" /> {copy.addLink}</button>
            </fieldset>
            <div className="profile-form-actions">
              <button className="profile-save-button" type="submit"><ProfileIcon name="save" /> {copy.save}</button>
              <button className="profile-cancel-button" type="button" onClick={cancelEditing}>{copy.cancel}</button>
            </div>
          </form>
        )}
      </div>

      <div className="profile-panel profile-panel-studio" id="guravva-card-studio" role="tabpanel" aria-labelledby="guravva-cards-tab" hidden={tab !== "cards"}>
        <CardStudio
          settings={cardUISettings}
          onApply={(cardUI, loader) => {
            onCardUIChange(cardUI);
            onLoaderChange(loader);
          }}
          themeMode={themeMode}
          previewProject={previewProject}
          previewProjects={previewProjects}
          previewCertificates={previewCertificates}
          copy={studioCopy}
          loaderSettings={loaderSettings}
          layoutSettings={layoutSettings}
          onLayoutApply={onLayoutChange}
          effectsSettings={effectsSettings}
          onEffectsApply={onEffectsChange}
          motionSettings={motionSettings}
          onMotionApply={onMotionChange}
          shelfCollections={shelfCollections}
          shelfProjects={shelfProjects}
        />
      </div>

      <p className="profile-status" id="profile-status" aria-live="polite">{feedback}</p>
    </section>
  );
}

function SiteFooter({ site, onNavigate }) {
  const copy = site.home.footer;
  const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="portfolio-footer">
      <div className="container site-footer-inner">
        <a className="footer-brand" href="/" onClick={(event) => onNavigate(event, "/")}>{site.brand.prefix}<span className="brand-dot">{site.brand.separator}</span>{site.brand.suffix}</a>
        <p className="site-footer-note">{copy.note}</p>
        <button type="button" className="back-to-top" onClick={scrollToTop}>{copy.backToTop}</button>
      </div>
    </footer>
  );
}

function SiteNav({
  activeNav = "",
  isDetail = false,
  onNavigate,
  themeMode,
  onCycleTheme,
  site,
  profile,
  cardUISettings,
  onCardUIChange,
  previewProject,
  previewProjects,
  previewCertificates,
  loaderSettings,
  onLoaderChange,
  layoutSettings,
  onLayoutChange,
  effectsSettings,
  onEffectsChange,
  motionSettings,
  onMotionChange,
  shelfCollections,
  shelfProjects,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const profileTriggerRef = useRef(null);
  const copy = site.navigation;
  const profileCopy = site.profile;
  const nextTheme = themeMode === "dark" ? "light" : "dark";
  const home = (event) => onNavigate(event, "/");
  const certificatesHref = "/certificates";
  const projectsHref = "/projects";
  const closeProfile = () => {
    setProfileOpen(false);
    profileTriggerRef.current?.focus();
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!profileOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape" || document.querySelector("[data-card-preview-dialog]")) return;
      if (document.documentElement.hasAttribute("data-studio-select-open")) return;
      setProfileOpen(false);
      profileTriggerRef.current?.focus();
    };
    const closeOnOutsideClick = (event) => {
      if (document.querySelector("[data-card-preview-dialog]")) return;
      if (event.target?.closest?.("[data-studio-select-menu]")) return;
      if (navRef.current && !navRef.current.contains(event.target)) setProfileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, [profileOpen]);

  return (
    <nav className={`navbar portfolio-nav${scrolled ? " is-scrolled" : ""}`} aria-label="Primary">
      <div className="container portfolio-nav-inner" ref={navRef}>
        <div className="portfolio-brand">
          <button
            className="brand-mark"
            ref={profileTriggerRef}
            type="button"
            aria-label={copy.profileAria}
            aria-expanded={profileOpen}
            aria-controls={profileOpen ? "guravva-profile" : undefined}
            title={copy.profileAria}
            onClick={() => setProfileOpen((open) => !open)}
          >
            <span aria-hidden="true">{copy.profileInitial}</span>
          </button>
          <a className="portfolio-brand-link" href="/" onClick={home}>{site.brand.prefix}<span className="brand-dot">{site.brand.separator}</span>{site.brand.suffix}</a>
          {profileOpen && (
            <GuravvaProfilePopover
              onClose={closeProfile}
              copy={profileCopy}
              defaultProfile={profile}
              cardUISettings={cardUISettings}
              onCardUIChange={onCardUIChange}
              themeMode={themeMode}
              previewProject={previewProject}
              previewProjects={previewProjects}
              previewCertificates={previewCertificates}
              loaderSettings={loaderSettings}
              onLoaderChange={onLoaderChange}
              layoutSettings={layoutSettings}
              onLayoutChange={onLayoutChange}
              effectsSettings={effectsSettings}
              onEffectsChange={onEffectsChange}
              motionSettings={motionSettings}
              onMotionChange={onMotionChange}
              shelfCollections={shelfCollections}
              shelfProjects={shelfProjects}
            />
          )}
        </div>
        <div className="nav-controls">
          <div className="navbar-text-controls">
            <a
              className={`nav-link portfolio-nav-link navbar-text-control${activeNav === "certificates" ? " is-active" : ""}`}
              href={certificatesHref}
              onClick={(event) => onNavigate(event, certificatesHref)}
              title={copy.certificateTitle}
              aria-label={copy.certificateAria}
              aria-current={activeNav === "certificates" ? "page" : undefined}
            >
              <span className="portfolio-nav-link-icon" aria-hidden="true"><NavIcon name="certificate" /></span>
              <span className="portfolio-nav-link-label">{copy.certificateLabel}</span>
            </a>
            <a
              className={`nav-link portfolio-nav-link navbar-text-control${activeNav === "projects" ? " is-active" : ""}`}
              href={projectsHref}
              onClick={(event) => onNavigate(event, projectsHref)}
              aria-label={copy.projectsAria}
              title={copy.projectsAria}
              aria-current={activeNav === "projects" ? "page" : undefined}
            >
              <span className="portfolio-nav-link-icon" aria-hidden="true"><NavIcon name="projects" /></span>
              <span className="portfolio-nav-link-label">{copy.projectsLabel}</span>
            </a>
          </div>
          {!isDetail && profile.email && (
            <a className="btn btn-dark rounded-pill nav-contact" href={`mailto:${profile.email}`} aria-label={copy.contactLabel} title={copy.contactLabel}>
              <span className="nav-contact-label">{copy.contactLabel}</span>
              <span className="nav-contact-icon" aria-hidden="true">
                <span className="nav-contact-icon-arrow"><NavIcon name="arrow" /></span>
                <span className="nav-contact-icon-mail"><NavIcon name="mail" /></span>
              </span>
            </a>
          )}
          <button
            type="button"
            className="theme-toggle btn theme-toggle-icon"
            onClick={onCycleTheme}
            aria-label={copy.switchTheme.replace("{theme}", copy.themeNames[nextTheme])}
            aria-pressed={themeMode === "dark"}
            title={copy.switchTheme.replace("{theme}", copy.themeNames[nextTheme])}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <span className="theme-toggle-glyph theme-toggle-glyph-sun"><NavIcon name="sun" /></span>
              <span className="theme-toggle-glyph theme-toggle-glyph-moon"><NavIcon name="moon" /></span>
              <span className="theme-toggle-thumb" />
            </span>
            <span className="visually-hidden">{copy.modeLabels[themeMode]}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const HOME_COLLECTION_ORDER = ["python", "responsive", "static"];

function PortfolioHome({
  catalog,
  site,
  profile,
  onNavigate,
  themeMode,
  onCycleTheme,
  settings,
  onCardUIChange,
  onLoaderChange,
  onLayoutChange,
  onEffectsChange,
  onMotionChange,
}) {
  const copy = site.home;
  const collections = useMemo(
    () => HOME_COLLECTION_ORDER
      .map((id) => catalog.collections.find((collection) => collection.id === id))
      .filter(Boolean),
    [catalog.collections],
  );
  const projectsByCollection = useMemo(() => {
    const sorted = [...catalog.projects].sort((left, right) => left.sortOrder - right.sortOrder);
    return HOME_COLLECTION_ORDER.reduce((groups, id) => {
      groups[id] = sorted.filter((project) => project.collection === id);
      return groups;
    }, {});
  }, [catalog.projects]);
  const featured = useMemo(() => [
    ...(projectsByCollection.python || []).slice(0, 1),
    ...(projectsByCollection.responsive || []).slice(0, 4),
    ...(projectsByCollection.static || []).slice(0, 4),
  ], [projectsByCollection]);
  const featuredLayout = CARD_LAYOUTS.includes(settings.cardUI?.cardLayout) ? settings.cardUI.cardLayout : "grid";
  const featuredGridClass = ["rail", "depth"].includes(featuredLayout)
    ? ` is-card-rail is-card-${featuredLayout}`
    : featuredLayout !== "grid"
      ? ` is-card-${featuredLayout}`
      : "";
  const certificates = catalog.certificates || [];
  const previewProject = catalog.projects.find((project) => project.thumbnail || project.image) || catalog.projects[0] || null;
  const previewProjects = useMemo(() => [...catalog.projects]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .filter((project) => project.thumbnail || project.image)
    .slice(0, 6), [catalog.projects]);
  const navigate = (event, destination) => onNavigate(event, destination);

  return (
    <div className={`portfolio-home theme-${themeMode === "dark" ? "dark" : "light"}`} id="top">
      <SiteNav
        site={site}
        profile={profile}
        onNavigate={navigate}
        themeMode={themeMode}
        onCycleTheme={onCycleTheme}
        cardUISettings={settings.cardUI}
        onCardUIChange={onCardUIChange}
        previewProject={previewProject}
        previewProjects={previewProjects}
        previewCertificates={certificates}
        loaderSettings={settings.loader}
        onLoaderChange={onLoaderChange}
        layoutSettings={settings.layout}
        onLayoutChange={onLayoutChange}
        effectsSettings={settings.effects}
        onEffectsChange={onEffectsChange}
        motionSettings={settings.motion}
        onMotionChange={onMotionChange}
        shelfCollections={catalog.collections}
        shelfProjects={catalog.projects}
      />
      <main>
        <section className="home-hero">
          <div className="container">
            <div className="home-hero-grid">
              <div className="home-hero-copy">
                <p className="eyebrow hero-eyebrow"><span className="availability-dot" /> {copy.hero.eyebrow}</p>
                <h1 className="hero-title home-hero-title">{copy.hero.title}<br /><span className="hero-title-accent">{copy.hero.titleAccent}</span></h1>
                <p className="hero-description home-hero-description">{copy.hero.description}</p>
                <div className="home-hero-actions">
                  <a className="btn btn-dark rounded-pill hero-cta" href="/projects" onClick={(event) => navigate(event, "/projects")}>
                    {copy.hero.action} <span className="hero-cta-icon" aria-hidden="true">→</span>
                  </a>
                  <a className="home-hero-secondary" href="/certificates" onClick={(event) => navigate(event, "/certificates")}>
                    {copy.hero.secondaryAction} <span aria-hidden="true">→</span>
                  </a>
                </div>
                <dl className="home-hero-stats" aria-label="Portfolio totals">
                  <div><dt>{copy.hero.stats.builds}</dt><dd>{catalog.counts.projects}</dd></div>
                  <div><dt>{copy.hero.stats.collections}</dt><dd>{collections.length}</dd></div>
                  <div><dt>{copy.hero.stats.certificates}</dt><dd>{catalog.counts.certificates}</dd></div>
                </dl>
              </div>
              <div className="home-hero-visual">
                <span className="home-hero-orbit is-one" aria-hidden="true" />
                <span className="home-hero-orbit is-two" aria-hidden="true" />
                <div className="home-shelf-panel">
                  <header className="home-shelf-panel-head">
                    <span>{copy.hero.kicker}</span>
                    <span>{String(catalog.counts.projects).padStart(2, "0")} builds</span>
                  </header>
                  <div className="home-shelf-list">
                    {collections.map((collection, index) => (
                      <a
                        key={collection.id}
                        className={`home-shelf-row is-${collection.id}`}
                        href={`/projects?collection=${collection.id}`}
                        onClick={(event) => navigate(event, `/projects?collection=${collection.id}`)}
                      >
                        <span className="home-shelf-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <span className="home-shelf-name">
                          <strong>{collection.label}</strong>
                          <small>{collection.description}</small>
                        </span>
                        <span className="home-shelf-count">{String(collection.count).padStart(2, "0")}</span>
                        <span className="home-shelf-arrow" aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                  <footer className="home-shelf-panel-foot">
                    <span>{copy.hero.caption}</span>
                    <span>{copy.hero.footnote}</span>
                  </footer>
                </div>
                <span className="home-hero-seal" aria-hidden="true">{String(catalog.counts.projects).padStart(2, "0")}<small>builds</small></span>
              </div>
            </div>
          </div>
        </section>

        <section className="home-collections-section" id="collections">
          <div className="container">
            <header className="home-section-heading">
              <div>
                <p className="eyebrow">{copy.collections.eyebrow}</p>
                <h2 className="section-title">{copy.collections.title}</h2>
              </div>
              <p className="section-note">{copy.collections.note}</p>
            </header>
            <div className="home-collection-grid">
              {collections.map((collection, index) => (
                <GlassFolderCard
                  key={collection.id}
                  collection={collection}
                  projects={projectsByCollection[collection.id] || []}
                  index={index}
                  copy={copy.collections}
                  onNavigate={navigate}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="home-featured-section" id="featured">
          <div className="container">
            <header className="home-section-heading">
              <div>
                <p className="eyebrow">{copy.projects.eyebrow.replace("{count}", String(featured.length).padStart(2, "0"))}</p>
                <h2 className="section-title">{copy.projects.title}</h2>
              </div>
              <p className="section-note">{copy.projects.note}</p>
            </header>
            <div className={`lab-project-grid lab-home-grid${featuredGridClass}`}>
              {featured.map((project) => <ProjectCard key={project.id} project={project} onNavigate={navigate} cardUI={settings.cardUI} fx={settings.effects} />)}
            </div>
            <div className="home-featured-action">
              <a className="lab-button lab-button-secondary" href="/projects" onClick={(event) => navigate(event, "/projects")}>
                {copy.projects.action.replace("{count}", String(catalog.counts.projects))} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="home-certificates-section" id="certificates">
          <div className="container">
            <header className="home-section-heading">
              <div>
                <p className="eyebrow">{copy.certificates.eyebrow}</p>
                <h2 className="section-title">{copy.certificates.title}</h2>
              </div>
              <p className="section-note">{copy.certificates.note}</p>
            </header>
            <div className="lab-certificate-grid lab-home-certificate-grid">
              {certificates.map((certificate, index) => (
                <CertificateCard key={certificate.slug} certificate={certificate} copy={site.certificatesPage} index={index} onNavigate={navigate} fx={settings.effects} />
              ))}
            </div>
            <div className="home-featured-action">
              <a className="lab-button lab-button-secondary" href="/certificates" onClick={(event) => navigate(event, "/certificates")}>
                {copy.certificates.action} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter site={site} onNavigate={navigate} />
    </div>
  );
}

const HOME_TITLE = "Practice.folio — Python, static & responsive builds";

function decodeRouteSegment(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function AppGate({ error, onRetry, loader }) {
  return (
    <main className="portfolio-data-state" role={error ? "alert" : undefined} aria-busy={error ? undefined : "true"}>
      <div className={`app-gate${error ? " is-error" : ""}`}>
        {error
          ? <span className="app-gate-mark is-error" aria-hidden="true">!</span>
          : <LoadSpinner settings={loader} label="Loading the project catalog" size="lg" />}
        {error && <p>{error}</p>}
        {error && <button type="button" className="lab-button lab-button-primary" onClick={onRetry}>Retry</button>}
      </div>
    </main>
  );
}

function MissingPage({
  site,
  title,
  description,
  backHref = "/projects",
  backLabel = site.detail.backToCatalog,
  primaryHref = "/projects",
  primaryLabel = "Browse all projects",
  secondaryHref = "/",
  secondaryLabel = "Go home",
  onNavigate,
}) {
  return (
    <main className="lab-main">
      <section className="lab-hero">
        <div className="lab-workspace-wide">
          <a className="lab-back-link" href={backHref} onClick={(event) => onNavigate(event, backHref)}>
            <span aria-hidden="true">←</span> {backLabel}
          </a>
          <p className="lab-eyebrow">404</p>
          <h1>{title}</h1>
          <p className="lab-hero-summary">{description}</p>
          <div className="lab-hero-actions">
            <a className="lab-button lab-button-primary" href={primaryHref} onClick={(event) => onNavigate(event, primaryHref)}>{primaryLabel}</a>
            <a className="lab-button lab-button-secondary" href={secondaryHref} onClick={(event) => onNavigate(event, secondaryHref)}>{secondaryLabel}</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  const { catalog, error, isLoading, isStale, retry } = useCatalog();
  const {
    settings,
    updateSettings,
    updateCardUISettings,
    updateLoaderSettings,
    updateLayoutSettings,
    updateCardEffectsSettings,
    updateShelfMotionSettings,
  } = useTheme();
  const [route, setRoute] = useState(() => `${window.location.pathname}${window.location.search}`);
  const pendingScrollRestoreRef = useRef(null);

  const pathname = route.split(/[?#]/, 1)[0];
  const normalizedPath = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  const routeSearch = route.slice(pathname.length);
  const projectMatch = normalizedPath.match(/^\/projects\/([^/]+)(?:\/(?:playground|preview))?$/);
  const certificateMatch = normalizedPath.match(/^\/certificates\/([^/]+)$/);
  const projectId = projectMatch ? decodeRouteSegment(projectMatch[1]) : "";
  const certificateSlug = certificateMatch ? decodeRouteSegment(certificateMatch[1]) : "";
  const projects = catalog?.projects || [];
  const projectSummary = projectId ? projects.find((project) => project.id === projectId) || null : null;
  const certificate = certificateSlug ? (catalog?.certificates || []).find((item) => item.slug === certificateSlug) || null : null;
  const { detail, error: detailError, isLoading: detailLoading, retry: retryDetail } = useProjectDetail(projectSummary?.id || null);
  const isHome = normalizedPath === "/";
  const isCatalog = normalizedPath === "/projects";
  const isCertificates = normalizedPath === "/certificates";
  const isProjectRoute = Boolean(projectMatch);
  const isCertificateRoute = Boolean(certificateMatch);
  const site = catalog?.site;
  const defaultProfile = site?.profile?.defaultValues || {};

  useEffect(() => {
    const handlePopState = (event) => {
      const nextRoute = `${window.location.pathname}${window.location.search}`;
      pendingScrollRestoreRef.current = { route: nextRoute, scrollY: Number(event.state?.appScrollY) || 0 };
      setRoute(nextRoute);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const pendingRestore = pendingScrollRestoreRef.current;
    const scrollY = pendingRestore?.route === route ? pendingRestore.scrollY : 0;
    pendingScrollRestoreRef.current = null;
    window.scrollTo(0, scrollY);
  }, [route]);

  useEffect(() => {
    document.documentElement.style.colorScheme = settings.mode === "dark" ? "dark" : "light";
  }, [settings.mode]);

  useEffect(() => {
    if (!site?.imageFallback) return undefined;
    return attachImageFallbacks(site.imageFallback);
  }, [site?.imageFallback]);

  // Warm the code-split route chunks after the first load so navigating still feels instant
  // without paying for them in the initial bundle. Skipped when the user is saving data.
  useEffect(() => {
    if (navigator.connection?.saveData) return undefined;
    let idleId = 0;
    let timeoutId = 0;
    const prefetchRoutes = () => {
      Promise.allSettled([
        import("./components/ProjectsCatalog"),
        import("./components/ProjectDetail"),
        import("./components/CertificatesIndex"),
        import("./components/CertificateShowcase"),
      ]);
    };
    const schedule = () => {
      if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(prefetchRoutes, { timeout: 3000 });
      else timeoutId = window.setTimeout(prefetchRoutes, 1200);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (isHome) document.title = HOME_TITLE;
    else if (isCatalog) document.title = "Projects · Practice.folio";
    else if (isCertificates) document.title = "Certificates · Practice.folio";
    else if (certificate) document.title = `${certificate.courseTitle} · Certificate · Practice.folio`;
    else if (projectSummary) document.title = `${projectSummary.title} · Practice.folio`;
    else if (isCertificateRoute) document.title = "Certificate not found · Practice.folio";
    else if (isProjectRoute) document.title = "Project not found · Practice.folio";
    else document.title = "Page not found · Practice.folio";
  }, [isHome, isCatalog, isCertificates, isCertificateRoute, isProjectRoute, certificate, projectSummary]);

  const goBackTo = (event, fallback) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)) return;
    const previousRoute = window.history.state?.appRoutePreviousPath;
    if (event && previousRoute && (previousRoute === fallback || previousRoute.startsWith(`${fallback}?`))) {
      event.preventDefault();
      window.history.back();
      return;
    }
    navigate(event, fallback);
  };

  const navigate = (event, destination) => {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0)) return;
    if (event) event.preventDefault();
    let destinationUrl;
    try {
      destinationUrl = new URL(destination, window.location.href);
    } catch {
      return;
    }
    if (destinationUrl.origin !== window.location.origin) return;
    const currentRoute = `${window.location.pathname}${window.location.search}`;
    const nextRoute = `${destinationUrl.pathname}${destinationUrl.search}`;
    if (`${currentRoute}${window.location.hash}` !== `${nextRoute}${destinationUrl.hash}`) {
      const updateRoute = () => {
        flushSync(() => {
          const currentState = window.history.state && typeof window.history.state === "object" ? window.history.state : {};
          window.history.replaceState({ ...currentState, appRoute: true, appScrollY: window.scrollY }, "", window.location.href);
          window.history.pushState({ appRoute: true, appRoutePreviousPath: currentRoute, appScrollY: 0 }, "", destinationUrl.href);
          pendingScrollRestoreRef.current = null;
          setRoute(nextRoute);
        });
      };
      if (document.startViewTransition) document.startViewTransition(updateRoute);
      else updateRoute();
    }
  };

  if (!catalog || !site) {
    return <AppGate error={catalog ? "" : error} onRetry={retry} loader={settings.loader} />;
  }

  const sortedProjects = [...projects].sort((left, right) => left.sortOrder - right.sortOrder);
  const projectIndex = projectSummary ? sortedProjects.findIndex((project) => project.id === projectSummary.id) : -1;
  const previousProject = projectIndex > 0 ? sortedProjects[projectIndex - 1] : null;
  const nextProject = projectIndex >= 0 && projectIndex < sortedProjects.length - 1 ? sortedProjects[projectIndex + 1] : null;
  const nextTheme = settings.mode === "dark" ? "light" : "dark";
  const cardPreviewProject = projects.find((project) => project.thumbnail || project.image) || projects[0] || null;
  const cardPreviewProjects = sortedProjects
    .filter((project) => project.thumbnail || project.image)
    .slice(0, 6);
  const navProps = {
    site,
    profile: defaultProfile,
    onNavigate: navigate,
    themeMode: settings.mode,
    onCycleTheme: () => updateSettings({ mode: nextTheme }),
    cardUISettings: settings.cardUI,
    onCardUIChange: updateCardUISettings,
    previewProject: cardPreviewProject,
    previewProjects: cardPreviewProjects,
    loaderSettings: settings.loader,
    onLoaderChange: updateLoaderSettings,
    layoutSettings: settings.layout,
    onLayoutChange: updateLayoutSettings,
    effectsSettings: settings.effects,
    onEffectsChange: updateCardEffectsSettings,
    motionSettings: settings.motion,
    onMotionChange: updateShelfMotionSettings,
    shelfCollections: catalog.collections,
    shelfProjects: catalog.projects,
    previewCertificates: catalog.certificates,
  };
  const pageClass = `project-detail-page lab-page theme-${settings.mode === "dark" ? "dark" : "light"}`;
  const viewError = error ? (
    <div className="portfolio-data-warning" role="status" data-stale={String(isStale)}>
      <span>{error}</span>
      <button type="button" onClick={retry}>{site.status.retry}</button>
    </div>
  ) : null;

  let page;
  if (isHome) {
    page = (
      <PortfolioHome
        catalog={catalog}
        site={site}
        profile={defaultProfile}
        onNavigate={navigate}
        themeMode={settings.mode}
        onCycleTheme={() => updateSettings({ mode: nextTheme })}
        settings={settings}
        onCardUIChange={updateCardUISettings}
        onLoaderChange={updateLoaderSettings}
        onLayoutChange={updateLayoutSettings}
        onEffectsChange={updateCardEffectsSettings}
        onMotionChange={updateShelfMotionSettings}
      />
    );
  } else if (isCatalog) {
    page = (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="projects" />
        <Suspense fallback={<RouteFallback loader={settings.loader} />}>
          <ProjectsCatalog catalog={catalog} routeSearch={routeSearch} onNavigate={navigate} copy={site.catalog} cardUI={settings.cardUI} cardEffects={settings.effects} shelfMotion={settings.motion} />
        </Suspense>
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    );
  } else if (isCertificates) {
    page = (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="certificates" />
        <Suspense fallback={<RouteFallback loader={settings.loader} />}>
          <CertificatesIndex certificates={catalog.certificates} copy={site.certificatesPage} onNavigate={navigate} cardEffects={settings.effects} />
        </Suspense>
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    );
  } else if (isCertificateRoute) {
    page = certificate ? (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="certificates" isDetail />
        <Suspense fallback={<RouteFallback loader={settings.loader} />}>
          <CertificateShowcase data={certificate} copy={site.certificate} onBack={(event) => goBackTo(event, "/certificates")} />
        </Suspense>
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    ) : (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="certificates" isDetail />
        <MissingPage
          site={site}
          title="Certificate not found"
          description="This certificate is not in the local records. Browse the certificate shelf instead."
          backHref="/certificates"
          backLabel={site.certificate.back}
          onNavigate={navigate}
        />
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    );
  } else if (isProjectRoute) {
    page = projectSummary ? (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="projects" isDetail />
        <Suspense fallback={<RouteFallback loader={settings.loader} />}>
          <ProjectDetail
            project={projectSummary}
            detail={detail}
            devices={catalog.devices}
            isLoading={detailLoading}
            error={detailError}
            onRetry={retryDetail}
            onNavigate={navigate}
            onBack={(event) => goBackTo(event, "/projects")}
            previousProject={previousProject}
            nextProject={nextProject}
            copy={site.detail}
            loader={settings.loader}
          />
        </Suspense>
        {!detailLoading && <SiteFooter site={site} onNavigate={navigate} />}
      </div>
    ) : (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} activeNav="projects" isDetail />
        <MissingPage site={site} title={site.detail.notFoundTitle} description={site.detail.notFoundDescription} onNavigate={navigate} />
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    );
  } else {
    page = (
      <div className={pageClass} id="top">
        <SiteNav {...navProps} isDetail />
        <MissingPage
          site={site}
          title="Page not found"
          description="This page is not part of the portfolio. Browse the catalog to find every supplied build."
          backHref="/"
          backLabel="Back home"
          primaryHref="/projects"
          primaryLabel="Browse all projects"
          secondaryHref="/certificates"
          secondaryLabel="Browse certificates"
          onNavigate={navigate}
        />
        <SiteFooter site={site} onNavigate={navigate} />
      </div>
    );
  }

  return <>{viewError}{isLoading && !projects.length ? <AppGate loader={settings.loader} /> : page}</>;
}

export default App;
