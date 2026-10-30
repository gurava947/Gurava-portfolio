import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { DEFAULT_SHELF_MOTION, getShelfMotionStyles, normalizeShelfMotion } from "../config/cardMotion";
import { DEFAULT_SHELF_3D, getShelf3dAttributes, getShelf3dStyles, normalizeShelf3d } from "../config/shelf3d";
import { prefersReducedMotion } from "../utils/motion";
import "../styles/collection-shelf.css";

const SCROLL_KEYS = ["ArrowLeft", "ArrowRight", "Home", "End"];

function previewsFor(inCollection) {
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
  shelf3d = DEFAULT_SHELF_3D,
  preview = false,
}) {
  const settings = normalizeShelfMotion(motion);
  const geometry = normalizeShelf3d(shelf3d);
  const [scrollState, setScrollState] = useState({ start: true, end: true, progress: 0, fraction: 1 });
  const trackRef = useRef(null);
  const frameRef = useRef(0);
  const idPrefix = useId().replace(/:/g, "");
  const hintId = `${idPrefix}-shelf-hint`;
  // One window at a time, sliding sideways. The phone shape carries all the way up because it is
  // the only one that keeps the label panel the size of its text; the stylesheet widens the card on
  // larger screens and, once there is real room for it, lets up to four windows share the row.
  const previewsById = useMemo(() => {
    // One pass to group the catalogue, then a card per collection: filtering the whole list once per
    // collection is O(collections x projects) and it re-runs every time this component remounts.
    const grouped = new Map();
    projects.forEach((project) => {
      const bucket = grouped.get(project.collection);
      if (bucket) bucket.push(project);
      else grouped.set(project.collection, [project]);
    });
    const map = new Map();
    collections.forEach((collection) => map.set(collection.id, previewsFor(grouped.get(collection.id) || [])));
    return map;
  }, [collections, projects]);

  const syncEdges = () => {
    const node = trackRef.current;
    if (!node) return;
    const visible = node.clientWidth;
    const total = node.scrollWidth;
    const position = node.scrollLeft;
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
    const position = node.scrollLeft
      + (itemRect.left + itemRect.width / 2)
      - (trackRect.left + trackRect.width / 2);
    if (typeof node.scrollTo === "function") {
      node.scrollTo({ left: position, behavior });
      return;
    }
    try {
      node.scrollLeft = position;
    } catch {
      // Non-browser test environments expose a read-only scroll position.
    }
  }, []);

  const nearestIndex = useCallback(() => {
    const node = trackRef.current;
    if (!node) return 0;
    const items = Array.from(node.querySelectorAll(".collection-shelf-item"));
    const rect = node.getBoundingClientRect();
    const center = rect.left + (node.clientWidth || rect.width) / 2;
    let nearest = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    items.forEach((item, index) => {
      const box = item.getBoundingClientRect();
      const distance = Math.abs((box.left + box.width / 2) - center);
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
      if (!node) return;
      const extent = node.scrollWidth - node.clientWidth;
      if (extent <= 2) return;
      didCenterOnLoad.current = true;
      centerCard(Math.floor(collections.length / 2), "auto");
    });
    return () => window.cancelAnimationFrame(frame);
  }, [preview, activeCollection, collections.length, centerCard]);

  const handleKeyDown = (event) => {
    if (!SCROLL_KEYS.includes(event.key)) return;
    const forwards = event.key === "ArrowRight";
    const backwards = event.key === "ArrowLeft";
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

  const style = { ...getShelfMotionStyles(settings), ...getShelf3dStyles(geometry) };
  const shelf3dAttributes = getShelf3dAttributes(geometry);
  const stateClass = `${settings.preset !== "studio" ? " has-motion" : ""}${preview ? " is-preview" : ""}`;

  if (preview) {
    return (
      <div
        className={`collection-shelf${stateClass}`}
        data-shelf-motion={settings.preset}
        style={style}
        data-preview="true"
        {...shelf3dAttributes}
      >
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
      style={{ ...style, "--shelf-items": collections.length }}
      {...shelf3dAttributes}
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
              aria-label="Scroll collections left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6" /></svg>
            </button>
            <button
              type="button"
              className="collection-shelf-button"
              onClick={() => stepShelf(1)}
              disabled={scrollState.end}
              aria-label="Scroll collections right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9.5 6 6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
      <p id={hintId} className="visually-hidden">
        Use the left and right arrow keys to move between collections.
      </p>
    </div>
  );
}
