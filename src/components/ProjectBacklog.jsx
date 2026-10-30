/* The page claims 463 builds, so the honest counterpart is a list of what is *not* among them.
   Entries are deliberately not cards: no thumbnail, no hover lift, no route to tap — a planned entry
   has none of those, and giving it the shape of shipped work is exactly the misleading part. */
export default function ProjectBacklog({ backlog, copy }) {
  // A session can render a cached catalog that predates both lists, so an absent section stays absent
  // rather than half-drawing its headings without their labels.
  if (!backlog || backlog.length === 0 || !copy) return null;

  return (
    <section className="home-backlog-section" id="backlog" data-three3d-surface="page">
      <div className="container">
        <header className="home-section-heading">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2 className="section-title">{copy.title}</h2>
          </div>
          <p className="section-note">{copy.note}</p>
        </header>

        <ul className="backlog-list">
          {backlog.map((entry) => (
            <li className="backlog-entry" key={entry.id}>
              <div className="backlog-entry-head">
                <div>
                  <p className="backlog-area">{entry.area}</p>
                  <h3 className="backlog-title">{entry.title}</h3>
                </div>
                <p className="backlog-status">{copy.status}</p>
              </div>
              <p className="backlog-summary">{entry.summary}</p>
              <dl className="backlog-detail">
                <div>
                  <dt>{copy.whyLabel}</dt>
                  <dd>{entry.notBuiltBecause}</dd>
                </div>
                <div>
                  <dt>{copy.evidenceLabel}</dt>
                  <dd>{entry.evidence}</dd>
                </div>
              </dl>
              {/* The entry cannot be opened, so the sentence that says so is read by a screen reader
                  too rather than carried only by styling. */}
              <p className="backlog-runs">
                <span>{copy.runs}</span>
                <strong>{copy.runsAnswer}</strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
