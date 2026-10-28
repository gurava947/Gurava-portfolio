import { useCallback, useEffect, useRef, useState } from "react";
import CodePlate from "./ui/CodePlate";
import useFeaturedAxis from "../hooks/useFeaturedAxis";
import "../styles/poster-rail.css";

function monogram(title) {
  return String(title || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// A poster-first shelf: snap scrolling, edge fades, arrow controls and a hover state that
// expands the card over its neighbours, the way a streaming rail works.
//
// The rail runs in whichever direction the visitor picked in Card Studio -> Site look
// (`<html data-featured-axis>`), and the same card design serves both. See useFeaturedAxis.
export default function PosterRail({ projects = [], onNavigate, variant = "rail", eyebrow = "Rail" }) {
  const scrollerRef = useRef(null);
  const axis = useFeaturedAxis();
  const [edges, setEdges] = useState({ start: false, end: true });
  const vertical = axis === "vertical";

  const measure = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const extent = vertical ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth;
    const position = vertical ? node.scrollTop : node.scrollLeft;
    setEdges({ start: position > 4, end: position < extent - 4 });
  }, [vertical]);

  useEffect(() => {
    measure();
    const node = scrollerRef.current;
    if (node && typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      observer.observe(node);
      return () => observer.disconnect();
    }
    return undefined;
  }, [measure, projects.length]);

  // Switching direction re-creates `measure` against the other axis, which re-runs the effect
  // above, so the arrows never keep the enabled/disabled state the previous direction left behind.

  const scrollByPage = (direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    const page = (vertical ? node.clientHeight : node.clientWidth) * 0.82;
    node.scrollBy(vertical
      ? { top: direction * page, behavior: "smooth" }
      : { left: direction * page, behavior: "smooth" });
  };

  const navigate = (event, destination) => {
    if (onNavigate) onNavigate(event, destination);
  };

  return (
    <div className={`poster-rail is-${variant}`} data-axis={axis}>
      <div
        className="poster-rail-scroller"
        ref={scrollerRef}
        onScroll={measure}
        role="group"
        aria-label={`${eyebrow} — scrollable builds`}
        tabIndex={0}
      >
        {projects.map((project) => {
          const poster = project.thumbnail || project.image || "";
          return (
            <a
              className={`poster-card${poster ? "" : " is-code-card"}`}
              key={project.id || project.route}
              href={project.route}
              onClick={(event) => navigate(event, project.route)}
            >
              <span className={`poster-card-media${poster ? "" : " is-code"}`} data-collection={project.collection}>
                {poster ? (
                  <img src={poster} alt="" loading="lazy" decoding="async" />
                ) : (
                  <CodePlate
                    code={project.cardCode}
                    output={project.cardOutput}
                    language={project.language || project.collectionLabel}
                  />
                )}
                {!poster && !project.cardCode && (
                  <span className="poster-card-monogram" aria-hidden="true">{monogram(project.title)}</span>
                )}
              </span>
              <span className="poster-card-scrim" aria-hidden="true" />
              <span className="poster-card-body">
                <strong className="poster-card-title">{project.title}</strong>
                <span className="poster-card-meta">
                  <span>{project.collectionLabel}</span>
                  <span>{project.category}</span>
                </span>
                <span className="poster-card-more">
                  <span className="poster-card-description">{project.description}</span>
                  <span className="poster-card-tech">
                    {(project.technologies || []).slice(0, 3).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </span>
                </span>
              </span>
            </a>
          );
        })}
      </div>
      <div className="poster-rail-controls">
        <button
          type="button"
          className="poster-rail-arrow is-prev"
          aria-label={vertical ? "Scroll builds up" : "Scroll builds left"}
          disabled={!edges.start}
          onClick={() => scrollByPage(-1)}
        >
          {vertical ? "↑" : "‹"}
        </button>
        <button
          type="button"
          className="poster-rail-arrow is-next"
          aria-label={vertical ? "Scroll builds down" : "Scroll builds right"}
          disabled={!edges.end}
          onClick={() => scrollByPage(1)}
        >
          {vertical ? "↓" : "›"}
        </button>
      </div>
    </div>
  );
}
