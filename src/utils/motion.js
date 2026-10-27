export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  const root = document.documentElement;
  return Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    || root?.dataset.reducedMotion === "true"
    || root?.dataset.animation === "none";
}
