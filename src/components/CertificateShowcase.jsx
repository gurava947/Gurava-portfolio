import { useState } from "react";
import "./CertificateShowcase.css";

function CertificateIcon({ name, className = "certificate-action-icon" }) {
  const sharedProps = {
    "aria-hidden": true,
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };
  const paths = {
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4" /></>,
    twitter: <path d="M22 5.9a8.2 8.2 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.7 1 4.2 4.2 0 0 0-7.2 3.8 11.9 11.9 0 0 1-8.6-4.4 4.2 4.2 0 0 0 1.3 5.6 4.1 4.1 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2.5 19a11.8 11.8 0 0 0 18.2-10c0-.2 0-.4-.1-.5A8.5 8.5 0 0 0 22 5.9Z" />,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    download: <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />,
    code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5m-2-12-4 14" />,
    box: <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5M12 13v9" />,
    layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
    components: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>,
    repeat: <><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15" /><path d="m7 22-4-4 4-4m14-3v2a3 3 0 0 1-3 3H3" /></>,
    list: <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />,
    dictionary: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14Zm0 0A2.5 2.5 0 0 0 6.5 22H20v-5" />,
    function: <path d="M6 21c2.2 0 3.3-1.3 3.7-3.3L12.5 5c.3-1.4 1-2 2.5-2H17M8 10h8" />,
    object: <><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /></>,
    grade: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    award: <><circle cx="12" cy="9" r="5.2" /><path d="m8.7 13.2-1.4 7.8 4.7-2.6 4.7 2.6-1.4-7.8" /></>,
    points: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    score: <path d="M4 19V5m0 14h16M8 15l3-4 3 2 5-7" />,
    percentage: <><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /><path d="m19 5-14 14" /></>,
    window: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18M3 12h18M8 8v12" /></>,
    network: <><circle cx="12" cy="5" r="2.4" /><circle cx="5" cy="18" r="2.4" /><circle cx="19" cy="18" r="2.4" /><path d="m10.8 7.1-4.6 8.8M13.2 7.1l4.6 8.8M7.4 18h9.2" /></>,
    chain: <><path d="M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.1 1.1" /><path d="M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.1-1.1" /></>,
    external: <path d="M14 4h6v6m-11 3L20 4M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />,
  };
  return <svg {...sharedProps}>{paths[name] || paths.external}</svg>;
}

function CertificateActions({ data, copy }) {
  const [copyStatus, setCopyStatus] = useState("");

  const handleCopy = async () => {
    try {
      if (!navigator.clipboard || typeof navigator.clipboard.writeText !== "function") {
        throw new Error(copy.clipboardUnavailable);
      }
      await navigator.clipboard.writeText(data.certificateUrl);
      setCopyStatus(copy.copied);
    } catch (clipboardError) {
      try {
        const field = document.createElement("textarea");
        field.value = data.certificateUrl;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error(copy.copyDenied);
        setCopyStatus(copy.copied);
      } catch (fallbackError) {
        setCopyStatus(copy.copyFailed.replace("{error}", fallbackError.message || clipboardError.message));
      }
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: data.courseTitle, url: data.certificateUrl });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    await handleCopy();
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.shareMessage)}&url=${encodeURIComponent(data.certificateUrl)}`;

  return (
    <div className="certificate-actions" aria-label={copy.actionsAria}>
      <a className="certificate-action certificate-action-primary" href={data.certificatePdfUrl} target="_blank" rel="noreferrer" aria-label={copy.download} title={copy.download}>
        <CertificateIcon name="download" />
        <span>{copy.download}</span>
      </a>
      <button className="certificate-action" type="button" onClick={handleShare} aria-label={copy.shareAria} title={copy.shareAria}>
        <CertificateIcon name="share" />
        <span>{copy.share}</span>
      </button>
      <a className="certificate-action" href={tweetUrl} target="_blank" rel="noreferrer" aria-label={copy.shareOnTwitter} title={copy.shareOnTwitter}>
        <CertificateIcon name="twitter" />
        <span>{copy.twitter}</span>
      </a>
      <button className="certificate-action" type="button" onClick={handleCopy} aria-label={copy.copyAria} title={copy.copyAria}>
        <CertificateIcon name="copy" />
        <span>{copyStatus === copy.copied ? copy.copied : copy.copy}</span>
      </button>
      <p className="certificate-action-status" role="status" aria-live="polite">{copyStatus}</p>
    </div>
  );
}

function CertificateHeader({ data, copy, onBack }) {
  const image = data.assets.find(({ role }) => role === "certificate");
  const titleWords = (data.courseTitle || "").trim().split(/\s+/).filter(Boolean);
  const titleAccent = titleWords.length > 1 ? titleWords.pop() : "";
  const titleLead = titleWords.join(" ");

  return (
    <header className="certificate-hero">
      <div className="certificate-hero-top">
        <a className="certificate-back-link" href="/certificates" onClick={onBack}>
          <span className="certificate-back-icon" aria-hidden="true">←</span>
          <span>{copy.back}</span>
        </a>
      </div>
      <div className="certificate-hero-grid">
        <div className="certificate-header-copy">
          <p className="certificate-eyebrow certificate-eyebrow-pill">
            <CertificateIcon name="award" className="certificate-eyebrow-icon" />
            {data.eyebrow}
          </p>
          <h1 id="certificate-showcase-title">
            {titleLead}
            {titleLead && titleAccent ? " " : ""}
            {titleAccent && <span className="certificate-title-accent">{titleAccent}</span>}
          </h1>
          <CertificateActions data={data} copy={copy} />
          <a className="certificate-view-link" href={data.certificateUrl} target="_blank" rel="noreferrer" aria-label={copy.viewOnProvider} title={copy.viewOnProvider}>
            <CertificateIcon name="external" />
            <span>{copy.viewOnProvider}</span>
          </a>
        </div>
        <div className="certificate-image-stage">
          <span className="certificate-image-backdrop" aria-hidden="true" />
          <a className="certificate-image-link" href={data.certificateUrl} target="_blank" rel="noreferrer" aria-label={copy.openCertificate.replace("{title}", data.courseTitle)}>
            <img className="certificate-image" src={image?.url || ""} alt={image?.alt_text || ""} fetchPriority="high" decoding="async" />
          </a>
          <span className="certificate-image-seal" aria-hidden="true">
            <CertificateIcon name="award" className="certificate-image-seal-icon" />
          </span>
        </div>
      </div>
      {(data.recipient || data.certificateId || data.issuer || data.issueDate) && (
        <dl className="certificate-meta-card">
          {data.recipient && (
            <div className="certificate-meta-recipient">
              <span className="certificate-meta-seal" aria-hidden="true">
                <CertificateIcon name="award" className="certificate-meta-seal-icon" />
              </span>
              <div>
                <dt>{copy.awardedTo}</dt>
                <dd>{data.recipient}</dd>
              </div>
            </div>
          )}
          <div className="certificate-meta-facts">
            {data.certificateId && (
              <div className="certificate-meta-fact">
                <dt>{copy.certificateId}</dt>
                <dd className="certificate-meta-id">{data.certificateId}</dd>
              </div>
            )}
            {data.issuer && (
              <div className="certificate-meta-fact">
                <dt>{copy.issuedBy}</dt>
                <dd>{data.issuer}</dd>
              </div>
            )}
            {data.issueDate && (
              <div className="certificate-meta-fact">
                <dt>{copy.issuedOn}</dt>
                <dd>{data.issueDate}</dd>
              </div>
            )}
          </div>
        </dl>
      )}
    </header>
  );
}

function PerformanceReport({ data, copy }) {
  const percentage = data.performance.find((item) => item.key === "percentage");
  const score = data.performance.find((item) => item.key === "score");
  const secondary = data.performance.filter((item) => item.key !== "percentage" && item.key !== "score");
  const heading = data.examTitle || data.performanceTitle;

  return (
    <section className="certificate-section certificate-performance-section" aria-labelledby="certificate-performance-title">
      <div className="certificate-section-heading">
        <p className="certificate-eyebrow">{copy.performanceEyebrow}</p>
        <h2 id="certificate-performance-title">{heading}</h2>
      </div>
      {data.examTitle && data.performanceTitle && (
        <p className="certificate-eyebrow certificate-attempts-label">{data.performanceTitle}</p>
      )}
      <div className="certificate-scoreboard" role="group" aria-label={data.performanceAria}>
        <div className="certificate-scoreboard-attempts">
          {data.attempts?.length > 0 && (
            <ul className="certificate-attempts">
              {data.attempts.map((attempt) => (
                <li className="certificate-attempt" key={attempt.label}>
                  <div className="certificate-attempt-heading">
                    <strong>{attempt.label}</strong>
                    {attempt.result && <span className="certificate-attempt-result">{attempt.result}</span>}
                  </div>
                  <dl className="certificate-attempt-facts">
                    {attempt.date && <div><dt>{copy.attemptDate}</dt><dd>{attempt.date}</dd></div>}
                    {attempt.duration && <div><dt>{copy.attemptDuration}</dt><dd>{attempt.duration}</dd></div>}
                  </dl>
                </li>
              ))}
            </ul>
          )}
        </div>
        {percentage && (
          <div className="certificate-score-ring" style={{ "--cert-score": percentage.value }}>
            <div className="certificate-score-ring-inner">
              <span>{percentage.label}</span>
              <strong>{percentage.value}</strong>
            </div>
          </div>
        )}
        <div className="certificate-scoreboard-side">
          {score && (
            <div className="certificate-score-chip">
              <CertificateIcon name={score.icon} className="certificate-score-icon" />
              <span>{score.label}</span>
              <strong>{score.value}</strong>
            </div>
          )}
          {secondary.length > 0 && (
            <dl className="certificate-score-facts">
              {secondary.map(({ key, label, value, icon }) => (
                <div className="certificate-score-fact" key={key}>
                  <CertificateIcon name={icon} className="certificate-score-icon" />
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}

function AlumniRecognition({ data, copy }) {
  const image = data.assets.find(({ role }) => role === "alumni");
  if (!image || !data.trainersTitle) return null;
  return (
    <section className="alumni-recognition" aria-labelledby="certificate-alumni-title">
      <div className="alumni-recognition-copy">
        <p className="certificate-eyebrow">{copy.trainersEyebrow}</p>
        <h3 id="certificate-alumni-title">{data.trainersTitle}</h3>
        <p>{data.trainersSubheading}</p>
        <span>{data.trainersDescription}</span>
      </div>
      <div className="alumni-recognition-visual">
        <div className="alumni-recognition-frame">
          <img className="certificate-alumni-image" src={image?.url || ""} alt={image?.alt_text || ""} loading="lazy" decoding="async" />
        </div>
        {image?.alt_text && <p className="alumni-recognition-caption" aria-hidden="true">{image.alt_text}</p>}
      </div>
    </section>
  );
}

function KeyTopics({ data, copy }) {
  return (
    <section className="certificate-curriculum" aria-labelledby="certificate-topics-title">
      <div className="certificate-curriculum-head">
        <p className="certificate-eyebrow">{copy.overviewEyebrow}</p>
        <h2 id="certificate-topics-title">{copy.topicsTitle}</h2>
      </div>
      <ul className="certificate-topics">
        {data.topics.map(({ label, icon }, index) => (
          <li key={label}>
            <div className="certificate-topic-top">
              <span className="certificate-topic-icon-wrap" aria-hidden="true">
                <CertificateIcon name={icon} className="certificate-topic-icon" />
              </span>
              <span className="certificate-topic-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <span className="certificate-topic-label">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CertificateShowcase({ data, copy, onBack }) {
  return (
    <main className="certificate-showcase" aria-labelledby="certificate-showcase-title">
      <div className="container certificate-container">
        <CertificateHeader data={data} copy={copy} onBack={onBack} />
        <PerformanceReport data={data} copy={copy} />
        <KeyTopics data={data} copy={copy} />
        <AlumniRecognition data={data} copy={copy} />
      </div>
    </main>
  );
}
