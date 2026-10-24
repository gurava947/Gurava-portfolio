import { useEffect, useState } from "react";
import { fetchProjectDetail } from "../services/catalogApi";

export function useProjectDetail(id) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    let active = true;
    if (!id) {
      setDetail(null);
      setError("");
      setIsLoading(false);
      return undefined;
    }
    setIsLoading(true);
    setError("");
    setDetail((current) => (current?.id === id ? current : null));
    fetchProjectDetail(id)
      .then((result) => {
        if (!active) return;
        setDetail(result);
      })
      .catch((requestError) => {
        if (!active) return;
        setDetail(null);
        setError(requestError.message || "The project details could not be loaded.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, requestId]);

  return { detail, error, isLoading, retry: () => setRequestId((current) => current + 1) };
}
