import CertificateCard from "./CertificateCard";

export default function CertificatesIndex({ certificates, copy, onNavigate }) {
  return (
    <main className="lab-main lab-certificates-index">
      <section className="lab-hero lab-certificates-hero">
        <div className="lab-workspace-wide">
          <a className="lab-back-link" href="/" onClick={(event) => onNavigate(event, "/")}>
            <span aria-hidden="true">←</span> {copy.backHome || "Back to home"}
          </a>
          <div className="lab-certificates-hero-grid">
            <div>
              <p className="lab-eyebrow">{copy.eyebrow}</p>
              <h1>{copy.title} <span>{copy.titleAccent}</span></h1>
              <p className="lab-hero-summary">{copy.description}</p>
            </div>
            <div className="lab-certificates-count" aria-label={`${certificates.length} ${copy.countLabel}`}>
              <span className="lab-certificates-count-kicker">{copy.countLabel}</span>
              <strong>{String(certificates.length).padStart(2, "0")}</strong>
              <span className="lab-certificates-count-rule" aria-hidden="true" />
              <small>Course records, exactly as supplied.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="lab-section lab-certificates-section">
        <div className="lab-workspace-wide">
          <div className="lab-certificate-grid">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.slug}
                certificate={certificate}
                copy={copy}
                index={index}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
