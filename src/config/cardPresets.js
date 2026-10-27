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
    id: "cinema",
    label: "Cinema",
    note: "Wide side-scroll · snap showcase",
    motion: "Snap rail · edge fades",
    settings: defaultSettings(),
  },
  {
    id: "studio",
    label: "Studio",
    note: "Balanced grid · calm lift",
    motion: "Quiet hover lift",
    settings: { ...defaultSettings(), cardLayout: "grid" },
  },
  {
    id: "bento",
    label: "Bento",
    note: "Mixed spans · gallery calm",
    motion: "Soft reveal · gentle lift",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(26),
      cardLayout: "mosaic",
      imageFit: "cover",
      shadowDepth: "soft",
      cardGap: "spacious",
      hoverScale: 1.02,
      hoverHighlight: "subtle",
      transitionDuration: 320,
      entranceIntensity: "subtle",
      mobileImageHeight: 165,
      tabletImageHeight: 195,
      desktopImageHeight: 220,
    },
  },
  {
    id: "editorial",
    label: "Editorial",
    note: "Serif index · hairline rules",
    motion: "Slow reveal · underline",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(2),
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 1,
      borderLeftWidth: 0,
      cardLayout: "editorial",
      imageFit: "cover",
      shadowDepth: "none",
      cardGap: "compact",
      maxWidth: 520,
      fontFamily: "georgia",
      fontSize: 17,
      fontWeight: 400,
      hoverScale: 1.005,
      hoverHighlight: "none",
      transitionDuration: 360,
      transitionEasing: "smooth",
      entranceIntensity: "subtle",
      mobileImageHeight: 170,
      tabletImageHeight: 195,
      desktopImageHeight: 220,
    },
  },
  {
    id: "poster",
    label: "Poster",
    note: "Full bleed · cinematic type",
    motion: "Cinematic reveal · slow zoom",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(24),
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      cardLayout: "poster",
      imageFit: "cover",
      shadowDepth: "floating",
      cardGap: "cozy",
      maxWidth: 520,
      fontSize: 16,
      fontWeight: 700,
      textColor: "#f7faf6",
      backgroundColor: "#0b1310",
      hoverScale: 1.015,
      hoverHighlight: "medium",
      transitionDuration: 340,
      transitionEasing: "smooth",
      entranceIntensity: "medium",
      mobileImageHeight: 200,
      tabletImageHeight: 240,
      desktopImageHeight: 260,
    },
  },
  {
    id: "depth",
    label: "3D shelf",
    note: "Tilted side-scroll rail",
    motion: "Pointer tilt · snap rail",
    settings: {
      ...defaultSettings(),
      ...roundedCorners(26),
      cardLayout: "depth",
      maxWidth: 420,
      hoverScale: 1.025,
      hoverHighlight: "medium",
      shadowDepth: "floating",
      cardGap: "spacious",
      tiltIntensity: 10,
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
    id: "shadow",
    label: "Shadow",
    options: [
      { value: "none", label: "Flat", patch: { shadowDepth: "none" } },
      { value: "soft", label: "Soft", patch: { shadowDepth: "soft" } },
      { value: "raised", label: "Raised", patch: { shadowDepth: "raised" } },
      { value: "floating", label: "Float", patch: { shadowDepth: "floating" } },
    ],
    getActive(settings) {
      return ["none", "soft", "raised", "floating"].includes(settings.shadowDepth) ? settings.shadowDepth : "raised";
    },
  },
  {
    id: "spacing",
    label: "Spacing",
    options: [
      { value: "compact", label: "Compact", patch: { cardGap: "compact" } },
      { value: "cozy", label: "Cozy", patch: { cardGap: "cozy" } },
      { value: "spacious", label: "Airy", patch: { cardGap: "spacious" } },
    ],
    getActive(settings) {
      return ["compact", "cozy", "spacious"].includes(settings.cardGap) ? settings.cardGap : "cozy";
    },
  },
];

export function getActiveCardPresetId(settings) {
  const match = CARD_STYLE_PRESETS.find((preset) => (
    Object.keys(preset.settings).every((key) => settings[key] === preset.settings[key])
  ));
  return match ? match.id : "";
}
