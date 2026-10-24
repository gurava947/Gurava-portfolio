import { useCallback, useEffect, useState } from "react";
import { fetchCatalog, readCachedCatalog } from "../services/catalogApi";

export function useCatalog() {
  const [cached] = useState(readCachedCatalog);
  const [catalog, setCatalog] = useState(() => cached?.data || null);
  const [error, setError] = useState("");
  const [isStale, setIsStale] = useState(Boolean(cached?.isStale));
  const [isLoading, setIsLoading] = useState(!cached);
  const [requestId, setRequestId] = useState(0);

  const retry = useCallback(() => setRequestId((current) => current + 1), []);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    fetchCatalog()
      .then((result) => {
        if (!active) return;
        setCatalog(result.data);
        setIsStale(Boolean(result.isStale));
        setError(result.error?.message || "");
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "The catalog could not be loaded.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [requestId]);

  return { catalog, error, isLoading, isStale, retry };
}
