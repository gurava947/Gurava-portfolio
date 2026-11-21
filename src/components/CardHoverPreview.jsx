import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./CardHoverPreview.css";

function PreviewMetrics({ metrics = [] }) {
  if (!metrics.length) return null;
  return (
    <dl className="card-hover-preview-metrics">
      {metrics.slice(0, 3).map((metric) => (
        <div key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CardHoverPreview({ id, content, point }) {
  const previewRef = useRef(null);
  const [position, setPosition] = useState({ left: 12, top: 12 });

  useLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return undefined;

    const place = () => {
      const bounds = preview.getBoundingClientRect();
      const gutter = 12;
      const gap = 16;
      let left = point.x + gap;
      if (left + bounds.width > window.innerWidth - gutter) {
        left = point.x - bounds.width - gap;
      }
      left = Math.max(gutter, Math.min(left, window.innerWidth - bounds.width - gutter));

      let top = point.y - bounds.height - gap;
      if (top < gutter) top = point.y + gap;
      top = Math.max(gutter, Math.min(top, window.innerHeight - bounds.height - gutter));
      setPosition({ left, top });
    };

    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [content, point]);

  const tags = content.tags || [];
  return createPortal(
    <aside
      className={`card-hover-preview is-${content.kind}`}
      id={id}
      ref={previewRef}
      role="tooltip"
      style={{ left: `${position.left}px`, top: `${position.top}px` }}
    >
      {content.image && (
        <div className="card-hover-preview-image">
          <img src={content.image} alt={content.imageAlt || ""} />
        </div>
      )}
      <div className="card-hover-preview-body">
        <div className="card-hover-preview-meta">
          {content.eyebrow && <span>{content.eyebrow}</span>}
          {content.secondary && <span>{content.secondary}</span>}
        </div>
        <h2>{content.title}</h2>
        {content.description && <p className="card-hover-preview-description">{content.description}</p>}
        <PreviewMetrics metrics={content.metrics} />
        {tags.length > 0 && (
          <ul className="card-hover-preview-tags" aria-label="Preview topics">
            {tags.slice(0, 5).map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        {content.hint && <p className="card-hover-preview-hint">{content.hint}</p>}
      </div>
    </aside>,
    document.body,
  );
}
