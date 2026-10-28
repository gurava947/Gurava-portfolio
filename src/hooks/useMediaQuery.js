import { useEffect, useState } from "react";

/* A tiny matchMedia reader for the few layouts that are a different design rather than a
 * different size — the collection shelf, which becomes one full-width card on a phone.
 * Returns false when the browser cannot answer, so the desktop layout is the fallback. */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => read(query));

  useEffect(() => {
    setMatches(read(query));
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;
    const list = window.matchMedia(query);
    const onChange = (event) => setMatches(event.matches);
    if (typeof list.addEventListener === "function") {
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    }
    // Safari before 14 only has the deprecated listener pair.
    list.addListener(onChange);
    return () => list.removeListener(onChange);
  }, [query]);

  return matches;
}

function read(query) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia(query).matches;
}
