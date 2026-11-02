import { useEffect, useState } from "react";

// Every scrollable strip in the portfolio runs in the direction the visitor picked in
// Card Studio -> Site look, which the theme hook publishes as `<html data-featured-axis>`.
// Reading it from one place keeps the two card rails — the home suggestion rail and the "More from"
// rail on a project page — turning together when the choice changes, including live without a reload.
// The catalogue's band and the 3D shelf are left on the axis they were built for: the first pages a
// two-dimensional grid by its columns, and the second is a deck whose depth is drawn sideways.
//
// Vertical is the shipped default: cards stack downward and the device count from theme.css
// (--rail-cards — 3 on a phone, 4 on a tablet, 6 on a desktop) divides the height of the band
// instead of its width, so exactly that many builds stay on screen.
export const FEATURED_AXIS_ATTRIBUTE = "data-featured-axis";

export function readFeaturedAxis() {
  if (typeof document === "undefined") return "vertical";
  return document.documentElement.dataset.featuredAxis === "horizontal" ? "horizontal" : "vertical";
}

export default function useFeaturedAxis() {
  const [axis, setAxis] = useState(readFeaturedAxis);

  useEffect(() => {
    if (typeof MutationObserver === "undefined") return undefined;
    setAxis(readFeaturedAxis());
    const observer = new MutationObserver(() => setAxis(readFeaturedAxis()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: [FEATURED_AXIS_ATTRIBUTE] });
    return () => observer.disconnect();
  }, []);

  return axis;
}
