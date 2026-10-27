import { useEffect, useRef, useState } from "react";
import { applyCardStyleVariables, CARD_LAYOUTS } from "../utils/cardStyle";
import { DEFAULT_CARD_EFFECTS, normalizeCardEffects } from "../config/cardEffects";
import { DEFAULT_SHELF_MOTION, normalizeShelfMotion } from "../config/cardMotion";
import { DEFAULT_LAYOUT_SETTINGS, LAYOUT_AREAS, normalizeLayoutSettings } from "../config/layoutPatterns";

export const THEME_STORAGE_KEY = "portfolio-theme-settings";
export const THEME_MODES = ["dark", "light"];

export const LOADER_STYLES = ["ring", "dots", "bar"];
export const LOADER_SPEEDS = ["calm", "normal", "fast"];

export const DEFAULT_LOADER_SETTINGS = {
  enabled: true,
  style: "ring",
  speed: "normal",
  labels: true,
};

export function normalizeLoaderSettings(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  return {
    enabled: typeof source.enabled === "boolean" ? source.enabled : DEFAULT_LOADER_SETTINGS.enabled,
    style: LOADER_STYLES.includes(source.style) ? source.style : DEFAULT_LOADER_SETTINGS.style,
    speed: LOADER_SPEEDS.includes(source.speed) ? source.speed : DEFAULT_LOADER_SETTINGS.speed,
    labels: typeof source.labels === "boolean" ? source.labels : DEFAULT_LOADER_SETTINGS.labels,
  };
}

export const DEFAULT_CARD_UI_SETTINGS = {
  imageFit: "contain",
  cardLayout: "grid",
  radius: 20,
  topLeftRadius: 20,
  topRightRadius: 20,
  bottomRightRadius: 20,
  bottomLeftRadius: 20,
  borderTopWidth: 1,
  borderRightWidth: 1,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderTopColor: "theme",
  borderRightColor: "theme",
  borderBottomColor: "theme",
  borderLeftColor: "theme",
  backgroundColor: "theme",
  borderColor: "theme",
  maxWidth: 520,
  minHeight: 0,
  mobileImageHeight: 150,
  tabletImageHeight: 175,
  desktopImageHeight: 190,
  fontFamily: "theme",
  fontSize: 16,
  fontWeight: 600,
  textColor: "theme",
  hoverScale: 1.02,
  hoverHighlight: "subtle",
  shadowDepth: "raised",
  cardGap: "cozy",
  tiltIntensity: 7,
  transitionDuration: 250,
  transitionEasing: "smooth",
  entranceIntensity: "none",
  scrollReveal: false,
  pressFeedback: true,
  deviceSwitchTransition: true,
};

const CARD_COLOR_RE = /^#[\da-f]{6}$/i;
const CARD_FONT_FAMILIES = ["theme", "system", "arial", "georgia", "monospace"];
const CARD_HIGHLIGHTS = ["none", "subtle", "medium"];
const CARD_EASINGS = ["smooth", "standard"];
const CARD_ENTRANCE_INTENSITIES = ["none", "subtle", "medium"];
const CARD_IMAGE_FITS = ["contain", "cover"];
const CARD_SHADOW_DEPTHS = ["none", "soft", "raised", "floating"];
const CARD_GAPS = ["compact", "cozy", "spacious"];
const CARD_NUMBER_RANGES = {
  radius: [0, 40],
  topLeftRadius: [0, 40],
  topRightRadius: [0, 40],
  bottomRightRadius: [0, 40],
  bottomLeftRadius: [0, 40],
  borderTopWidth: [0, 8],
  borderRightWidth: [0, 8],
  borderBottomWidth: [0, 8],
  borderLeftWidth: [0, 8],
  maxWidth: [240, 520],
  minHeight: [0, 600],
  fontSize: [12, 24],
  fontWeight: [300, 800],
  hoverScale: [1, 1.04],
  tiltIntensity: [0, 14],
  transitionDuration: [0, 600],
};
const CARD_IMAGE_HEIGHT_RANGES = {
  mobileImageHeight: [120, 240],
  tabletImageHeight: [140, 280],
  desktopImageHeight: [160, 320],
};

export function normalizeCardUISettings(value = {}) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = { ...DEFAULT_CARD_UI_SETTINGS };

  Object.entries(CARD_NUMBER_RANGES).forEach(([key, [min, max]]) => {
    const number = Number(source[key]);
    if (Number.isFinite(number)) normalized[key] = Math.min(max, Math.max(min, number));
  });
  Object.entries(CARD_IMAGE_HEIGHT_RANGES).forEach(([key, [min, max]]) => {
    const number = source[key];
    if (typeof number === "number" && Number.isFinite(number) && number >= min && number <= max) {
      normalized[key] = number;
    }
  });

  ["borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor"].forEach((key) => {
    if (source[key] === "theme" || (typeof source[key] === "string" && CARD_COLOR_RE.test(source[key]))) {
      normalized[key] = source[key] === "theme" ? "theme" : source[key].toLowerCase();
    }
  });
  ["backgroundColor", "borderColor", "textColor"].forEach((key) => {
    if (source[key] === "theme" || (typeof source[key] === "string" && CARD_COLOR_RE.test(source[key]))) {
      normalized[key] = source[key] === "theme" ? "theme" : source[key].toLowerCase();
    }
  });

  if (CARD_FONT_FAMILIES.includes(source.fontFamily)) normalized.fontFamily = source.fontFamily;
  if (CARD_HIGHLIGHTS.includes(source.hoverHighlight)) normalized.hoverHighlight = source.hoverHighlight;
  if (CARD_EASINGS.includes(source.transitionEasing)) normalized.transitionEasing = source.transitionEasing;
  if (CARD_ENTRANCE_INTENSITIES.includes(source.entranceIntensity)) normalized.entranceIntensity = source.entranceIntensity;
  if (CARD_IMAGE_FITS.includes(source.imageFit)) normalized.imageFit = source.imageFit;
  if (CARD_LAYOUTS.includes(source.cardLayout)) normalized.cardLayout = source.cardLayout;
  if (CARD_SHADOW_DEPTHS.includes(source.shadowDepth)) normalized.shadowDepth = source.shadowDepth;
  if (CARD_GAPS.includes(source.cardGap)) normalized.cardGap = source.cardGap;
  ["scrollReveal", "pressFeedback", "deviceSwitchTransition"].forEach((key) => {
    if (typeof source[key] === "boolean") normalized[key] = source[key];
  });

  return normalized;
}

export const DEFAULT_THEME_SETTINGS = {
  mode: "light",
  primary: "#6d5ce8",
  secondary: "#0891b2",
  accent: "#db2777",
  background: "#f1f5fb",
  cardOpacity: 14,
  blur: 24,
  borderOpacity: 20,
  shadowIntensity: 25,
  radius: 24,
  animationIntensity: "smooth",
  hoverGlow: true,
  cursorSpotlight: true,
  cardTilt: true,
  animatedBlobs: true,
  reducedMotion: false,
  cardUI: DEFAULT_CARD_UI_SETTINGS,
  loader: DEFAULT_LOADER_SETTINGS,
  layout: DEFAULT_LAYOUT_SETTINGS,
  effects: DEFAULT_CARD_EFFECTS,
  motion: DEFAULT_SHELF_MOTION,
};

const themePresets = {
  dark: { primary: "#8b5cf6", secondary: "#22d3ee", accent: "#f472b6", background: "#070b14" },
  light: { primary: "#6d5ce8", secondary: "#0891b2", accent: "#db2777", background: "#f1f5fb" },
};

function normalizeMode(value) {
  return value === "dark" ? "dark" : "light";
}

function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex.match(/[\da-f]{2}/gi).map((channel) => parseInt(channel, 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return (linear[0] * 0.2126) + (linear[1] * 0.7152) + (linear[2] * 0.0722);
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function ensureCardTextContrast(cardUI, mode) {
  const themeBackground = mode === "dark" ? "#202822" : "#ffffff";
  const themeText = mode === "dark" ? "#eef2e8" : "#18231d";
  const background = cardUI.backgroundColor === "theme" ? themeBackground : cardUI.backgroundColor;
  const text = cardUI.textColor === "theme" ? themeText : cardUI.textColor;
  if (contrastRatio(text, background) >= 4.5) return cardUI;
  return { ...cardUI, backgroundColor: "theme", textColor: "theme" };
}

function getInitialSettings() {
  try {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const mode = normalizeMode(parsed?.mode);
      return {
        ...DEFAULT_THEME_SETTINGS,
        ...themePresets[mode],
        mode,
        cardUI: ensureCardTextContrast(normalizeCardUISettings(parsed?.cardUI), mode),
        loader: normalizeLoaderSettings(parsed?.loader),
        layout: normalizeLayoutSettings(parsed?.layout),
        effects: normalizeCardEffects(parsed?.effects),
        motion: normalizeShelfMotion(parsed?.motion),
      };
    }
    if (window.localStorage.getItem("portfolio-theme") === "dark") {
      return { ...DEFAULT_THEME_SETTINGS, ...themePresets.dark, mode: "dark" };
    }
  } catch (error) {
    try {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (storageError) {
      console.warn("Unable to clear saved theme settings.", storageError);
    }
    console.warn("Unable to load saved theme settings; using defaults.", error);
  }
  return DEFAULT_THEME_SETTINGS;
}

export function useTheme() {
  const [settings, setSettings] = useState(getInitialSettings);
  const apiSyncStarted = useRef(false);
  const userChangedSettings = useRef(false);

  useEffect(() => {
    let hasStoredSettings = false;
    try {
      hasStoredSettings = window.localStorage.getItem(THEME_STORAGE_KEY) !== null;
    } catch {
      hasStoredSettings = false;
    }
    const root = document.documentElement;
    const mode = normalizeMode(settings.mode);
    root.dataset.theme = mode;
    root.dataset.animation = settings.reducedMotion ? "none" : settings.animationIntensity;
    root.dataset.reducedMotion = String(settings.reducedMotion);
    root.dataset.animatedBlobs = String(settings.animatedBlobs);
    const loader = normalizeLoaderSettings(settings.loader);
    root.dataset.loaderEnabled = String(loader.enabled);
    root.dataset.loaderStyle = loader.style;
    root.dataset.loaderSpeed = loader.speed;
    root.dataset.loaderLabels = String(loader.labels);
    root.style.setProperty("--theme-primary", settings.primary);
    root.style.setProperty("--theme-secondary", settings.secondary);
    root.style.setProperty("--theme-accent", settings.accent);
    root.style.setProperty("--theme-background", settings.background);
    root.style.setProperty("--theme-card-opacity", `${settings.cardOpacity}%`);
    root.style.setProperty("--theme-blur", `${settings.blur}px`);
    root.style.setProperty("--theme-border-opacity", `${settings.borderOpacity}%`);
    root.style.setProperty("--theme-shadow-opacity", `${settings.shadowIntensity}%`);
    root.style.setProperty("--theme-radius", `${settings.radius}px`);
    root.style.setProperty("--theme-transition", "240ms ease");
    const cardUI = ensureCardTextContrast(normalizeCardUISettings(settings.cardUI), mode);
    applyCardStyleVariables(root, cardUI);
    const layout = normalizeLayoutSettings(settings.layout);
    LAYOUT_AREAS.forEach(({ id, attribute }) => {
      if (layout[id] === "default") delete root.dataset[attribute];
      else root.dataset[attribute] = layout[id];
    });
    const effects = normalizeCardEffects(settings.effects);
    root.dataset.cardFxEnabled = String(effects.enabled);
    root.dataset.cardFxIntensity = effects.intensity;
    const motion = normalizeShelfMotion(settings.motion);
    root.dataset.shelfMotion = motion.preset;

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ mode, cardUI, loader, layout, effects, motion }));
      window.localStorage.setItem("portfolio-theme", mode);
    } catch (error) {
      console.error("Unable to persist theme mode.", error);
    }

    if (import.meta.env.MODE === "vercel") return;
    if (import.meta.env.MODE === "test" && !globalThis.__ENABLE_LOCAL_API_TESTS__) return;

    const syncSettings = async (method, body) => {
      const response = await fetch("/api/settings", {
        method,
        headers: { "Content-Type": "application/json" },
        ...(body ? { body: JSON.stringify(body) } : {}),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error?.message || `Settings API returned HTTP ${response.status}.`);
      return result?.data;
    };

    const apiCardUI = { ...cardUI };
    delete apiCardUI.imageFit;
    delete apiCardUI.cardLayout;
    delete apiCardUI.shadowDepth;
    delete apiCardUI.cardGap;
    delete apiCardUI.tiltIntensity;

    const currentSettingsPatch = {
      theme: {
        mode,
        primary: settings.primary,
        secondary: settings.secondary,
        accent: settings.accent,
        background: settings.background,
        textColor: mode === "dark" ? "#f8fafc" : "#172033",
        mutedColor: mode === "dark" ? "#bac8da" : "#526176",
      },
      cardUI: apiCardUI,
      animation: {
        entranceIntensity: cardUI.entranceIntensity,
        scrollReveal: cardUI.scrollReveal,
        pressFeedback: cardUI.pressFeedback,
        deviceSwitchTransition: cardUI.deviceSwitchTransition,
        animationIntensity: settings.animationIntensity,
        reducedMotion: settings.reducedMotion,
      },
    };

    const patchCurrent = () => syncSettings("PATCH", currentSettingsPatch)
      .catch((error) => console.error("Unable to synchronize settings with the local API.", error));

    if (!apiSyncStarted.current) {
      apiSyncStarted.current = true;
      if (hasStoredSettings) {
        patchCurrent();
      } else {
        syncSettings("GET")
          .then((saved) => {
            if (!saved || userChangedSettings.current) return;
            const savedMode = normalizeMode(saved.theme?.mode);
            setSettings((current) => ({
              ...current,
              ...themePresets[savedMode],
              ...saved.theme,
              mode: savedMode,
              cardUI: ensureCardTextContrast(normalizeCardUISettings(saved.cardUI), savedMode),
              effects: current.effects,
              ...(saved.animation || {}),
            }));
          })
          .catch((error) => console.error("Unable to load settings from the local API.", error));
      }
      return;
    }
    const syncTimer = window.setTimeout(patchCurrent, 250);
    return () => window.clearTimeout(syncTimer);
  }, [settings]);

  const updateSettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => {
      if (!Object.prototype.hasOwnProperty.call(changes, "mode")) return { ...current, ...changes };
      const mode = normalizeMode(changes.mode);
      return {
        ...current,
        ...themePresets[mode],
        mode,
        cardUI: ensureCardTextContrast(normalizeCardUISettings(current.cardUI), mode),
      };
    });
  };
  const updateCardUISettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => ({
      ...current,
      cardUI: ensureCardTextContrast(normalizeCardUISettings({ ...current.cardUI, ...changes }), current.mode),
    }));
  };
  const resetCardUISettings = () => {
    userChangedSettings.current = true;
    setSettings((current) => ({ ...current, cardUI: DEFAULT_CARD_UI_SETTINGS }));
  };
  const updateLoaderSettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => ({
      ...current,
      loader: normalizeLoaderSettings({ ...normalizeLoaderSettings(current.loader), ...changes }),
    }));
  };
  const resetLoaderSettings = () => {
    userChangedSettings.current = true;
    setSettings((current) => ({ ...current, loader: DEFAULT_LOADER_SETTINGS }));
  };
  const updateLayoutSettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => ({
      ...current,
      layout: normalizeLayoutSettings({ ...normalizeLayoutSettings(current.layout), ...changes }),
    }));
  };
  const updateCardEffectsSettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => ({
      ...current,
      effects: normalizeCardEffects({ ...normalizeCardEffects(current.effects), ...changes }),
    }));
  };
  const updateShelfMotionSettings = (changes) => {
    userChangedSettings.current = true;
    setSettings((current) => ({
      ...current,
      motion: normalizeShelfMotion({ ...normalizeShelfMotion(current.motion), ...changes }),
    }));
  };

  return {
    settings,
    updateSettings,
    updateCardUISettings,
    resetCardUISettings,
    updateLoaderSettings,
    resetLoaderSettings,
    updateLayoutSettings,
    updateCardEffectsSettings,
    updateShelfMotionSettings,
  };
}
