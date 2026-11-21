import { createElement, useCallback, useEffect, useId, useRef, useState } from "react";
import CardHoverPreview from "../components/CardHoverPreview";

const HOVER_DELAY_MS = 380;
const LONG_PRESS_DELAY_MS = 500;

function getPoint(event) {
  const bounds = event.currentTarget.getBoundingClientRect();
  return {
    x: Number.isFinite(event.clientX) ? event.clientX : bounds.left + bounds.width / 2,
    y: Number.isFinite(event.clientY) ? event.clientY : bounds.top + bounds.height / 2,
  };
}

export default function useCardHoverPreview(content, enabled = true) {
  const tooltipId = `card-hover-preview-${useId().replace(/:/g, "")}`;
  const timerRef = useRef(0);
  const suppressTimerRef = useRef(0);
  const animationFrameRef = useRef(0);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const longPressRef = useRef(false);
  const suppressClickRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [point, setPoint] = useState(lastPointRef.current);

  const clearTimer = useCallback(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = 0;
  }, []);

  const updatePoint = useCallback((event) => {
    lastPointRef.current = getPoint(event);
    if (!isOpen || animationFrameRef.current) return;
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = 0;
      setPoint(lastPointRef.current);
    });
  }, [isOpen]);

  const openAt = useCallback((event) => {
    const nextPoint = getPoint(event);
    lastPointRef.current = nextPoint;
    setPoint(nextPoint);
    setIsOpen(true);
  }, []);

  const openAtLatestPoint = useCallback(() => {
    setPoint(lastPointRef.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    clearTimer();
    setIsOpen(false);
  }, [clearTimer]);

  const handlePointerEnter = useCallback((event) => {
    if (!enabled || (event.pointerType !== "mouse" && event.pointerType !== "pen")) return;
    lastPointRef.current = getPoint(event);
    clearTimer();
    timerRef.current = window.setTimeout(openAtLatestPoint, HOVER_DELAY_MS);
  }, [clearTimer, enabled, openAtLatestPoint]);

  const handlePointerMove = useCallback((event) => {
    if (enabled) updatePoint(event);
  }, [enabled, updatePoint]);

  const handlePointerLeave = useCallback((event) => {
    if (event.pointerType === "touch") longPressRef.current = false;
    close();
  }, [close]);

  const handlePointerDown = useCallback((event) => {
    if (!enabled || event.pointerType !== "touch") return;
    lastPointRef.current = getPoint(event);
    clearTimer();
    window.clearTimeout(suppressTimerRef.current);
    longPressRef.current = false;
    suppressClickRef.current = false;
    timerRef.current = window.setTimeout(() => {
      longPressRef.current = true;
      suppressClickRef.current = true;
      openAtLatestPoint();
    }, LONG_PRESS_DELAY_MS);
  }, [clearTimer, enabled, openAtLatestPoint]);

  const handlePointerUp = useCallback((event) => {
    if (event.pointerType !== "touch") return;
    clearTimer();
    if (longPressRef.current) setIsOpen(false);
    longPressRef.current = false;
    if (suppressClickRef.current) {
      window.clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 1000);
    }
  }, [clearTimer]);

  const handlePointerCancel = useCallback(() => {
    clearTimer();
    longPressRef.current = false;
    suppressClickRef.current = false;
    window.clearTimeout(suppressTimerRef.current);
    setIsOpen(false);
  }, [clearTimer]);

  const handleFocus = useCallback((event) => {
    if (enabled) openAt(event);
  }, [enabled, openAt]);

  const handleBlur = useCallback((event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  }, [close]);

  const handleClickCapture = useCallback((event) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
    window.clearTimeout(suppressTimerRef.current);
  }, []);

  const handleContextMenu = useCallback((event) => {
    if (!longPressRef.current && !suppressClickRef.current) return;
    event.preventDefault();
  }, []);

  useEffect(() => () => {
    window.clearTimeout(timerRef.current);
    window.clearTimeout(suppressTimerRef.current);
    if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
  }, []);

  return {
    isOpen: enabled && isOpen,
    tooltipId,
    triggerProps: {
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
      onFocusCapture: handleFocus,
      onBlurCapture: handleBlur,
      onClickCapture: handleClickCapture,
      onContextMenu: handleContextMenu,
    },
    preview: enabled && isOpen
      ? createElement(CardHoverPreview, { id: tooltipId, content, point })
      : null,
  };
}
