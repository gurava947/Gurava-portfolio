import { DEFAULT_CARD_UI_SETTINGS } from "../hooks/useTheme";

const defaultSettings = () => ({ ...DEFAULT_CARD_UI_SETTINGS });

const roundedCorners = (radius) => ({
  radius,
  topLeftRadius: radius,
  topRightRadius: radius,
  bottomRightRadius: radius,
  bottomLeftRadius: radius,
});

export const CARD_STYLE_PRESETS = [
  {
    id: "studio",
    label: "Studio",
    note: "Balanced and clean",
    settings: defaultSettings(),
  },
  {
    id: "soft",
    label: "Soft",
    note: "Airy and rounded",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(30),
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      mobileImageHeight: 160,
      tabletImageHeight: 190,
      desktopImageHeight: 205,
      transitionDuration: 320,
    },
  },
  {
    id: "editorial",
    label: "Editorial",
    note: "Quiet magazine calm",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(4),
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 3,
      maxWidth: 460,
      fontFamily: "georgia",
      fontWeight: 400,
      hoverScale: 1.005,
      transitionDuration: 300,
      transitionEasing: "standard",
      mobileImageHeight: 170,
      tabletImageHeight: 195,
      desktopImageHeight: 215,
    },
  },
  {
    id: "bold",
    label: "Bold",
    note: "Graphic and high contrast",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(12),
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderBottomWidth: 2,
      borderLeftWidth: 2,
      fontSize: 17,
      fontWeight: 700,
      hoverScale: 1.03,
      hoverHighlight: "medium",
      transitionDuration: 180,
      transitionEasing: "standard",
      mobileImageHeight: 155,
      tabletImageHeight: 180,
      desktopImageHeight: 195,
    },
  },
  {
    id: "depth",
    label: "3D rail",
    note: "Side-scroll with depth",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(26),
      cardLayout: "depth",
      maxWidth: 420,
      hoverScale: 1.025,
      hoverHighlight: "medium",
      transitionDuration: 360,
      mobileImageHeight: 165,
      tabletImageHeight: 195,
      desktopImageHeight: 215,
      entranceIntensity: "subtle",
    },
  },
];

export const CARD_QUICK_CONTROLS = [
  {
    id: "corners",
    label: "Corners",
    options: [
      { value: "flat", label: "Flat", patch: roundedCorners(4) },
      { value: "soft", label: "Soft", patch: roundedCorners(20) },
      { value: "round", label: "Round", patch: roundedCorners(32) },
    ],
    getActive(settings) {
      if (settings.radius <= 8) return "flat";
      if (settings.radius >= 28) return "round";
      return "soft";
    },
  },
  {
    id: "width",
    label: "Width",
    options: [
      { value: "compact", label: "Compact", patch: { maxWidth: 380 } },
      { value: "balanced", label: "Balanced", patch: { maxWidth: 460 } },
      { value: "wide", label: "Wide", patch: { maxWidth: 520 } },
    ],
    getActive(settings) {
      if (settings.maxWidth <= 400) return "compact";
      if (settings.maxWidth < 500) return "balanced";
      return "wide";
    },
  },
  {
    id: "hover",
    label: "Hover",
    options: [
      { value: "still", label: "Still", patch: { hoverScale: 1, hoverHighlight: "none" } },
      { value: "lift", label: "Lift", patch: { hoverScale: 1.02, hoverHighlight: "subtle" } },
      { value: "float", label: "Float", patch: { hoverScale: 1.04, hoverHighlight: "medium" } },
    ],
    getActive(settings) {
      if (settings.hoverHighlight === "none" || settings.hoverScale <= 1) return "still";
      if (settings.hoverScale >= 1.03) return "float";
      return "lift";
    },
  },
  {
    id: "imageFit",
    label: "Image",
    options: [
      { value: "contain", label: "Fit", patch: { imageFit: "contain" } },
      { value: "cover", label: "Fill", patch: { imageFit: "cover" } },
    ],
    getActive(settings) {
      return settings.imageFit === "cover" ? "cover" : "contain";
    },
  },
  {
    id: "layout",
    label: "Layout",
    options: [
      { value: "grid", label: "Grid", patch: { cardLayout: "grid" } },
      { value: "rail", label: "Rail", patch: { cardLayout: "rail" } },
      { value: "depth", label: "3D", patch: { cardLayout: "depth" } },
    ],
    getActive(settings) {
      return ["rail", "depth"].includes(settings.cardLayout) ? settings.cardLayout : "grid";
    },
  },
];

export function getActiveCardPresetId(settings) {
  const match = CARD_STYLE_PRESETS.find((preset) => (
    Object.keys(preset.settings).every((key) => settings[key] === preset.settings[key])
  ));
  return match ? match.id : "";
}
