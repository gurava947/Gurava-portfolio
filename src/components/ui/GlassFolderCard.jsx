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

export default function GlassFolderCard({ collection, projects = [], index = 0, copy = {}, onNavigate }) {
  const destination = `/projects?collection=${collection.id}`;
  const previews = projects.filter((project) => project.thumbnail || project.image).slice(0, 3);
  const sheets = [
    ...Array.from({ length: Math.max(0, 3 - previews.length) }, () => null),
    ...previews,
  ];
  const countLabel = `${collection.count} ${collection.count === 1 ? "build" : "builds"}`;
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
          <span className="collection-folder-kicker">Collection · {countLabel}</span>
          <h3>{collection.label}</h3>
          <span className="collection-folder-fold" aria-hidden="true" />
        </div>
      </div>
      <div className="collection-folder-copy">
        <p>{collection.description}</p>
        <span className="collection-folder-action">
          {copy.action || "Open collection"} <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
