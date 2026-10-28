// The Python playground is a same-origin iframe with its own theme switch, so the site and the
// playground can disagree. This module is the single rule set that decides whose theme wins.
//
// "follow" is the default both ways: the playground opens in whatever theme the site uses, and
// flipping the playground's own switch moves the site with it. Choosing "light" or "dark" pins the
// playground to that theme, so the two stop driving each other until the pin is removed.

export const PLAYGROUND_THEME_KEY = "python-playground-app-theme";
export const PLAYGROUND_THEME_MODES = ["follow", "light", "dark"];
export const DEFAULT_PLAYGROUND_THEME = "follow";

export const PLAYGROUND_THEME_OPTIONS = [
  { value: "follow", label: "Follow the site", hint: "The playground and the portfolio change together." },
  { value: "light", label: "Always light", hint: "The playground stays light, whatever the site does." },
  { value: "dark", label: "Always dark", hint: "The playground stays dark, whatever the site does." },
];

export function normalizePlaygroundTheme(value) {
  return PLAYGROUND_THEME_MODES.includes(value) ? value : DEFAULT_PLAYGROUND_THEME;
}

// The theme the playground should actually show.
export function resolvePlaygroundTheme(siteMode, setting) {
  const pinned = normalizePlaygroundTheme(setting);
  return pinned === "follow" ? (siteMode === "dark" ? "dark" : "light") : pinned;
}

// True when a playground theme change is allowed to move the rest of the site.
export function playgroundThemeDrivesSite(setting) {
  return normalizePlaygroundTheme(setting) === "follow";
}
