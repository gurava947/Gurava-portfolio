import "./GlassFolderCard.css";

function initials(value) {
  return String(value || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function fill(template, values) {
  return Object.entries(values).reduce(
    (text, [token, value]) => text.replaceAll(`{${token}}`, String(value)),
    String(template || "")
  );
}

export default function GlassFolderCard({ collection, projects = [], index = 0, copy = {}, onNavigate }) {
  const destination = `/projects?collection=${collection.id}`;
  const previews = projects.filter((project) => project.thumbnail || project.image).slice(0, 3);
  const sheets = [
    ...Array.from({ length: Math.max(0, 3 - previews.length) }, () => null),
    ...previews,
  ];
  const countLabel = fill(copy.countLabel, { count: collection.count })
    || `${collection.count} ${collection.count === 1 ? "build" : "builds"}`;
  const contents = Array.isArray(collection.contents) ? collection.contents : [];
  const hasStory = Boolean(collection.purpose || contents.length || collection.next || collection.experience);
  const navigate = (event) => {
    if (onNavigate) onNavigate(event, destination);
  };

  return (
    <a
      className={`collection-folder-card is-${collection.id}`}
      href={destination}
      onClick={navigate}
    >
      <span className="collection-folder-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      <div className="collection-folder-stage">
        <span className="collection-folder-tab" aria-hidden="true" />
        <span className="collection-folder-back" aria-hidden="true">
          {previews[0] && <img src={previews[0].thumbnail || previews[0].image} alt="" loading="lazy" decoding="async" />}
        </span>
        <div className="collection-folder-sheets" aria-hidden="true">
          {sheets.map((project, slot) => (
            <span className="collection-folder-sheet" key={project?.id || `blank-${slot}`}>
              {project
                ? <img src={project.thumbnail || project.image} alt="" loading="lazy" decoding="async" />
                : <span className="collection-folder-sheet-blank">{initials(collection.label)}</span>}
            </span>
          ))}
        </div>
        <div className="collection-folder-glass">
          <span className="collection-folder-kicker">{countLabel}</span>
          <h3>{collection.label}</h3>
          <span className="collection-folder-fold" aria-hidden="true" />
        </div>
      </div>
      <div className="collection-folder-copy">
        <p className="collection-folder-summary">{collection.description}</p>
        {hasStory && (
          <dl className="collection-folder-story">
            {collection.purpose && (
              <div className="collection-folder-story-row">
                <dt>{copy.purposeLabel || "Why this shelf exists"}</dt>
                <dd>{collection.purpose}</dd>
              </div>
            )}
            {contents.length > 0 && (
              <div className="collection-folder-story-row">
                <dt>{copy.contentsLabel || "What is inside"}</dt>
                <dd>
                  <ul>
                    {contents.map((line) => <li key={line}>{line}</li>)}
                  </ul>
                </dd>
              </div>
            )}
            {collection.next && (
              <div className="collection-folder-story-row">
                <dt>{copy.nextLabel || "What gets added"}</dt>
                <dd>{collection.next}</dd>
              </div>
            )}
            {collection.experience && (
              <div className="collection-folder-story-row">
                <dt>{copy.experienceLabel || "How it feels to use"}</dt>
                <dd>{collection.experience}</dd>
              </div>
            )}
          </dl>
        )}
        <span className="collection-folder-action">
          {copy.action || "Open collection"} <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
