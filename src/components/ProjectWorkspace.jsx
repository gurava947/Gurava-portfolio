import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LoaderOverlay } from "./LoadSpinner";

function publicPath(path) {
  const base = import.meta.env.BASE_URL || "/";
  return `${base.endsWith("/") ? base : `${base}/`}${path}`;
}

function projectTestCases(project) {
  const cases = project?.data?.tests?.cases;
  if (!Array.isArray(cases)) return [];
  return cases
    .filter((testCase) => testCase && typeof testCase.id === "string" && testCase.id.trim())
    .map((testCase) => ({
      id: testCase.id,
      name: testCase.name || testCase.id,
      input: typeof testCase.input === "string" ? testCase.input : "",
      ...(typeof testCase.inputPlaceholder === "string" ? { inputPlaceholder: testCase.inputPlaceholder } : {}),
      expectedOutput: typeof testCase.expectedOutput === "string" ? testCase.expectedOutput : "",
    }));
}

function projectBrief(project) {
  const brief = project?.data?.brief;
  if (!brief || typeof brief.summary !== "string") return undefined;
  return {
    ...brief,
    sections: Array.isArray(brief.sections) ? brief.sections : [],
    sampleInput: typeof brief.sampleInput === "string" ? brief.sampleInput : "",
  };
}

export function buildWorkspaceConfig(project) {
  const data = project?.data || {};
  return {
    projectId: project.id,
    title: project.title,
    language: data.language || "Python 3.10",
    runtime: data.runtime || "Python 3.10 · Pyodide",
    initialCode: data.initialCode || "",
    initialCases: projectTestCases(project),
    submissions: [],
    languageLocked: data.languageLocked !== false,
    brief: projectBrief(project),
    initialTab: "Description",
  };
}

export function buildPreviewConfig(project) {
  const data = project?.data || {};
  return {
    projectId: project.id,
    title: project.title,
    language: data.language || "Python 3.10",
    runtime: data.runtime || "Python 3.10 · Pyodide",
    code: data.initialCode || "",
    cases: projectTestCases(project),
  };
}

function matchesFrame(event, frame) {
  return event.origin === window.location.origin && event.source === frame?.contentWindow;
}

export function ProjectWorkspace({ project, runRequest = 0, onStatus, loader }) {
  const frameRef = useRef(null);
  const retryTimers = useRef([]);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 680px)").matches);
  const [contentHeight, setContentHeight] = useState(0);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const config = useMemo(() => buildWorkspaceConfig(project), [project]);

  const postConfig = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: "playground:config", config },
      window.location.origin
    );
  }, [config]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 680px)");
    const update = () => setCompact(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setRuntimeReady(false);
    const fallback = window.setTimeout(() => setRuntimeReady(true), 60000);
    return () => window.clearTimeout(fallback);
  }, [project.id]);

  useEffect(() => {
    const receive = (event) => {
      if (!matchesFrame(event, frameRef.current) || !event.data || typeof event.data !== "object") return;
      if (event.data.type === "playground:ready") postConfig();
      else if (event.data.type === "playground:status") {
        setRuntimeReady(true);
        onStatus?.(event.data);
      } else if (event.data.type === "playground:resize" && Number.isFinite(event.data.height)) {
        setContentHeight(Math.max(720, Math.min(2400, Math.ceil(event.data.height))));
      }
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onStatus, postConfig]);

  useEffect(() => {
    if (!runRequest) return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "playground:run" },
      window.location.origin
    );
  }, [runRequest]);

  useEffect(() => () => retryTimers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const handleLoad = () => {
    retryTimers.current.forEach((timer) => window.clearTimeout(timer));
    retryTimers.current = [0, 700, 1600].map((delay) => window.setTimeout(postConfig, delay));
  };

  const height = compact && contentHeight ? `${contentHeight}px` : undefined;

  return (
    <div className="project-workspace-shell">
      <iframe
        ref={frameRef}
        className="project-workspace-frame"
        src={publicPath("playground/index.html?embed=1")}
        title={`${project.title} Python workspace`}
        style={height ? { height } : undefined}
        onLoad={handleLoad}
      />
      {!runtimeReady && (
        <LoaderOverlay settings={loader} label="Starting the Python playground" className="project-workspace-loading" />
      )}
    </div>
  );
}

export function ProjectPreviewFrame({ project, runRequest = 0, onStatus }) {
  const frameRef = useRef(null);
  const retryTimers = useRef([]);
  const config = useMemo(() => buildPreviewConfig(project), [project]);

  const postConfig = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: "preview:config", config },
      window.location.origin
    );
  }, [config]);

  useEffect(() => {
    const receive = (event) => {
      if (!matchesFrame(event, frameRef.current) || !event.data || typeof event.data !== "object") return;
      if (event.data.type === "preview:ready") postConfig();
      else if (event.data.type === "preview:status") onStatus?.(event.data);
    };
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [onStatus, postConfig]);

  useEffect(() => {
    if (!runRequest) return;
    frameRef.current?.contentWindow?.postMessage(
      { type: "preview:run" },
      window.location.origin
    );
  }, [runRequest]);

  useEffect(() => () => retryTimers.current.forEach((timer) => window.clearTimeout(timer)), []);

  const handleLoad = () => {
    retryTimers.current.forEach((timer) => window.clearTimeout(timer));
    retryTimers.current = [0, 700, 1600].map((delay) => window.setTimeout(postConfig, delay));
  };

  return (
    <iframe
      ref={frameRef}
      className="project-preview-frame"
      src={publicPath("playground/preview.html?embed=1")}
      title={`${project.title} mobile preview`}
      onLoad={handleLoad}
    />
  );
}
