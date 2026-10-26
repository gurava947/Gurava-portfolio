export const CARD_LAYOUTS = ["grid", "mosaic", "editorial", "poster", "rail", "depth"];

const CARD_SHADOWS = {
  none: "0 0 0 rgb(24 35 29 / 0%)",
  soft: "0 8px 22px rgb(24 35 29 / 7%)",
  raised: "0 12px 30px rgb(24 35 29 / 9%)",
  floating: "0 22px 48px rgb(24 35 29 / 16%)",
};

const CARD_GAPS = {
  compact: "16px",
  cozy: "24px",
  spacious: "32px",
};

const FONT_STACKS = {
  system: "system-ui, sans-serif",
  arial: "Arial, sans-serif",
  georgia: "Georgia, serif",
  monospace: "ui-monospace, SFMono-Regular, Consolas, monospace",
};

export function getCardStyleVariables(cardUI) {
  const variables = {
    "--portfolio-card-radius": `${cardUI.radius}px`,
    "--portfolio-card-radius-top-left": `${cardUI.topLeftRadius}px`,
    "--portfolio-card-radius-top-right": `${cardUI.topRightRadius}px`,
    "--portfolio-card-radius-bottom-right": `${cardUI.bottomRightRadius}px`,
    "--portfolio-card-radius-bottom-left": `${cardUI.bottomLeftRadius}px`,
    "--portfolio-card-image-radius-top-left": `${cardUI.topLeftRadius * 0.8}px`,
    "--portfolio-card-image-radius-top-right": `${cardUI.topRightRadius * 0.8}px`,
    "--portfolio-card-background": cardUI.backgroundColor === "theme" ? "var(--theme-card-bg)" : cardUI.backgroundColor,
    "--portfolio-card-border-color": cardUI.borderColor === "theme" ? "var(--theme-card-border)" : cardUI.borderColor,
    "--portfolio-card-max-width": `${cardUI.maxWidth}px`,
    "--portfolio-card-min-height": `${cardUI.minHeight}px`,
    "--portfolio-card-image-height-mobile": `${cardUI.mobileImageHeight}px`,
    "--portfolio-card-image-height-tablet": `${cardUI.tabletImageHeight}px`,
    "--portfolio-card-image-height-desktop": `${cardUI.desktopImageHeight}px`,
    "--portfolio-card-font-family": cardUI.fontFamily === "theme" ? "inherit" : FONT_STACKS[cardUI.fontFamily],
    "--portfolio-card-title-font-family": cardUI.fontFamily === "theme" ? "'Space Grotesk', sans-serif" : FONT_STACKS[cardUI.fontFamily],
    "--portfolio-card-font-size": `${cardUI.fontSize}px`,
    "--portfolio-card-font-scale": String(cardUI.fontSize / 16),
    "--portfolio-card-font-weight": String(cardUI.fontWeight),
    "--portfolio-card-hover-scale": String(cardUI.hoverScale),
    "--portfolio-card-hover-shadow": {
      none: "0 10px 26px rgb(24 35 29 / 9%)",
      subtle: "0 14px 30px rgb(24 35 29 / 13%)",
      medium: "0 18px 36px rgb(24 35 29 / 18%)",
    }[cardUI.hoverHighlight] || "0 14px 30px rgb(24 35 29 / 13%)",
    "--portfolio-card-transition-duration": `${cardUI.transitionDuration}ms`,
    "--portfolio-card-transition-easing": cardUI.transitionEasing === "standard" ? "cubic-bezier(0.4, 0, 0.2, 1)" : "cubic-bezier(0.2, 0.75, 0.3, 1)",
    "--portfolio-card-entrance-duration": cardUI.entranceIntensity === "medium" ? "420ms" : "280ms",
    "--portfolio-card-entrance-offset": cardUI.entranceIntensity === "medium" ? "14px" : "7px",
    "--portfolio-card-press-scale": cardUI.pressFeedback ? "0.985" : "1",
    "--portfolio-device-transition-duration": cardUI.deviceSwitchTransition ? "360ms" : "0ms",
    "--portfolio-card-shadow": CARD_SHADOWS[cardUI.shadowDepth] || CARD_SHADOWS.raised,
    "--portfolio-card-gap": CARD_GAPS[cardUI.cardGap] || CARD_GAPS.cozy,
  };

  ["top", "right", "bottom", "left"].forEach((side) => {
    const title = side[0].toUpperCase() + side.slice(1);
    variables[`--portfolio-card-border-${side}-width`] = `${cardUI[`border${title}Width`]}px`;
    variables[`--portfolio-card-border-${side}-color`] = cardUI[`border${title}Color`] === "theme"
      ? "var(--portfolio-card-border-color, var(--theme-card-border))"
      : cardUI[`border${title}Color`];
  });

  // Always resolve this var so an isolated preview cannot inherit an active custom color.
  variables["--portfolio-card-custom-text-color"] = cardUI.textColor === "theme"
    ? "var(--theme-card-text)"
    : cardUI.textColor;
  return variables;
}

export function applyCardStyleVariables(root, cardUI) {
  Object.entries(getCardStyleVariables(cardUI)).forEach(([name, value]) => root.style.setProperty(name, value));
}

export function sameCardSettings(first, second) {
  if (first === second) return true;
  if (!first || !second) return false;
  const keys = new Set([...Object.keys(first), ...Object.keys(second)]);
  for (const key of keys) {
    if (first[key] !== second[key]) return false;
  }
  return true;
}
