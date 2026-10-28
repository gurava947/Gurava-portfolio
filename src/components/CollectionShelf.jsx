import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { DEFAULT_SHELF_MOTION, getShelfMotionStyles, normalizeShelfMotion } from "../config/cardMotion";
import useFeaturedAxis from "../hooks/useFeaturedAxis";
import useMediaQuery from "../hooks/useMediaQuery";
import { prefersReducedMotion } from "../utils/motion";
import "../styles/collection-shelf.css";

const SCROLL_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
// Below this the shelf stops being a row of windows and becomes one card at a time, which is the
// only shape that keeps the label panel readable on a phone.
const PHONE_QUERY = "(max-width: 767.98px)";

function previewsFor(projects, collectionId) {
  const inCollection = projects.filter((project) => project.collection === collectionId);
  const images = inCollection
    .filter((project) => project.thumbnail || project.image)
    .slice(0, 3);
  if (images.length) return { images, code: "", output: "", title: "" };
  // A code-only collection still needs a card that says something: prefer a build that carries
  // both a snippet and its output, then fall back to whichever one exists.
  const withBoth = inCollection.find((project) => project.cardCode && project.cardOutput);
  const withCode = inCollection.find((project) => project.cardCode);
  const withOutput = inCollection.find((project) => project.cardOutput);
  const coded = withBoth || withCode || withOutput || null;
  return {
    images: [],
    code: coded?.cardCode || "",
    output: coded?.cardOutput || "",
    title: coded?.title || "",
  };
}

function ShelfCard({ collection, index, total, previews, active, preview, idPrefix, onSelect, onCenter }) {
  const label = `${collection.label}, ${collection.count} projects`;
  const descriptionId = `${idPrefix}-desc-${collection.id}`;
  const content = (
    <>
      <span className="collection-shelf-art" aria-hidden="true">
        {previews.images.length > 0 ? (
          previews.images.map((project) => (
            <img
              key={project.id}
              src={project.thumbnail || project.image}
              alt=""
              loading={preview ? "eager" : "lazy"}
              decoding="async"
            />
          ))
        ) : (
          <span className="collection-shelf-terminal">
            <span className="collection-shelf-terminal-bar"><i /><i /><i />{previews.title && <em>{previews.title}</em>}</span>
            <code>{previews.code}</code>
            {previews.output && <span className="collection-shelf-terminal-output">{previews.output}</span>}
          </span>
        )}
      </span>
      <span className="collection-shelf-sheen" aria-hidden="true" />
      <span className="collection-shelf-glass">
        <span className="collection-shelf-topline">
          <span>Collection</span>
          <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="collection-shelf-name">{collection.label}</span>
        <span className="collection-shelf-count"><b>{collection.count}</b> projects</span>
        <span className="collection-shelf-desc" id={descriptionId}>{collection.description}</span>
        <span className="collection-shelf-cue">
          {active ? "Showing this collection" : "Filter this collection"}
          <span aria-hidden="true"> →</span>
        </span>
      </span>
    </>
  );

  if (preview) {
    return (
      <div className={`collection-shelf-item is-${collection.id}${active ? " is-active" : ""}`} style={{ "--shelf-card-index": index }}>
        <span className="collection-shelf-stack" aria-hidden="true"><i /><i /></span>
        <span className="collection-shelf-reflection" aria-hidden="true" />
        <div className={`collection-shelf-card is-${collection.id}${active ? " is-active" : ""}`}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`collection-shelf-item is-${collection.id}${active ? " is-active" : ""}`} style={{ "--shelf-card-index": index }}>
      <span className="collection-shelf-stack" aria-hidden="true"><i /><i /></span>
      <span className="collection-shelf-reflection" aria-hidden="true" />
      <button
        type="button"
        className={`collection-shelf-card is-${collection.id}${active ? " is-active" : ""}`}
        aria-pressed={active}
        aria-label={label}
        aria-describedby={descriptionId}
        onClick={() => onSelect?.(active ? "" : collection.id)}
        onFocus={() => onCenter?.(index)}
      >
        {content}
      </button>
    </div>
  );
}

export default function CollectionShelf({
  collections = [],
  projects = [],
  activeCollection = "",
  onSelect,
  label = "Collection",
  motion = DEFAULT_SHELF_MOTION,
  preview = false,
}) {
  const settings = normalizeShelfMotion(motion);
  const [scrollState, setScrollState] = useState({ start: true, end: true, progress: 0, fraction: 1 });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const idPrefix = useId().replace(/:/g, "");
  const hintId = `${idPrefix}-shelf-hint`;
  // Same site-wide shuffle direction as the poster rail: the collection cards keep their stacked
  // glass design and just run downward instead of sideways. A phone overrides that to a
  // side-scrolling row of full-width cards, because a stacked column there is three thin strips.
  const featuredAxis = useFeaturedAxis();
  const phone = useMediaQuery(PHONE_QUERY);
  const axis = phone ? "horizontal" : featuredAxis;
  const vertical = axis === "vertical";
  const previewsById = useMemo(() => {
    const map = new Map();
    collections.forEach((collection) => map.set(collection.id, previewsFor(projects, collection.id)));
    return map;
  }, [collections, projects]);

  const syncEdges = () => {
    const node = trackRef.current;
    if (!node) return;
    const visible = vertical ? node.clientHeight : node.clientWidth;
    const total = vertical ? node.scrollHeight : node.scrollWidth;
    const position = vertical ? node.scrollTop : node.scrollLeft;
    const max = total - visible;
    const start = position <= 2;
    const end = position + visible >= total - 2;
    const progress = max > 2 ? Math.min(1, Math.max(0, position / max)) : 0;
    const fraction = total > 0 ? Math.min(1, visible / total) : 1;
    setScrollState((current) => (
      current.start === start
      && current.end === end
      && Math.abs(current.progress - progress) < 0.002
      && Math.abs(current.fraction - fraction) < 0.002
        ? current
        : { start, end, progress, fraction }
    ));
  };

  useEffect(() => {
    if (preview) return undefined;
    syncEdges();
    const frame = window.requestAnimationFrame(syncEdges);
    window.addEventListener("resize", syncEdges, { passive: true });
    let observer;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      observer = new ResizeObserver(syncEdges);
      observer.observe(trackRef.current);
    }
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", syncEdges);
      observer?.disconnect();
    };
    // Edge state only depends on the track, the number of cards and which way it scrolls.
  }, [preview, collections.length, vertical]);

  useEffect(() => () => {
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  }, []);

  const scheduleSync = () => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      syncEdges();
    });
  };

  const centerCard = useCallback((index, behavior = prefersReducedMotion() ? "auto" : "smooth") => {
    const node = trackRef.current;
    if (!node) return;
    const item = node.querySelectorAll(".collection-shelf-item")[index];
    if (!item) return;
    const trackRect = node.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const box = vertical ? "height" : "width";
    const edge = vertical ? "top" : "left";
    const position = (vertical ? node.scrollTop : node.scrollLeft)
      + (itemRect[edge] + itemRect[box] / 2)
      - (trackRect[edge] + trackRect[box] / 2);
    if (typeof node.scrollTo === "function") {
      node.scrollTo(vertical ? { top: position, behavior } : { left: position, behavior });
      return;
    }
    try {
      if (vertical) node.scrollTop = position;
      else node.scrollLeft = position;
    } catch {
      // Non-browser test environments expose a read-only scroll position.
    }
  }, [vertical]);

  const nearestIndex = useCallback(() => {
    const node = trackRef.current;
    if (!node) return 0;
    const items = Array.from(node.querySelectorAll(".collection-shelf-item"));
    const rect = node.getBoundingClientRect();
    const center = vertical
      ? rect.top + (node.clientHeight || rect.height) / 2
      : rect.left + (node.clientWidth || rect.width) / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const box = item.getBoundingClientRect();
      const distance = Math.abs((vertical ? box.top + box.height / 2 : box.left + box.width / 2) - center);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    return nearest;
  }, [vertical]);

  const stepShelf = (direction) => {
    const lastIndex = Math.max(collections.length - 1, 0);
    const next = Math.min(Math.max(nearestIndex() + direction, 0), lastIndex);
    centerCard(next);
  };

  const didCenterOnLoad = useRef(false);

  useEffect(() => {
    if (preview || !activeCollection) return;
    const index = collections.findIndex((collection) => collection.id === activeCollection);
    if (index >= 0) centerCard(index);
  }, [preview, activeCollection, collections, centerCard]);

  useEffect(() => {
    if (preview || activeCollection || didCenterOnLoad.current) return undefined;
    const frame = window.requestAnimationFrame(() => {
      const node = trackRef.current;
      if (!node) return;
      const extent = vertical ? node.scrollHeight - node.clientHeight : node.scrollWidth - node.clientWidth;
      if (extent <= 2) return;
      didCenterOnLoad.current = true;
      centerCard(Math.floor(collections.length / 2), "auto");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [preview, activeCollection, collections.length, centerCard, vertical]);

  const handleKeyDown = (event) => {
    if (!SCROLL_KEYS.includes(event.key)) return;
    const forwards = vertical ? event.key === "ArrowDown" : event.key === "ArrowRight";
    const backwards = vertical ? event.key === "ArrowUp" : event.key === "ArrowLeft";
    if (event.key === "Home") {
      event.preventDefault();
      centerCard(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      centerCard(collections.length - 1);
      return;
    }
    if (!forwards && !backwards) return;
    event.preventDefault();
    stepShelf(forwards ? 1 : -1);
  };

  const style = getShelfMotionStyles(settings);
  const stateClass = `${settings.preset !== "studio" ? " has-motion" : ""}${preview ? " is-preview" : ""}`;

  if (preview) {
    return (
      <div className={`collection-shelf${stateClass}`} data-shelf-motion={settings.preset} style={style} data-preview="true">
        <div className="collection-shelf-track" aria-hidden="true" inert>
          {collections.map((collection, index) => (
            <ShelfCard
              key={collection.id}
              collection={collection}
              index={index}
              total={collections.length}
              previews={previewsById.get(collection.id) || { images: [], code: "", output: "", title: "" }}
              active={activeCollection === collection.id}
              preview
              idPrefix={idPrefix}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`collection-shelf${stateClass}`}
      data-shelf-motion={settings.preset}
      data-axis={axis}
      style={{ ...style, "--shelf-items": collections.length }}
    >
      <div className="collection-shelf-window">
        <div className="collection-shelf-head">
          <span className="collection-shelf-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="collection-shelf-label">{label}</span>
          <span className="collection-shelf-hint">Swipe, scroll, or use the arrows</span>
        </div>
        <div className="collection-shelf-viewport">
          <div
            ref={trackRef}
            className="collection-shelf-track"
            role="region"
            aria-label="Project collections"
            aria-describedby={hintId}
            tabIndex={0}
            onScroll={scheduleSync}
            onKeyDown={handleKeyDown}
          >
            {collections.map((collection, index) => (
              <ShelfCard
                key={collection.id}
                collection={collection}
                index={index}
                total={collections.length}
                previews={previewsById.get(collection.id) || { images: [], code: "", output: "", title: "" }}
                active={activeCollection === collection.id}
                idPrefix={idPrefix}
                onSelect={onSelect}
                onCenter={(cardIndex) => centerCard(cardIndex)}
              />
            ))}
          </div>
          <span className={`collection-shelf-fade is-start${scrollState.start ? " is-hidden" : ""}`} aria-hidden="true" />
          <span className={`collection-shelf-fade is-end${scrollState.end ? " is-hidden" : ""}`} aria-hidden="true" />
        </div>
        <div className="collection-shelf-foot">
          <div className="collection-shelf-progress" aria-hidden="true">
            <i
              style={{
                left: `${scrollState.progress * (1 - scrollState.fraction) * 100}%`,
                width: `${scrollState.fraction * 100}%`,
              }}
            />
          </div>
          <div className="collection-shelf-buttons">
            <button
              type="button"
              className="collection-shelf-button"
              onClick={() => stepShelf(-1)}
              disabled={scrollState.start}
              aria-label={vertical ? "Scroll collections up" : "Scroll collections left"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{vertical
                ? <path d="m6 14.5 6-6 6 6" />
                : <path d="m14.5 6-6 6 6 6" />}</svg>
            </button>
            <button
              type="button"
              className="collection-shelf-button"
              onClick={() => stepShelf(1)}
              disabled={scrollState.end}
              aria-label={vertical ? "Scroll collections down" : "Scroll collections right"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{vertical
                ? <path d="m6 9.5 6 6 6-6" />
                : <path d="m9.5 6 6 6-6 6" />}</svg>
            </button>
          </div>
        </div>
      </div>
      <p id={hintId} className="visually-hidden">
        Use the {vertical ? "up and down arrow" : "left and right arrow"} keys to move between collections.
      </p>
    </div>
  );
}
