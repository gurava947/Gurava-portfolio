import { useCallback, useEffect, useId, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { prefersReducedMotion } from "../utils/motion";

const SLIDER_KEYS = ["ArrowLeft", "ArrowRight", "Home", "End"];

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
  label = "Project cards, horizontally scrollable",
  hintLabel,
}) {
  const [scrollState, setScrollState] = useState({ start: true, end: true, progress: 0, fraction: 1 });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const generatedId = useId().replace(/:/g, "");
  const hintId = `${generatedId}-slider-hint`;
  const depth = layout === "depth";

  const measure = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const start = node.scrollLeft <= 2;
    const end = node.scrollLeft + node.clientWidth >= node.scrollWidth - 2;
    const progress = max > 2 ? Math.min(1, Math.max(0, node.scrollLeft / max)) : 0;
    const fraction = node.scrollWidth > 0 ? Math.min(1, node.clientWidth / node.scrollWidth) : 1;
    setScrollState((current) => (
      current.start === start
      && current.end === end
      && Math.abs(current.progress - progress) < 0.002
      && Math.abs(current.fraction - fraction) < 0.002
        ? current
        : { start, end, progress, fraction }
    ));
  }, []);

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
    node.scrollLeft = 0;
    measure();
  }, [resetKey, measure]);

  const cardStep = () => {
    const node = trackRef.current;
    if (!node) return 0;
    const first = node.children[0];
    const second = node.children[1];
    const measured = second && first ? second.offsetLeft - first.offsetLeft : 0;
    return measured > 0 ? measured : Math.max(260, node.clientWidth * 0.82);
  };

  const scrollCards = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const step = cardStep();
    const visible = Math.max(1, Math.floor(node.clientWidth / step));
    node.scrollBy({ left: direction * step * visible, behavior: scrollBehavior() });
  };

  const handleKeyDown = (event) => {
    if (!SLIDER_KEYS.includes(event.key)) return;
    const node = trackRef.current;
    if (!node) return;
    event.preventDefault();
    const behavior = scrollBehavior();
    if (event.key === "Home") {
      node.scrollTo({ left: 0, behavior });
      return;
    }
    if (event.key === "End") {
      node.scrollTo({ left: node.scrollWidth, behavior });
      return;
    }
    node.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * cardStep(), behavior });
  };

  return (
    <div className={`lab-card-rail-shell is-rail${depth ? " is-depth" : ""}`}>
      <div className="lab-card-rail-controls">
        <span className="lab-card-rail-hint">
          {hintLabel || (depth ? "3D side-scroll shelf" : "Side-scroll shelf")}
        </span>
        <div className="lab-card-rail-buttons">
          <button
            type="button"
            className="lab-card-rail-button"
            onClick={() => scrollCards(-1)}
            disabled={scrollState.start}
            aria-label="Scroll project cards left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6" /></svg>
          </button>
          <button
            type="button"
            className="lab-card-rail-button"
            onClick={() => scrollCards(1)}
            disabled={scrollState.end}
            aria-label="Scroll project cards right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <div className="lab-card-rail-viewport">
        <div
          ref={trackRef}
          className={`lab-project-grid${className ? ` ${className}` : ""} is-card-rail is-card-${layout}`}
          role="region"
          aria-label={label}
          aria-describedby={hintId}
          tabIndex={0}
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
        Use the left and right arrow keys to move through the cards, or Home and End to jump to the ends.
      </p>
    </div>
  );
}
