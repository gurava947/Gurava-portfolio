import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import ProjectCard from "./ProjectCard";
import { filterProjects, pageNumbers, paginateProjects, PROJECTS_PER_PAGE, sortProjects } from "../utils/catalogFilters";

const DEFAULT_FILTERS = { query: "", collection: "", category: "", technology: "", sort: "curated", page: 1 };
const COLLECTION_ORDER = ["python", "responsive", "static"];

function parseFilters(search) {
  const params = new URLSearchParams(search);
  return {
    query: params.get("q") || "",
    collection: params.get("collection") || "",
    category: params.get("category") || "",
    technology: params.get("tech") || "",
    sort: ["curated", "titleAsc", "titleDesc"].includes(params.get("sort")) ? params.get("sort") : "curated",
    page: Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1),
  };
}

function filtersToSearch(filters) {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.collection) params.set("collection", filters.collection);
  if (filters.category) params.set("category", filters.category);
  if (filters.technology) params.set("tech", filters.technology);
  if (filters.sort && filters.sort !== "curated") params.set("sort", filters.sort);
  if (filters.page > 1) params.set("page", String(filters.page));
  const value = params.toString();
  return value ? `?${value}` : "";
}

function writeSearch(search) {
  const url = `${window.location.pathname}${search}${window.location.hash}`;
  window.history.replaceState({ ...window.history.state, appRoute: true, appScrollY: window.scrollY }, "", url);
}

function FilterIcon({ name }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  if (name === "search") return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4.5 4.5" /></svg>;
  if (name === "category") return <svg {...props}><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" /></svg>;
  if (name === "technology") return <svg {...props}><rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" /><rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" /></svg>;
  if (name === "sort") return <svg {...props}><path d="M4 7h12M4 12h9M4 17h6M17 7v10m0 0 3-3m-3 3-3-3" /></svg>;
  return <svg {...props}><path d="m6 9 6 6 6-6" /></svg>;
}

function SelectField({ id, label, icon, value, onChange, children }) {
  return (
    <label className="lab-catalog-field" htmlFor={id}>
      <span className="lab-catalog-label">{label}</span>
      <span className="lab-catalog-control is-select">
        <span className="lab-catalog-control-icon"><FilterIcon name={icon} /></span>
        <select id={id} value={value} onChange={(event) => onChange(event.target.value)}>
          {children}
        </select>
        <FilterIcon name="chevron" />
      </span>
    </label>
  );
}

export default function ProjectsCatalog({ catalog, routeSearch = "", onNavigate, copy, cardUI = {} }) {
  const [filters, setFilters] = useState(() => parseFilters(routeSearch));
  const [railEdge, setRailEdge] = useState({ start: true, end: true });
  const deferredQuery = useDeferredValue(filters.query);
  const gridRef = useRef(null);
  const railRef = useRef(null);
  const filterSignature = `${routeSearch}`;
  const lastRouteSearch = useRef(routeSearch);
  const cardLayout = ["rail", "depth"].includes(cardUI.cardLayout) ? cardUI.cardLayout : "grid";
  const isRail = cardLayout !== "grid";

  useEffect(() => {
    if (lastRouteSearch.current === filterSignature) return;
    lastRouteSearch.current = filterSignature;
    setFilters(parseFilters(routeSearch));
  }, [filterSignature, routeSearch]);

  const syncRail = () => {
    const node = railRef.current;
    if (!node) return;
    setRailEdge({
      start: node.scrollLeft <= 2,
      end: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2,
    });
  };

  const collections = useMemo(
    () => COLLECTION_ORDER
      .map((id) => catalog.collections.find((collection) => collection.id === id))
      .filter(Boolean),
    [catalog.collections],
  );

  const filtered = useMemo(() => filterProjects(catalog.projects, {
    query: deferredQuery,
    collection: filters.collection,
    category: filters.category,
    technology: filters.technology,
  }), [catalog.projects, deferredQuery, filters.collection, filters.category, filters.technology]);

  const sorted = useMemo(() => sortProjects(filtered, filters.sort), [filtered, filters.sort]);
  const pagination = useMemo(() => paginateProjects(sorted, filters.page), [sorted, filters.page]);

  useEffect(() => {
    if (!isRail) return undefined;
    syncRail();
    const frame = window.requestAnimationFrame(syncRail);
    window.addEventListener("resize", syncRail, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncRail);
    };
  }, [isRail, cardLayout, pagination.page, pagination.items.length]);

  useEffect(() => {
    const node = railRef.current;
    if (!node) return;
    node.scrollLeft = 0;
    setRailEdge({ start: true, end: node.scrollWidth <= node.clientWidth + 2 });
  }, [deferredQuery, filters.collection, filters.category, filters.technology, filters.sort, filters.page, cardLayout]);

  const scrollRail = (direction) => {
    const node = railRef.current;
    if (!node) return;
    const first = node.children[0];
    const second = node.children[1];
    const unit = second && first ? second.offsetLeft - first.offsetLeft : Math.max(260, node.clientWidth * 0.82);
    const visible = Math.max(1, Math.floor(node.clientWidth / unit));
    node.scrollBy({ left: direction * unit * visible, behavior: "smooth" });
  };

  const update = (patch, options = {}) => {
    const next = { ...filters, page: 1, ...patch };
    setFilters(next);
    writeSearch(filtersToSearch(next));
    if (options.scroll) {
      window.requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  const goToPage = (page) => {
    const next = { ...filters, page };
    setFilters(next);
    writeSearch(filtersToSearch(next));
    window.requestAnimationFrame(() => gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  useEffect(() => {
    if (pagination.page !== filters.page) {
      setFilters((current) => ({ ...current, page: pagination.page }));
    }
  }, [pagination.page, filters.page]);

  const hasFilters = Boolean(filters.query || filters.collection || filters.category || filters.technology || filters.sort !== "curated");
  const resultsLabel = copy.resultsLabel
    .replace("{count}", String(pagination.total))
    .replace("{label}", pagination.total === 1 ? copy.resultSingle : copy.resultPlural);

  return (
    <main className="lab-main lab-catalog-main">
      <section className="lab-hero lab-catalog-hero">
        <div className="lab-workspace-wide">
          <a className="lab-back-link" href="/" onClick={(event) => onNavigate(event, "/")}>
            <span aria-hidden="true">←</span> {copy.backHome || "Back to home"}
          </a>
          <p className="lab-eyebrow">{copy.eyebrow}</p>
          <div className="lab-catalog-hero-grid">
            <h1>{copy.title} <span>{copy.titleAccent}</span></h1>
            <p>{copy.description}</p>
          </div>
          <div className="lab-collection-strip">
            {collections.map((collection) => (
              <button
                key={collection.id}
                type="button"
                className={`lab-collection-tile is-${collection.id}${filters.collection === collection.id ? " is-active" : ""}`}
                onClick={() => update({ collection: filters.collection === collection.id ? "" : collection.id })}
                aria-pressed={filters.collection === collection.id}
              >
                <span>{collection.label}</span>
                <strong>{String(collection.count).padStart(2, "0")}</strong>
                <small>{collection.description}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="lab-section lab-catalog-section">
        <div className="lab-workspace-wide">
          <div className="lab-catalog-controls">
            <label className="lab-catalog-field is-search" htmlFor="catalog-search">
              <span className="lab-catalog-label">{copy.searchLabel}</span>
              <span className="lab-catalog-control">
                <span className="lab-catalog-control-icon"><FilterIcon name="search" /></span>
                <input
                  id="catalog-search"
                  type="search"
                  value={filters.query}
                  placeholder={copy.searchPlaceholder}
                  onChange={(event) => update({ query: event.target.value })}
                />
              </span>
            </label>
            <SelectField id="catalog-category" label={copy.categoryLabel} icon="category" value={filters.category} onChange={(value) => update({ category: value })}>
              <option value="">{copy.allCategories}</option>
              {catalog.categories.map((category) => (
                <option key={category.slug} value={category.label}>{category.label} ({category.count})</option>
              ))}
            </SelectField>
            <SelectField id="catalog-technology" label={copy.technologyLabel} icon="technology" value={filters.technology} onChange={(value) => update({ technology: value })}>
              <option value="">{copy.allTechnologies}</option>
              {catalog.technologies.map((technology) => (
                <option key={technology.label} value={technology.label}>{technology.label} ({technology.count})</option>
              ))}
            </SelectField>
            <SelectField id="catalog-sort" label={copy.sortLabel} icon="sort" value={filters.sort} onChange={(value) => update({ sort: value })}>
              <option value="curated">{copy.sortOptions.curated}</option>
              <option value="titleAsc">{copy.sortOptions.titleAsc}</option>
              <option value="titleDesc">{copy.sortOptions.titleDesc}</option>
            </SelectField>
          </div>

          <div className="lab-catalog-summary">
            <p role="status" aria-live="polite">{resultsLabel}</p>
            <div className="lab-catalog-summary-side">
              {pagination.total > 0 && <span>{copy.pageLabel.replace("{page}", String(pagination.page)).replace("{pages}", String(pagination.pages))}</span>}
              {hasFilters && (
                <button type="button" className="lab-catalog-clear" onClick={() => update({ query: "", collection: "", category: "", technology: "", sort: "curated" })}>
                  {copy.clear}
                </button>
              )}
            </div>
          </div>

          <div ref={gridRef} className="lab-catalog-grid-anchor">
            {pagination.items.length > 0 ? (
              <div className={`lab-card-rail-shell${isRail ? " is-rail" : ""}`}>
                {isRail && (
                  <div className="lab-card-rail-controls">
                    <span className="lab-card-rail-hint">{cardLayout === "depth" ? "3D side-scroll shelf" : "Side-scroll shelf"}</span>
                    <div className="lab-card-rail-buttons">
                      <button
                        type="button"
                        className="lab-card-rail-button"
                        onClick={() => scrollRail(-1)}
                        disabled={railEdge.start}
                        aria-label="Scroll project cards left"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6" /></svg>
                      </button>
                      <button
                        type="button"
                        className="lab-card-rail-button"
                        onClick={() => scrollRail(1)}
                        disabled={railEdge.end}
                        aria-label="Scroll project cards right"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
                      </button>
                    </div>
                  </div>
                )}
                <div
                  ref={railRef}
                  className={`lab-project-grid lab-catalog-grid${isRail ? ` is-card-rail is-card-${cardLayout}` : ""}`}
                  onScroll={isRail ? syncRail : undefined}
                  tabIndex={isRail ? 0 : undefined}
                  role={isRail ? "region" : undefined}
                  aria-label={isRail ? "Project cards, horizontally scrollable" : undefined}
                >
                  {pagination.items.map((project) => (
                    <ProjectCard key={project.id} project={project} onNavigate={onNavigate} cardUI={cardUI} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="lab-detail-state lab-catalog-empty">
                <strong>{copy.emptyTitle}</strong>
                <p>{copy.emptyDescription}</p>
                <button type="button" className="lab-button lab-button-primary" onClick={() => update({ query: "", collection: "", category: "", technology: "", sort: "curated" })}>
                  {copy.clear}
                </button>
              </div>
            )}
          </div>

          {pagination.pages > 1 && (
            <nav className="lab-pagination" aria-label="Catalog pages">
              <button type="button" className="lab-pagination-button" onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page === 1}>
                {copy.previous}
              </button>
              <div className="lab-pagination-pages">
                {pageNumbers(pagination.page, pagination.pages).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`lab-pagination-button${page === pagination.page ? " is-active" : ""}`}
                    aria-current={page === pagination.page ? "page" : undefined}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button type="button" className="lab-pagination-button" onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page === pagination.pages}>
                {copy.next}
              </button>
            </nav>
          )}
          <p className="lab-catalog-footnote">Showing {pagination.start}–{pagination.end} of {pagination.total} · {PROJECTS_PER_PAGE} builds per page</p>
        </div>
      </section>
    </main>
  );
}
