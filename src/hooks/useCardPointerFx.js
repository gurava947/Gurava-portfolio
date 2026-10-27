import { useEffect, useRef } from "react";
import { getEffectIntensity, normalizeCardEffects } from "../config/cardEffects";
import { prefersReducedMotion } from "../utils/motion";

const POINTER_EFFECTS = new Set(["tilt", "parallax", "spotlight"]);

export function useCardPointerFx({ ref, effect, effects }) {
  const settings = normalizeCardEffects(effects);
  const active = settings.enabled && POINTER_EFFECTS.has(effect);
  const pointer = useRef({ active, level: getEffectIntensity(settings.intensity) });
  const frame = useRef(0);
  const point = useRef(null);

  pointer.current = { active, level: getEffectIntensity(settings.intensity) };

  useEffect(() => () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
  }, []);

  const write = () => {
    frame.current = 0;
    const node = ref?.current;
    const next = point.current;
    if (!node || !next) return;
    const rect = node.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.max(-1, Math.min(1, ((next.x - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((next.y - rect.top) / rect.height - 0.5) * 2));
    const { level } = pointer.current;
    node.style.setProperty("--fx-rx", `${(y * level.tilt * -0.65).toFixed(2)}deg`);
    node.style.setProperty("--fx-ry", `${(x * level.tilt).toFixed(2)}deg`);
    node.style.setProperty("--fx-px", `${(-x * level.shift * 2).toFixed(2)}px`);
    node.style.setProperty("--fx-py", `${(-y * level.shift * 2).toFixed(2)}px`);
    node.style.setProperty("--fx-mx", `${((x + 1) * 50).toFixed(1)}%`);
    node.style.setProperty("--fx-my", `${((y + 1) * 50).toFixed(1)}%`);
  };

  const schedule = () => {
    if (frame.current) return;
    frame.current = window.requestAnimationFrame(write);
  };

  const onPointerMove = (event) => {
    if (!pointer.current.active || event.pointerType !== "mouse" || prefersReducedMotion()) return;
    point.current = { x: event.clientX, y: event.clientY };
    schedule();
  };

  const onPointerLeave = () => {
    if (frame.current) window.cancelAnimationFrame(frame.current);
    frame.current = 0;
    point.current = null;
    const node = ref?.current;
    if (!node) return;
    node.style.setProperty("--fx-rx", "0deg");
    node.style.setProperty("--fx-ry", "0deg");
    node.style.setProperty("--fx-px", "0px");
    node.style.setProperty("--fx-py", "0px");
    node.style.setProperty("--fx-mx", "50%");
    node.style.setProperty("--fx-my", "50%");
  };

  if (!active) return {};
  return { onPointerMove, onPointerLeave };
}
