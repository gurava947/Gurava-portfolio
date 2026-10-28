import { useCallback, useEffect, useId, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import useFeaturedAxis from "../hooks/useFeaturedAxis";
import { prefersReducedMotion } from "../utils/motion";

const SLIDER_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];

function scrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export default function ProjectSlider({
  projects = [],
  layout = "rail",
  cardUI = {},
  effects = {},
  onNavigate,
  resetKey = "",
  className = "",
  label = "",
  hintLabel,
}) {
  const [scrollState, setScrollState] = useState({ start: true, end: true, progress: 0, fraction: 1 });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const generatedId = useId().replace(/:/g, "");
  const hintId = `${generatedId}-slider-hint`;
  const depth = layout === "depth";
  // The catalogue rail turns with the site-wide shuffle direction: the same cards, the same
  // device count (--rail-cards), but stacked downward instead of sideways.
  const axis = useFeaturedAxis();
  const vertical = axis === "vertical";
  const regionLabel = label || `Project cards, ${vertical ? "scrollable downward" : "horizontally scrollable"}`;

  const measure = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const visible = vertical ? node.clientHeight : node.clientWidth;
    const total = vertical ? node.scrollHeight : node.scrollWidth;
    const position = vertical ? node.scrollTop : node.scrollLeft;
    const max = total - visible;
    const start = position <= 2;
    const end = position + visible >= total - 2;
    const progress = max > 2 ? Math.min(1, Math.max(0, position / max)) : 0;
    const fraction = total > 0 ? Math.min(1, visible / total) : 1;
    setScrollState((current) => (
      current.start === start
      && current.end === end
      && Math.abs(current.progress - progress) < 0.002
      && Math.abs(current.fraction - fraction) < 0.002
        ? current
        : { start, end, progress, fraction }
    ));
  }, [vertical]);

  const scheduleMeasure = () => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      measure();
    });
  };

  useEffect(() => {
    measure();
    const frame = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure, { passive: true });
    let observer;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      observer = new ResizeObserver(measure);
      observer.observe(trackRef.current);
    }
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [measure, projects.length, layout]);

  useEffect(() => () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node) return;
    if (vertical) node.scrollTop = 0;
    else node.scrollLeft = 0;
    measure();
  }, [resetKey, measure, vertical]);

  const cardStep = () => {
    const node = trackRef.current;
    if (!node) return 0;
    const first = node.children[0];
    const second = node.children[1];
    const measured = second && first
      ? (vertical ? second.offsetTop - first.offsetTop : second.offsetLeft - first.offsetLeft)
      : 0;
    if (measured > 0) return measured;
    const extent = vertical ? node.clientHeight : node.clientWidth;
    return Math.max(vertical ? 64 : 260, extent * 0.82);
  };

  const scrollCards = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const step = cardStep();
    const extent = vertical ? node.clientHeight : node.clientWidth;
    const visible = Math.max(1, Math.floor(extent / step));
    node.scrollBy(vertical
      ? { top: direction * step * visible, behavior: scrollBehavior() }
      : { left: direction * step * visible, behavior: scrollBehavior() });
  };

  const handleKeyDown = (event) => {
    if (!SLIDER_KEYS.includes(event.key)) return;
    const node = trackRef.current;
    if (!node) return;
    const forwards = vertical ? event.key === "ArrowDown" : event.key === "ArrowRight";
    const backwards = vertical ? event.key === "ArrowUp" : event.key === "ArrowLeft";
    if (!forwards && !backwards && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const behavior = scrollBehavior();
    const axisProp = vertical ? "top" : "left";
    if (event.key === "Home") {
      node.scrollTo({ [axisProp]: 0, behavior });
      return;
    }
    if (event.key === "End") {
      node.scrollTo({ [axisProp]: vertical ? node.scrollHeight : node.scrollWidth, behavior });
      return;
    }
    node.scrollBy({ [axisProp]: (forwards ? 1 : -1) * cardStep(), behavior });
  };

  return (
    <div className={`lab-card-rail-shell is-rail${depth ? " is-depth" : ""}`} data-axis={axis}>
      <div className="lab-card-rail-controls">
        <span className="lab-card-rail-hint">
          {hintLabel || (vertical ? (depth ? "3D vertical stack" : "Vertical stack") : depth ? "3D side-scroll shelf" : "Side-scroll shelf")}
        </span>
        <div className="lab-card-rail-buttons">
          <button
            type="button"
            className="lab-card-rail-button"
            onClick={() => scrollCards(-1)}
            disabled={scrollState.start}
            aria-label={vertical ? "Scroll project cards up" : "Scroll project cards left"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{vertical
              ? <path d="m6 14.5 6-6 6 6" />
              : <path d="m14.5 6-6 6 6 6" />}</svg>
          </button>
          <button
            type="button"
            className="lab-card-rail-button"
            onClick={() => scrollCards(1)}
            disabled={scrollState.end}
            aria-label={vertical ? "Scroll project cards down" : "Scroll project cards right"}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{vertical
              ? <path d="m6 9.5 6 6 6-6" />
              : <path d="m9.5 6 6 6-6 6" />}</svg>
          </button>
        </div>
      </div>
      <div className="lab-card-rail-viewport">
        <div
          ref={trackRef}
          className={`lab-project-grid${className ? ` ${className}` : ""} is-card-rail is-card-${layout}`}
          role="region"
          aria-label={regionLabel}
          aria-describedby={hintId}
          tabIndex={0}
          data-axis={axis}
          onScroll={scheduleMeasure}
          onKeyDown={handleKeyDown}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onNavigate={onNavigate} cardUI={cardUI} fx={effects} />
          ))}
        </div>
        <span className={`lab-card-rail-fade is-start${scrollState.start ? " is-hidden" : ""}`} aria-hidden="true" />
        <span className={`lab-card-rail-fade is-end${scrollState.end ? " is-hidden" : ""}`} aria-hidden="true" />
      </div>
      <div className="lab-card-rail-progress" aria-hidden="true">
        <i
          style={{
            left: `${scrollState.progress * (1 - Math.max(scrollState.fraction, 0.16)) * 100}%`,
            width: `${Math.max(scrollState.fraction, 0.16) * 100}%`,
          }}
        />
      </div>
      <p id={hintId} className="visually-hidden">
        Use the {vertical ? "up and down arrow" : "left and right arrow"} keys to move through the cards, or Home and End to jump to the ends.
      </p>
    </div>
  );
}
