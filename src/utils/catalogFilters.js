export const PROJECTS_PER_PAGE = 24;

/* The grid layout shows two screens' worth of cards at once on a desktop, so a rail page of 24
 * would leave its back/forward control with nothing to do. Two pages of the grid keeps the control
 * meaningful on every device — a phone pages through eight screens of six. */
export const PROJECTS_PER_RAIL_PAGE = 48;

export function filterProjects(projects, { query = "", collection = "", category = "", technology = "" }) {
  const needle = query.trim().toLowerCase();
  return projects.filter((project) => {
    if (collection && project.collection !== collection) return false;
    if (category && project.category !== category) return false;
    if (technology && !project.technologies.includes(technology)) return false;
    if (!needle) return true;
    const haystack = [
      project.title,
      project.description,
      project.category,
      project.collectionLabel,
      project.practiceLabel,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function sortProjects(projects, sort = "curated") {
  const sorted = [...projects];
  if (sort === "titleAsc") return sorted.sort((left, right) => left.title.localeCompare(right.title));
  if (sort === "titleDesc") return sorted.sort((left, right) => right.title.localeCompare(left.title));
  return sorted.sort((left, right) => left.sortOrder - right.sortOrder);
}

export function paginateProjects(projects, page = 1, pageSize = PROJECTS_PER_PAGE) {
  const total = projects.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pages);
  const startIndex = (current - 1) * pageSize;
  return {
    items: projects.slice(startIndex, startIndex + pageSize),
    page: current,
    pages,
    total,
    start: total === 0 ? 0 : startIndex + 1,
    end: Math.min(startIndex + pageSize, total),
  };
}

export function pageNumbers(page, pages, span = 5) {
  if (pages <= span) return Array.from({ length: pages }, (_, index) => index + 1);
  const half = Math.floor(span / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(pages, start + span - 1);
  start = Math.max(1, end - span + 1);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
