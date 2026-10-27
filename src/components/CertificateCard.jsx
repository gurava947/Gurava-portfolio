import { useRef } from "react";
import { getEffectVariables, normalizeCardEffects } from "../config/cardEffects";
import { useCardPointerFx } from "../hooks/useCardPointerFx";

function metricValue(value) {
  return String(value || "").replace(/\//g, " / ");
}

export default function CertificateCard({ certificate, copy = { openLabel: "Open certificate" }, index = 0, onNavigate, fx = {}, preview = false }) {
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
  const pointer = useCardPointerFx({ ref: cardRef, effect: cardEffect, effects: effectSettings });

  const body = (
    <>
      <div className="lab-certificate-media">
        {image ? (
          <img src={image.url} alt={image.alt_text || `${certificate.courseTitle} certificate`} loading="lazy" decoding="async" />
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
        <h3>{certificate.courseTitle}</h3>
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
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
    >
      {preview ? (
        <div className="lab-certificate-link">{body}</div>
      ) : (
        <a
          className="lab-certificate-link"
          href={certificate.route}
          onClick={(event) => onNavigate?.(event, certificate.route)}
          aria-label={`${copy.openLabel}: ${certificate.courseTitle}`}
        >
          {body}
        </a>
      )}
    </article>
  );
}
