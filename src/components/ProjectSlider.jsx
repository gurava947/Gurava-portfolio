import { useCallback, useEffect, useId, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { prefersReducedMotion } from "../utils/motion";

const SLIDER_KEYS = ["ArrowLeft", "ArrowRight", "Home", "End"];

function scrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}

function readCount(node, style, property) {
  const raw = node.style.getPropertyValue(property) || style.getPropertyValue(property);
  return Math.max(1, Number.parseInt(raw, 10) || 1);
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
  const [scrollState, setScrollState] = useState({
    start: true, end: true, progress: 0, fraction: 1, page: 1, pages: 1, cols: 0, rows: 0,
  });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const generatedId = useId().replace(/:/g, "");
  const hintId = `${generatedId}-slider-hint`;
  const depth = layout === "depth";
  const regionLabel = label || "Project cards, horizontally scrollable";

  /* The grid itself decides how many cards fit: --rail-cols and --rail-rows come from theme.css,
   * so the control below always pages by exactly what the visitor can see and can never change the
   * count. One column step is the distance between the first card and the first card of the next
   * column, which the stylesheet's gap is folded into for free. */
  const metrics = useCallback(() => {
    const node = trackRef.current;
    if (!node) return null;
    const style = window.getComputedStyle(node);
    const cols = readCount(node, style, "--rail-cols");
    const rows = readCount(node, style, "--rail-rows");
    const first = node.children[0];
    // Columns fill top to bottom, so the card one full row in is the first card of the next column.
    const anchor = node.children[rows];
    const column = anchor && first ? anchor.offsetLeft - first.offsetLeft : 0;
    const pageWidth = column > 0 ? column * cols : Math.max(260, node.clientWidth * 0.9);
    return { cols, rows, column: column || pageWidth, pageWidth };
  }, []);

  const measure = useCallback(() => {
    const node = trackRef.current;
    if (!node) return;
    const current = metrics();
    const visible = node.clientWidth;
    const total = node.scrollWidth;
    const position = node.scrollLeft;
    const max = total - visible;
    const start = position <= 2;
    const end = position + visible >= total - 2;
    const progress = max > 2 ? Math.min(1, Math.max(0, position / max)) : 0;
    const fraction = total > 0 ? Math.min(1, visible / total) : 1;
    const pageWidth = current?.pageWidth ?? 0;
    const pages = pageWidth > 0 ? Math.max(1, Math.round(max / pageWidth) + 1) : 1;
    const page = pageWidth > 0 ? Math.min(pages, Math.round(position / pageWidth) + 1) : 1;
    setScrollState((state) => (
      state.start === start
      && state.end === end
      && state.page === page
      && state.pages === pages
      && state.cols === (current?.cols ?? 0)
      && state.rows === (current?.rows ?? 0)
      && Math.abs(state.progress - progress) < 0.002
      && Math.abs(state.fraction - fraction) < 0.002
        ? state
        : { start, end, progress, fraction, page, pages, cols: current?.cols ?? 0, rows: current?.rows ?? 0 }
    ));
    return current;
  }, [metrics]);

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

  const scrollByPage = (direction) => {
    const node = trackRef.current;
    if (!node) return;
    const current = metrics();
    if (!current) return;
    const max = node.scrollWidth - node.clientWidth;
    const target = Math.min(max, Math.max(0, Math.round((node.scrollLeft + direction * current.pageWidth) / current.pageWidth) * current.pageWidth));
    node.scrollTo({ left: target, behavior: scrollBehavior() });
  };

  const handleKeyDown = (event) => {
    if (!SLIDER_KEYS.includes(event.key)) return;
    const node = trackRef.current;
    if (!node) return;
    event.preventDefault();
    const current = metrics();
    const behavior = scrollBehavior();
    if (event.key === "Home") {
      node.scrollTo({ left: 0, behavior });
      return;
    }
    if (event.key === "End") {
      node.scrollTo({ left: node.scrollWidth, behavior });
      return;
    }
    node.scrollBy({ left: (event.key === "ArrowRight" ? 1 : -1) * (current?.column ?? 260), behavior });
  };

  const singlePage = scrollState.start && scrollState.end;

  return (
    <div className={`lab-card-rail-shell is-grid${depth ? " is-depth" : ""}${singlePage ? " is-single-page" : ""}`}>
      <div className="lab-card-rail-controls">
        <span className="lab-card-rail-hint">
          {hintLabel || (depth
            ? "3D card grid"
            : `${scrollState.cols} × ${scrollState.rows} grid`)}
        </span>
        {!singlePage && (
          <span className="lab-card-rail-page" aria-hidden="true">
            {scrollState.page} / {scrollState.pages}
          </span>
        )}
      </div>
      <div className="lab-card-rail-viewport">
        <div
          ref={trackRef}
          className={`lab-project-grid${className ? ` ${className}` : ""} is-card-rail is-card-${layout}`}
          role="region"
          aria-label={regionLabel}
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
        <div className="lab-card-rail-edges">
          <button
            type="button"
            className="lab-card-rail-button lab-card-rail-edge is-prev"
            onClick={() => scrollByPage(-1)}
            disabled={scrollState.start}
            aria-label="Go to the previous page of project cards"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m14.5 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="lab-card-rail-button lab-card-rail-edge is-next"
            onClick={() => scrollByPage(1)}
            disabled={scrollState.end}
            aria-label="Go to the next page of project cards"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9.5 6 6 6-6 6" />
            </svg>
          </button>
        </div>
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
        Use the left and right arrow keys to move a column at a time, or the back and forward
        buttons at the edges of the grid to move a full page. Home and End jump to the ends.
      </p>
    </div>
  );
}
