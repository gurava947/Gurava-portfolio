import { useCallback, useEffect, useRef, useState } from "react";
import CodePlate from "./ui/CodePlate";
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

// A poster-first horizontal rail: snap scrolling, edge fades, arrow controls and a
// hover state that expands the card over its neighbours, the way a streaming shelf works.
export default function PosterRail({ projects = [], onNavigate, variant = "rail", eyebrow = "Rail" }) {
  const scrollerRef = useRef(null);
  const [edges, setEdges] = useState({ start: false, end: true });

  const measure = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    setEdges({ start: node.scrollLeft > 4, end: node.scrollLeft < max - 4 });
  }, []);

  useEffect(() => {
    measure();
    const node = scrollerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [measure, projects.length]);

  const scrollByPage = (direction) => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * node.clientWidth * 0.82, behavior: "smooth" });
  };

  const navigate = (event, destination) => {
    if (onNavigate) onNavigate(event, destination);
  };

  return (
    <div className={`poster-rail is-${variant}`}>
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
              className="poster-card"
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
          aria-label="Scroll builds left"
          disabled={!edges.start}
          onClick={() => scrollByPage(-1)}
        >
          ‹
        </button>
        <button
          type="button"
          className="poster-rail-arrow is-next"
          aria-label="Scroll builds right"
          disabled={!edges.end}
          onClick={() => scrollByPage(1)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
