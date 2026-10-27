import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { DEFAULT_SHELF_MOTION, getShelfMotionStyles, normalizeShelfMotion } from "../config/cardMotion";
import { prefersReducedMotion } from "../utils/motion";
import "../styles/collection-shelf.css";

const SCROLL_KEYS = ["ArrowLeft", "ArrowRight", "Home", "End"];

function previewsFor(projects, collectionId) {
  const inCollection = projects.filter((project) => project.collection === collectionId);
  const images = inCollection
    .filter((project) => project.thumbnail || project.image)
    .slice(0, 3);
  if (images.length) return { images, code: "", output: "" };
  const coded = inCollection.find((project) => project.cardCode) || null;
  return { images: [], code: coded?.cardCode || "", output: coded?.cardOutput || "" };
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
            <span className="collection-shelf-terminal-bar"><i /><i /><i /></span>
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
  const [edge, setEdge] = useState({ start: true, end: true });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const idPrefix = useId().replace(/:/g, "");
  const hintId = `${idPrefix}-shelf-hint`;
  const previewsById = useMemo(() => {
    const map = new Map();
    collections.forEach((collection) => map.set(collection.id, previewsFor(projects, collection.id)));
    return map;
  }, [collections, projects]);

  const syncEdges = () => {
    const node = trackRef.current;
    if (!node) return;
    const start = node.scrollLeft <= 2;
    const end = node.scrollLeft + node.clientWidth >= node.scrollWidth - 2;
    setEdge((current) => (current.start === start && current.end === end ? current : { start, end }));
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
    // Edge state only depends on the track and the number of cards.
  }, [preview, collections.length]);

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
    const left = node.scrollLeft + (itemRect.left + itemRect.width / 2) - (trackRect.left + trackRect.width / 2);
    if (typeof node.scrollTo === "function") {
      node.scrollTo({ left, behavior });
      return;
    }
    try {
      node.scrollLeft = left;
    } catch {
      // Non-browser test environments expose a read-only scrollLeft.
    }
  }, []);

  const nearestIndex = useCallback(() => {
    const node = trackRef.current;
    if (!node) return 0;
    const items = Array.from(node.querySelectorAll(".collection-shelf-item"));
    const center = node.getBoundingClientRect().left + node.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left + rect.width / 2 - center);
      if (distance < nearestDistance) {
        nearest = index;
        nearestDistance = distance;
      }
    });
    return nearest;
  }, []);

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
      if (!node || node.scrollWidth <= node.clientWidth + 2) return;
      didCenterOnLoad.current = true;
      centerCard(Math.floor(collections.length / 2), "auto");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [preview, activeCollection, collections.length, centerCard]);

  const handleKeyDown = (event) => {
    if (!SCROLL_KEYS.includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Home") centerCard(0);
    else if (event.key === "End") centerCard(collections.length - 1);
    else stepShelf(event.key === "ArrowRight" ? 1 : -1);
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
              previews={previewsById.get(collection.id) || { images: [], code: "", output: "" }}
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
    <div className={`collection-shelf${stateClass}`} data-shelf-motion={settings.preset} style={style}>
      <div className="collection-shelf-window">
        <div className="collection-shelf-head">
          <span className="collection-shelf-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="collection-shelf-label">{label}</span>
          <span className="collection-shelf-hint">Swipe, scroll, or use the arrows</span>
          <div className="collection-shelf-buttons">
            <button
              type="button"
              className="collection-shelf-button"
              onClick={() => stepShelf(-1)}
              disabled={edge.start}
              aria-label="Scroll collections left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6" /></svg>
            </button>
            <button
              type="button"
              className="collection-shelf-button"
              onClick={() => stepShelf(1)}
              disabled={edge.end}
              aria-label="Scroll collections right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
            </button>
          </div>
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
                previews={previewsById.get(collection.id) || { images: [], code: "", output: "" }}
                active={activeCollection === collection.id}
                idPrefix={idPrefix}
                onSelect={onSelect}
                onCenter={(cardIndex) => centerCard(cardIndex)}
              />
            ))}
          </div>
          <span className={`collection-shelf-fade is-start${edge.start ? " is-hidden" : ""}`} aria-hidden="true" />
          <span className={`collection-shelf-fade is-end${edge.end ? " is-hidden" : ""}`} aria-hidden="true" />
        </div>
      </div>
      <p id={hintId} className="visually-hidden">Use the left and right arrow keys to move between collections.</p>
    </div>
  );
}
