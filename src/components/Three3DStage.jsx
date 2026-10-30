import { useEffect, useRef, useState } from "react";
import { isThree3dActive, normalizeThree3d } from "../config/three3d";

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
}) {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const [unsupported, setUnsupported] = useState(false);
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

  if (!active) return null;
  if (unsupported) return fallback;

  return (
    <div className={`three-3d-stage${className ? ` ${className}` : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className="three-3d-canvas" />
      {normalized.scrim && <span className="three-3d-scrim" />}
    </div>
  );
}
