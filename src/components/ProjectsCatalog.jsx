import { useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import CollectionShelf from "./CollectionShelf";
import ProjectCard from "./ProjectCard";
import ProjectSlider from "./ProjectSlider";
import { DEFAULT_SHELF_MOTION } from "../config/cardMotion";
import { DEFAULT_SHELF_3D } from "../config/shelf3d";
import { getOrderedCollections } from "../config/collections";
import { CARD_LAYOUTS } from "../utils/cardStyle";
import { filterProjects, pageNumbers, paginateProjects, PROJECTS_PER_PAGE, PROJECTS_PER_RAIL_PAGE, sortProjects } from "../utils/catalogFilters";

const DEFAULT_FILTERS = { query: "", collection: "", category: "", technology: "", sort: "curated", page: 1 };

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

function FilterIcon({ name, className }) {
  const props = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, className };
  if (name === "search") return <svg {...props}><circle cx="11" cy="11" r="7" /><path d="m16.5 16.5 4.5 4.5" /></svg>;
  if (name === "category") return <svg {...props}><path d="M3 5h18l-7 8v5l-4 2v-7L3 5Z" /></svg>;
  if (name === "technology") return <svg {...props}><rect x="4" y="4" width="7" height="7" rx="1.6" /><rect x="13" y="4" width="7" height="7" rx="1.6" /><rect x="4" y="13" width="7" height="7" rx="1.6" /><rect x="13" y="13" width="7" height="7" rx="1.6" /></svg>;
  if (name === "sort") return <svg {...props}><path d="M4 7h12M4 12h9M4 17h6M17 7v10m0 0 3-3m-3 3-3-3" /></svg>;
  return <svg {...props}><path d="m6 9 6 6 6-6" /></svg>;
}

export function SelectField({ id, label, icon, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropUp, setDropUp] = useState(false);
  const [menuMaxHeight, setMenuMaxHeight] = useState(null);
  const fieldRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const optionRefs = useRef([]);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex] ?? options[0];

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const choose = (option) => {
    closeMenu(true);
    if (option.value !== value) onChange(option.value);
  };

  useLayoutEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (trigger && menu) {
      const rect = trigger.getBoundingClientRect();
      const preferred = Math.min(328, window.innerHeight * 0.58);
      const desired = Math.min(menu.scrollHeight + 12, preferred);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const nextDropUp = spaceBelow < desired + 12 && spaceAbove > spaceBelow;
      const available = (nextDropUp ? spaceAbove : spaceBelow) - 12;
      setDropUp(nextDropUp);
      setMenuMaxHeight(Math.max(132, Math.min(desired, available)));
    }
    const node = optionRefs.current[activeIndex];
    node?.focus({ preventScroll: true });
    node?.scrollIntoView?.({ block: "nearest" });
    // Active index is moved manually by the keyboard handler; focus only on open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointerDown = (event) => {
      if (!fieldRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const moveFocus = (nextIndex) => {
    const clamped = (nextIndex + options.length) % options.length;
    setActiveIndex(clamped);
    optionRefs.current[clamped]?.focus();
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (!open) {
      if (event.target === triggerRef.current && (key === "ArrowDown" || key === "ArrowUp")) {
        event.preventDefault();
        setActiveIndex(selectedIndex);
        setOpen(true);
      }
      return;
    }
    if (key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }
    if (key === "Tab") {
      setOpen(false);
      return;
    }
    if (key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End") {
      event.preventDefault();
      if (key === "Home") moveFocus(0);
      else if (key === "End") moveFocus(options.length - 1);
      else moveFocus(activeIndex + (key === "ArrowDown" ? 1 : -1));
      return;
    }
    if (key === "Enter" || key === " ") {
      event.preventDefault();
      choose(options[activeIndex]);
    }
  };

  return (
    <div
      className="lab-catalog-field"
      ref={fieldRef}
      onKeyDown={handleKeyDown}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <span className="lab-catalog-label" id={`${id}-label`}>{label}</span>
      <div className={`lab-catalog-control is-select${open ? " is-open" : ""}`}>
        <span className="lab-catalog-control-icon"><FilterIcon name={icon} /></span>
        <button
          type="button"
          id={id}
          ref={triggerRef}
          className="lab-catalog-select-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-labelledby={`${id}-label ${id}-selected`}
          onClick={() => (open ? closeMenu(false) : (setActiveIndex(selectedIndex), setOpen(true)))}
        >
          <span id={`${id}-selected`} className="lab-catalog-select-value">{selected.label}</span>
          {selected.count != null && <span className="lab-catalog-select-count">{selected.count}</span>}
        </button>
        <FilterIcon name="chevron" className="lab-catalog-chevron" />
        {open && (
          <ul
            className={`lab-catalog-menu${dropUp ? " is-drop-up" : ""}`}
            id={`${id}-listbox`}
            role="listbox"
            ref={menuRef}
            aria-labelledby={`${id}-label`}
            style={menuMaxHeight ? { maxHeight: `${menuMaxHeight}px` } : undefined}
          >
            {options.map((option, index) => (
              <li
                key={option.value || "all"}
                ref={(node) => { optionRefs.current[index] = node; }}
                className="lab-catalog-option"
                role="option"
                aria-selected={option.value === value}
                tabIndex={-1}
                onClick={() => choose(option)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="lab-catalog-option-label">{option.label}</span>
                {option.count != null && <span className="lab-catalog-option-count">{option.count}</span>}
                <svg className="lab-catalog-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7" /></svg>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ProjectsCatalog({ catalog, routeSearch = "", onNavigate, copy, cardUI = {}, cardEffects = {}, shelfMotion = DEFAULT_SHELF_MOTION, shelf3d = DEFAULT_SHELF_3D }) {
  const [filters, setFilters] = useState(() => parseFilters(routeSearch));
  const deferredQuery = useDeferredValue(filters.query);
  const gridRef = useRef(null);
  const filterSignature = `${routeSearch}`;
  const lastRouteSearch = useRef(routeSearch);
  const cardLayout = CARD_LAYOUTS.includes(cardUI.cardLayout) ? cardUI.cardLayout : "grid";
  const isRail = cardLayout === "rail" || cardLayout === "depth";
  const gridLayoutClass = isRail || cardLayout === "grid" ? "" : ` is-card-${cardLayout}`;

  useEffect(() => {
    if (lastRouteSearch.current === filterSignature) return;
    lastRouteSearch.current = filterSignature;
    setFilters(parseFilters(routeSearch));
  }, [filterSignature, routeSearch]);

  const collections = useMemo(
    () => getOrderedCollections(catalog.collections),
    [catalog.collections],
  );

  const filtered = useMemo(() => filterProjects(catalog.projects, {
    query: deferredQuery,
    collection: filters.collection,
    category: filters.category,
    technology: filters.technology,
  }), [catalog.projects, deferredQuery, filters.collection, filters.category, filters.technology]);

  const sorted = useMemo(() => sortProjects(filtered, filters.sort), [filtered, filters.sort]);
  const pagination = useMemo(
    () => paginateProjects(sorted, filters.page, isRail ? PROJECTS_PER_RAIL_PAGE : PROJECTS_PER_PAGE),
    [sorted, filters.page, isRail],
  );

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
          <CollectionShelf
            collections={collections}
            projects={catalog.projects}
            activeCollection={filters.collection}
            onSelect={(collection) => update({ collection })}
            label={copy.collectionLabel}
            motion={shelfMotion}
            shelf3d={shelf3d}
          />
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
            <SelectField
              id="catalog-category"
              label={copy.categoryLabel}
              icon="category"
              value={filters.category}
              onChange={(value) => update({ category: value })}
              options={[
                { value: "", label: copy.allCategories },
                ...catalog.categories.map((category) => ({ value: category.label, label: category.label, count: category.count })),
              ]}
            />
            <SelectField
              id="catalog-technology"
              label={copy.technologyLabel}
              icon="technology"
              value={filters.technology}
              onChange={(value) => update({ technology: value })}
              options={[
                { value: "", label: copy.allTechnologies },
                ...catalog.technologies.map((technology) => ({ value: technology.label, label: technology.label, count: technology.count })),
              ]}
            />
            <SelectField
              id="catalog-sort"
              label={copy.sortLabel}
              icon="sort"
              value={filters.sort}
              onChange={(value) => update({ sort: value })}
              options={[
                { value: "curated", label: copy.sortOptions.curated },
                { value: "titleAsc", label: copy.sortOptions.titleAsc },
                { value: "titleDesc", label: copy.sortOptions.titleDesc },
              ]}
            />
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
              isRail ? (
                <ProjectSlider
                  projects={pagination.items}
                  layout={cardLayout}
                  cardUI={cardUI}
                  effects={cardEffects}
                  onNavigate={onNavigate}
                  resetKey={`${filterSignature}|${pagination.page}`}
                  className="lab-catalog-grid"
                />
              ) : (
                <div className={`lab-project-grid lab-catalog-grid${gridLayoutClass}`}>
                  {pagination.items.map((project) => (
                    <ProjectCard key={project.id} project={project} onNavigate={onNavigate} cardUI={cardUI} fx={cardEffects} />
                  ))}
                </div>
              )
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
