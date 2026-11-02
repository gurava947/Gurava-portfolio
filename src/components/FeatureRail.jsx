import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import useFeaturedAxis from "../hooks/useFeaturedAxis";
import { normalizeFeatureRail } from "../config/featureRail";
import { prefersReducedMotion } from "../utils/motion";
import "../styles/feature-rail.css";

const behavior = () => (prefersReducedMotion() ? "auto" : "smooth");

// The suggestion rail, as separate cards.
//
// It used to be one continuous strip of poster tiles that grew and shrank over its neighbours on
// hover, which read as a single surface rather than a shelf of projects. Every card here is the same
// `ProjectCard` the grid uses, so the card studio, the look presets and the effects all keep working
// on it, and the five numbers in the studio (width, height, gap, per view, padding) are plain CSS
// custom properties the stylesheet reads — no measuring, no layout thrash, and no reflow of anything
// outside the rail.
export default function FeatureRail({
  projects = [],
  onNavigate,
  rail,
  cardUI = {},
  fx = {},
  eyebrow = "Suggested builds",
  art = "contain",
}) {
  const settings = useMemo(() => normalizeFeatureRail(rail), [rail]);
  const scrollerRef = useRef(null);
  const axis = useFeaturedAxis();
  const [edges, setEdges] = useState({ start: false, end: true });
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const vertical = axis === "vertical";
  const scrollable = settings.layout === "carousel" && !settings.wrap;

  const measure = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const extent = vertical ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth;
    const position = vertical ? node.scrollTop : node.scrollLeft;
    const view = vertical ? node.clientHeight : node.clientWidth;
    setEdges({ start: position > 4, end: position < extent - 4 });
    if (!scrollable || view <= 0) {
      setPages(1);
      setPage(0);
      return;
    }
    const total = Math.max(1, Math.ceil((extent + view) / view));
    setPages(total);
    setPage(Math.min(Math.max(0, Math.round(position / view)), total - 1));
  }, [vertical, scrollable]);

  useEffect(() => {
    measure();
    const node = scrollerRef.current;
    if (node && typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }
    return undefined;
  }, [measure, projects.length, settings.layout, settings.cardWidth, settings.cardsPerView, settings.gap, settings.padding, settings.wrap]);

  const scrollByPage = useCallback((direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    const delta = (vertical ? node.clientHeight : node.clientWidth) * direction;
    node.scrollBy(vertical ? { top: delta, behavior: behavior() } : { left: delta, behavior: behavior() });
  }, [vertical]);

  const scrollToPage = (index) => {
    const node = scrollerRef.current;
    if (!node) return;
    const delta = (vertical ? node.clientHeight : node.clientWidth) * index;
    if (vertical) node.scrollTo({ top: delta, behavior: behavior() });
    else node.scrollTo({ left: delta, behavior: behavior() });
  };

  // Drag with a mouse; a finger already scrolls, and stealing that gesture would break the
  // momentum and the tap target at the same time.
  const drag = useRef(null);
  const suppressClick = useRef(false);
  const onPointerDown = (event) => {
    if (!settings.drag || !scrollable || event.pointerType !== "mouse" || event.button !== 0) return;
    const node = scrollerRef.current;
    if (!node) return;
    suppressClick.current = false;
    drag.current = { x: event.clientX, y: event.clientY, left: node.scrollLeft, top: node.scrollTop, moved: false };
  };
  const onPointerMove = (event) => {
    const state = drag.current;
    const node = scrollerRef.current;
    if (!state || !node) return;
    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    if (!state.moved && Math.abs(vertical ? dy : dx) < 6) return;
    state.moved = true;
    node.classList.add("is-dragging");
    if (vertical) node.scrollTop = state.top - dy;
    else node.scrollLeft = state.left - dx;
  };
  // The click arrives after pointerup, so the gesture has to leave its verdict behind rather than
  // being read off a ref that has already been cleared.
  const endDrag = () => {
    if (drag.current?.moved) suppressClick.current = true;
    drag.current = null;
    scrollerRef.current?.classList.remove("is-dragging");
  };
  const onClickCapture = (event) => {
    if (!suppressClick.current) return;
    suppressClick.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const onKeyDown = (event) => {
    if (event.target !== scrollerRef.current || !scrollable) return;
    const keys = vertical ? ["ArrowUp", "ArrowDown"] : ["ArrowLeft", "ArrowRight"];
    if (event.key === keys[0]) { event.preventDefault(); scrollByPage(-1); }
    else if (event.key === keys[1]) { event.preventDefault(); scrollByPage(1); }
    else if (event.key === "Home") {
      event.preventDefault();
      if (vertical) scrollerRef.current?.scrollTo({ top: 0, behavior: behavior() });
      else scrollerRef.current?.scrollTo({ left: 0, behavior: behavior() });
    } else if (event.key === "End") {
      event.preventDefault();
      const node = scrollerRef.current;
      if (!node) return;
      if (vertical) node.scrollTo({ top: node.scrollHeight, behavior: behavior() });
      else node.scrollTo({ left: node.scrollWidth, behavior: behavior() });
    }
  };

  const variables = {
    "--rail-card-width": `${settings.cardWidth}px`,
    "--rail-card-height": `${settings.cardHeight}px`,
    "--rail-gap": `${settings.gap}px`,
    "--rail-padding": `${settings.padding}px`,
    // Cards-per-view shares the visible width; with none picked, the typed width is the card.
    "--rail-basis": settings.cardsPerView > 0
      ? `calc((100% - ${settings.gap * (settings.cardsPerView - 1)}px) / ${settings.cardsPerView})`
      : `min(${settings.cardWidth}px, 100%)`,
    "--rail-grid": settings.cardsPerView > 0
      ? `repeat(${settings.cardsPerView}, minmax(0, 1fr))`
      : `repeat(auto-fill, minmax(min(${settings.cardWidth}px, 100%), 1fr))`,
  };

  const showChrome = scrollable && pages > 1;

  return (
    <div
      className={`feature-rail is-${settings.layout}${settings.wrap ? " is-wrap" : ""}${settings.cardHeight > 0 ? " is-tall" : ""}`}
      data-axis={scrollable ? axis : "horizontal"}
      data-art={art}
      style={variables}
    >
      {projects.length === 0 ? (
        <p className="feature-rail-empty" role="status">
          Suggested builds appear here once the catalog has projects to show.
        </p>
      ) : null}

      {projects.length > 0 ? (
        <div
          className="feature-rail-scroller"
          ref={scrollerRef}
          onScroll={measure}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
          role="group"
          aria-label={`${eyebrow} — ${scrollable ? "scrollable cards" : "cards"}`}
          tabIndex={scrollable ? 0 : undefined}
        >
          {projects.map((project) => (
            <div className="feature-rail-item" key={project.id || project.route || project.slug}>
              <ProjectCard project={project} onNavigate={onNavigate} cardUI={cardUI} fx={fx} />
            </div>
          ))}
        </div>
      ) : null}

      {showChrome && settings.arrows ? (
        <div className="feature-rail-controls">
          <button
            type="button"
            className="feature-rail-arrow is-prev"
            aria-label={vertical ? "Scroll cards up" : "Scroll cards left"}
            disabled={!edges.start}
            onClick={() => scrollByPage(-1)}
          >
            {vertical ? "↑" : "‹"}
          </button>
          <button
            type="button"
            className="feature-rail-arrow is-next"
            aria-label={vertical ? "Scroll cards down" : "Scroll cards right"}
            disabled={!edges.end}
            onClick={() => scrollByPage(1)}
          >
            {vertical ? "↓" : "›"}
          </button>
        </div>
      ) : null}

      {showChrome && settings.indicators ? (
        <div className="feature-rail-dots" role="group" aria-label="Card pages">
          {Array.from({ length: pages }, (_, index) => (
            <button
              type="button"
              key={index}
              className="feature-rail-dot"
              aria-label={`Show page ${index + 1} of ${pages}`}
              aria-current={index === page ? "true" : undefined}
              onClick={() => scrollToPage(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
