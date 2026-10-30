import { useEffect, useRef, useState } from "react";
import { isThree3dActive, normalizeThree3d } from "../config/three3d";

/* The band, measured from the viewport middle, that decides which surface the stage is serving. Two
   45% insets leave a narrow strip across the centre of the screen: the surface crossing it is the one
   the reader is actually looking at, and the two surfaces either side of a boundary cannot both claim
   it, which is what makes the modulation settle instead of flicker while scrolling. */
const SURFACE_ROOT_MARGIN = "-45% 0px -45% 0px";
const SURFACE_RESCAN_MS = 400;

/* The React host for the 3D stage.

   Its whole job is to keep the engine out of the page until a style is asked for. While the setting
   is `off` this renders nothing at all — no canvas, no effect, and crucially no `import()` — so the
   Three.js/GSAP chunk is never requested and the flat design is untouched. */
export default function Three3DStage({
  settings,
  projects = [],
  palette,
  reducedMotion = false,
  onStats,
  fallback = null,
  className = "",
  observeSurfaces = false,
  surface = null,
}) {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const [unsupported, setUnsupported] = useState(false);
  /* Bumped when the engine has actually arrived, so the effects that need a live stage — surface
     observation and the stats poll — can wait for it instead of racing the dynamic import. */
  const [readyAt, setReadyAt] = useState(0);
  const normalized = normalizeThree3d(settings);
  const active = normalized.style !== "off";
  const latest = useRef(null);
  latest.current = { settings: normalized, projects, palette, reducedMotion, onStats };

  /* The engine compares its own settings, so it is driven by the values rather than by prop
     identity: the App passes a freshly built palette object on every render, and reacting to that
     would push a redundant update — and one more composited frame while paused — through the stage. */
  const revision = JSON.stringify([
    normalized,
    palette || null,
    reducedMotion,
    projects.length,
  ]);

  useEffect(() => {
    if (!active || unsupported) return undefined;
    let cancelled = false;
    let stage = null;

    import("../three/stage3d")
      .then((engine) => {
        if (cancelled) return;
        stage = engine.createThree3DStage({
          canvas: canvasRef.current,
          projects: latest.current.projects,
          palette: latest.current.palette,
          settings: latest.current.settings,
          reducedMotion: latest.current.reducedMotion,
        });
        if (!stage) {
          setUnsupported(true);
          return;
        }
        stageRef.current = stage;
        setReadyAt((value) => value + 1);
        latest.current.onStats?.(stage.getStats());
      })
      .catch(() => {
        if (!cancelled) setUnsupported(true);
      });

    return () => {
      cancelled = true;
      stage?.dispose();
      if (stageRef.current === stage) stageRef.current = null;
    };
  }, [active, unsupported]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const current = latest.current;
    stage.update(current.settings, {
      palette: current.palette,
      reducedMotion: current.reducedMotion,
      ...(current.projects.length ? { projects: current.projects } : {}),
    });
    current.onStats?.(stage.getStats());
  }, [active, revision]);

  /* Which surface of the page the stage should be serving. Only the site-level instance does this —
     the studio preview has no page around it, and observing the document from inside a dialog would
     make the preview answer to whatever happens to be behind the overlay.

     Observed, not measured on scroll, for the same reason the studio's section chips are: a handler
     on scroll runs layout on every frame of a flick. The scan re-runs when the DOM changes because
     the surfaces are not all present at mount — the catalogue paints after first frame and a route
     swap replaces the region wholesale — and the debounce keeps a busy paint from re-attaching the
     observer once per inserted node. */
  useEffect(() => {
    if (!active || unsupported || !observeSurfaces || !readyAt) return undefined;
    if (typeof IntersectionObserver === "undefined") return undefined;
    let observer = null;
    let timer = 0;

    const apply = (entries) => {
      let chosen = null;
      let deepest = 0;
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.intersectionRatio < deepest) return;
        deepest = entry.intersectionRatio;
        chosen = entry.target.dataset.three3dSurface;
      });
      if (chosen) stageRef.current?.setSurface(chosen);
    };

    const attach = () => {
      if (!stageRef.current) return;
      const nodes = Array.from(document.querySelectorAll("[data-three3d-surface]"));
      if (!nodes.length) return;
      observer?.disconnect();
      observer = new IntersectionObserver(apply, { rootMargin: SURFACE_ROOT_MARGIN, threshold: [0, 0.5, 1] });
      nodes.forEach((node) => observer.observe(node));
    };

    const rescan = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(attach, SURFACE_RESCAN_MS);
    };

    attach();
    const mutations = typeof MutationObserver === "undefined"
      ? null
      : new MutationObserver(rescan);
    mutations?.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      mutations?.disconnect();
      observer?.disconnect();
    };
  }, [active, unsupported, observeSurfaces, readyAt]);

  /* A stage that is not watching the page still has to be told which surface it is modelling — the
     studio preview asks for the landing profile, so the presence dials show the visitor what they are
     actually setting rather than the sparse fallback every undeclared route gets. */
  useEffect(() => {
    if (!active || unsupported || !readyAt || observeSurfaces || !surface) return;
    stageRef.current?.setSurface(surface);
  }, [active, unsupported, readyAt, observeSurfaces, surface]);

  /* The governor decides once a second, from a window of frames, so a panel that wants to show what
     it decided polls at the same rate rather than on every frame. Nothing runs unless a listener was
     handed in: the site-level stage passes none, so the visitor who never opened the studio pays
     nothing for this. */
  useEffect(() => {
    if (!active || unsupported || !readyAt || !onStats) return undefined;
    const interval = window.setInterval(() => {
      const stage = stageRef.current;
      if (stage) latest.current.onStats?.(stage.getStats());
    }, 1000);
    return () => window.clearInterval(interval);
  }, [active, unsupported, readyAt, onStats]);

  if (!active) return null;
  if (unsupported) return fallback;

  return (
    <div className={`three-3d-stage${className ? ` ${className}` : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className="three-3d-canvas" />
      {normalized.scrim && <span className="three-3d-scrim" />}
    </div>
  );
}
