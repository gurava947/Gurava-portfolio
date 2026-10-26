import { useEffect, useRef, useState } from "react";
import { CARD_LAYOUTS } from "../utils/cardStyle";

function monogram(title) {
  return String(title || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProjectCard({ project, onNavigate, cardUI = {}, preview = false, animatePreview = false }) {
  const thumbnail = project.thumbnail || project.image || "";
  const scrollReveal = !preview && Boolean(cardUI.scrollReveal);
  const entrance = preview && !animatePreview ? "none" : (cardUI.entranceIntensity || "none");
  const pressFeedback = cardUI.pressFeedback !== false;
  const imageFit = cardUI.imageFit === "cover" ? "cover" : "contain";
  const cardLayout = CARD_LAYOUTS.includes(cardUI.cardLayout) ? cardUI.cardLayout : "grid";
  const tiltIntensity = Number.isFinite(Number(cardUI.tiltIntensity)) ? Number(cardUI.tiltIntensity) : 7;
  const tiltEnabled = cardLayout === "depth" && tiltIntensity > 0;
  const [loadedThumb, setLoadedThumb] = useState("");
  const imageLoaded = Boolean(thumbnail) && loadedThumb === thumbnail;
  const cardRef = useRef(null);
  const navigate = (event, destination) => {
    if (onNavigate) onNavigate(event, destination);
  };
  const prefersReducedMotion = () => (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || document.documentElement.dataset.reducedMotion === "true"
    || document.documentElement.dataset.animation === "none"
  );
  const handleTilt = (event) => {
    if (!tiltEnabled || event.pointerType !== "mouse") return;
    if (prefersReducedMotion()) return;
    const node = cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--card-tilt-y", `${(x * tiltIntensity).toFixed(2)}deg`);
    node.style.setProperty("--card-tilt-x", `${(y * tiltIntensity * -0.7).toFixed(2)}deg`);
  };
  const resetTilt = () => {
    const node = cardRef.current;
    if (!node) return;
    node.style.setProperty("--card-tilt-y", "0deg");
    node.style.setProperty("--card-tilt-x", "0deg");
  };

  useEffect(() => {
    const node = cardRef.current;
    if (!node || !scrollReveal) {
      node?.classList.remove("is-revealed");
      return undefined;
    }
    const reduceMotion = prefersReducedMotion();
    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-revealed");
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        node.classList.add("is-revealed");
        observer.disconnect();
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [scrollReveal]);

  return (
    <article
      ref={cardRef}
      className={`lab-project-card is-${project.collection}${preview ? " is-preview" : ""}`}
      data-entrance={entrance}
      data-scroll-reveal={String(scrollReveal)}
      data-press-feedback={String(pressFeedback)}
      data-image-fit={imageFit}
      data-card-layout={cardLayout}
      onPointerMove={tiltEnabled ? handleTilt : undefined}
      onPointerLeave={tiltEnabled ? resetTilt : undefined}
    >
      <div className={`lab-card-media${thumbnail ? " has-image" : ""}${imageLoaded ? " is-loaded" : ""}`}>
        {thumbnail ? (
          <>
            <span
              className="lab-card-image-backdrop"
              style={{ backgroundImage: `url("${thumbnail}")` }}
              aria-hidden="true"
            />
            <img
              className={`lab-card-image${imageLoaded ? " is-loaded" : ""}`}
              src={thumbnail}
              alt={project.imageAlt || `${project.title} supplied project preview`}
              loading={preview ? "eager" : "lazy"}
              decoding="async"
              onLoad={() => setLoadedThumb(thumbnail)}
              onError={() => setLoadedThumb(thumbnail)}
            />
          </>
        ) : project.cardCode ? (
          <div className="lab-card-terminal" aria-hidden="true">
            <div className="lab-card-terminal-bar">
              <span /><span /><span />
              <em>{project.title}</em>
              <b>{project.language}</b>
            </div>
            <pre className="lab-card-code">{project.cardCode}</pre>
            {project.cardOutput && (
              <div className="lab-card-output">
                <span>Output</span>
                <strong>{project.cardOutput}</strong>
              </div>
            )}
          </div>
        ) : (
          <div className="lab-card-cover" aria-hidden="true">
            <span className="lab-card-cover-grid" />
            <strong>{monogram(project.title)}</strong>
            <span>{project.collectionLabel}</span>
          </div>
        )}
        <span className={`lab-card-collection is-${project.collection}`}>{project.collectionLabel}</span>
        <span className="lab-card-live">{project.previewType === "python" ? "Pyodide" : "Live build"}</span>
      </div>
      <div className="lab-card-body">
        <div className="lab-card-meta">
          <span className="lab-card-category">{project.category}</span>
          <span className="lab-card-language">{project.language}</span>
        </div>
        <div className="lab-card-heading">
          <h3>
            {preview ? project.title : (
              <a className="lab-card-link" href={project.route} onClick={(event) => navigate(event, project.route)}>
                {project.title}
              </a>
            )}
          </h3>
        </div>
        <p className="lab-card-description">{project.description}</p>
        <ul className="lab-card-tech" aria-label={`${project.title} technologies`}>
          {(project.technologies || []).slice(0, 4).map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
        <p className="lab-card-footnote">
          <span>{project.practiceLabel}</span>
          <span className="lab-card-runtime">
            {project.previewType === "python" ? "Real Python run" : "Isolated preview"}
            <span className="lab-card-open-cue" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8">
                <path d="M4.5 11.5 11.5 4.5M5.8 4.5h5.7v5.7" />
              </svg>
            </span>
          </span>
        </p>
      </div>
    </article>
  );
}
