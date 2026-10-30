/* The bio quotes figures, and the only honest source for a figure is the catalogue the page already
   renders. A token the catalogue cannot answer leaves its sentence without a number rather than
   inventing one, so the copy can never drift ahead of the work it is describing. */
export function fillBioTokens(template, figures) {
  if (!template) return "";
  return template
    .replace(/\{(\w+)\}/g, (match, key) => (figures[key] === undefined ? "" : String(figures[key])))
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function profileBioFigures(profile, collections = []) {
  const figures = { name: (profile?.name || "").trim() };
  collections.forEach(({ id, count }) => { figures[id] = count; });
  return figures;
}
