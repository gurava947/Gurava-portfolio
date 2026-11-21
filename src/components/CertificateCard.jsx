import { useMemo, useRef } from "react";
import { getEffectVariables, normalizeCardEffects } from "../config/cardEffects";
import { useCardPointerFx } from "../hooks/useCardPointerFx";
import useCardHoverPreview from "../hooks/useCardHoverPreview.js";

function metricValue(value) {
  return String(value || "").replace(/\//g, " / ");
}

export default function CertificateCard({ certificate, copy = { openLabel: "Open certificate" }, index = 0, onNavigate, fx = {}, preview = false, headingLevel = 3 }) {
  const image = (certificate.assets || []).find(({ role }) => role === "certificate");
  const performance = Array.isArray(certificate.performance) ? certificate.performance : [];
  const metrics = ["grade", "percentage", "score"]
    .map((key) => performance.find((item) => item.key === key))
    .filter(Boolean);
  const topicCount = Array.isArray(certificate.topics) ? certificate.topics.length : 0;
  const effectSettings = normalizeCardEffects(fx);
  const cardEffect = effectSettings.enabled ? effectSettings.certificates : "none";
  const effectVariables = getEffectVariables(effectSettings);
  const cardRef = useRef(null);
  const TitleHeading = headingLevel === 2 ? "h2" : "h3";
  const pointer = useCardPointerFx({ ref: cardRef, effect: cardEffect, effects: effectSettings });
  const hoverPreviewContent = useMemo(() => ({
    kind: "certificate",
    title: certificate.courseTitle,
    image: image?.url || "",
    imageAlt: image?.alt_text || `${certificate.courseTitle} certificate`,
    eyebrow: certificate.issuer || certificate.eyebrow || "Certificate",
    secondary: [certificate.issueDate, certificate.certificateId ? `ID ${certificate.certificateId}` : ""].filter(Boolean).join(" · "),
    description: certificate.description || "",
    tags: (certificate.topics || []).map((topic) => typeof topic === "string" ? topic : topic?.label).filter(Boolean),
    metrics: performance
      .filter((metric) => ["grade", "percentage", "score"].includes(metric.key))
      .slice(0, 3)
      .map((metric) => ({ label: metric.label, value: metricValue(metric.value) })),
    hint: "Click the card to open the certificate details",
  }), [certificate, image, performance]);
  const hoverPreview = useCardHoverPreview(hoverPreviewContent, !preview);

  const body = (
    <>
      <div className="lab-certificate-media">
        {image ? (
          <img src={image.thumbnail_url || image.url} alt={image.alt_text || `${certificate.courseTitle} certificate`} loading="lazy" decoding="async" />
        ) : (
          <span className="lab-certificate-media-fallback" aria-hidden="true">{certificate.courseTitle.slice(0, 1)}</span>
        )}
        <span className="lab-certificate-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="lab-certificate-seal" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="9" r="5.2" />
            <path d="m8.7 13.2-1.4 7.8 4.7-2.6 4.7 2.6-1.4-7.8" />
          </svg>
        </span>
      </div>
      <div className="lab-certificate-body">
        <p className="lab-card-category">{certificate.eyebrow || "Certificate"} · {certificate.certificateId}</p>
        <TitleHeading>{certificate.courseTitle}</TitleHeading>
        <dl className="lab-certificate-metrics">
          {metrics.map((metric) => (
            <div key={metric.key}>
              <dt>{metric.label}</dt>
              <dd>{metricValue(metric.value)}</dd>
            </div>
          ))}
        </dl>
        <p className="lab-certificate-foot">
          <span>{topicCount} topics covered</span>
          <span>{copy.openLabel} <span aria-hidden="true">→</span></span>
        </p>
      </div>
    </>
  );

  return (
    <article
      ref={cardRef}
      className={`lab-certificate-card${preview ? " is-preview" : ""}`}
      style={effectVariables}
      data-card-fx={cardEffect}
      onPointerEnter={hoverPreview.triggerProps.onPointerEnter}
      onPointerMove={(event) => {
        pointer.onPointerMove?.(event);
        hoverPreview.triggerProps.onPointerMove(event);
      }}
      onPointerLeave={(event) => {
        pointer.onPointerLeave?.(event);
        hoverPreview.triggerProps.onPointerLeave(event);
      }}
      onPointerDown={hoverPreview.triggerProps.onPointerDown}
      onPointerUp={hoverPreview.triggerProps.onPointerUp}
      onPointerCancel={hoverPreview.triggerProps.onPointerCancel}
      onFocusCapture={hoverPreview.triggerProps.onFocusCapture}
      onBlurCapture={hoverPreview.triggerProps.onBlurCapture}
      onClickCapture={hoverPreview.triggerProps.onClickCapture}
      onContextMenu={hoverPreview.triggerProps.onContextMenu}
    >
      {preview ? (
        <div className="lab-certificate-link">{body}</div>
      ) : (
        <a
          className="lab-certificate-link"
          href={certificate.route}
          onClick={(event) => onNavigate?.(event, certificate.route)}
          aria-describedby={hoverPreview.isOpen ? hoverPreview.tooltipId : undefined}
        >
          {body}
        </a>
      )}
      {hoverPreview.preview}
    </article>
  );
}
