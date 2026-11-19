import { useEffect, useRef, useState } from "react";
import MaterialSymbol from "./MaterialSymbol";

function FloatingContactWindow({
  item,
  stackIndex,
  windowOrder,
  zIndex,
  onBringToFront,
  onClose,
  onMinimize,
  onNavigate,
}) {
  const windowRef = useRef(null);
  const dragRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const titleId = `footer-contact-window-title-${item.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  const handlePointerDown = (event) => {
    if (event.button !== 0 || event.target.closest("button, a")) return;
    const bounds = windowRef.current?.getBoundingClientRect();
    if (!bounds) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      left: bounds.left,
      top: bounds.top,
    };
    setPosition({ left: bounds.left, top: bounds.top });
    setIsDragging(true);
    onBringToFront(item.id);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const bounds = windowRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const maxLeft = Math.max(8, window.innerWidth - bounds.width - 8);
    const maxTop = Math.max(8, window.innerHeight - bounds.height - 8);
    const left = Math.min(maxLeft, Math.max(8, drag.left + event.clientX - drag.startX));
    const top = Math.min(maxTop, Math.max(8, drag.top + event.clientY - drag.startY));
    setPosition({ left, top });
  };

  const stopDragging = (event) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const closeAndRestoreFocus = () => {
    onClose(item.id);
    window.requestAnimationFrame(() => {
      const trigger = Array.from(document.querySelectorAll("[data-footer-contact-id]"))
        .find((element) => element.dataset.footerContactId === item.id);
      trigger?.focus();
    });
  };

  return (
    <section
      className={`footer-contact-window${isDragging ? " is-dragging" : ""}`}
      ref={windowRef}
      role="dialog"
      aria-labelledby={titleId}
      style={{
        "--footer-contact-window-stack": stackIndex,
        "--footer-contact-window-order": windowOrder,
        zIndex,
        ...(position ? { ...position, right: "auto", bottom: "auto" } : {}),
      }}
      onPointerDownCapture={() => onBringToFront(item.id)}
    >
      <header
        className="footer-contact-window-head"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
      >
        <div className="footer-contact-window-heading">
          <span className="footer-contact-window-icon"><MaterialSymbol name={item.icon} /></span>
          <div>
            <h2 id={titleId}>{item.label}</h2>
            <p>Contact window</p>
          </div>
        </div>
        <div className="footer-contact-window-controls">
          <button type="button" aria-label={`Minimize ${item.label} window`} onClick={() => onMinimize(item.id)}>
            <MaterialSymbol name="remove" />
          </button>
          <button type="button" aria-label={`Close ${item.label} window`} onClick={closeAndRestoreFocus}>
            <MaterialSymbol name="close" />
          </button>
        </div>
      </header>

      <div className="footer-contact-window-body">
        <p className="footer-contact-window-eyebrow">Stay connected</p>
        <div className="footer-contact-window-preview">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
        <a
          className="footer-contact-window-action"
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noopener noreferrer" : undefined}
          onClick={(event) => {
            if (!item.internal) return;
            onClose(item.id);
            onNavigate(event, item.href);
          }}
        >
          <span>{item.actionLabel}</span>
          <MaterialSymbol name={item.external ? "open_in_new" : "arrow_forward"} />
        </a>
        <p className="footer-contact-window-hint">Drag the top bar to move this window · Esc to close</p>
      </div>
    </section>
  );
}

export default function FooterContactWindows({
  items,
  openIds,
  minimizedIds,
  onOpen,
  onClose,
  onMinimize,
  onNavigate,
}) {
  const itemById = new Map(items.map((item) => [item.id, item]));
  const visibleIds = openIds.filter((id) => itemById.has(id) && !minimizedIds.includes(id));
  const minimizedItems = openIds.filter((id) => itemById.has(id) && minimizedIds.includes(id))
    .map((id) => itemById.get(id));

  useEffect(() => {
    if (!visibleIds.length) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose(visibleIds[visibleIds.length - 1]);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visibleIds.join("|"), onClose]);

  if (!visibleIds.length && !minimizedItems.length) return null;

  return (
    <>
      {visibleIds.length > 0 && (
        <div className={`footer-contact-window-layer${minimizedItems.length ? " has-minimized" : ""}`}>
          {visibleIds.map((id, index) => (
            <FloatingContactWindow
              key={id}
              item={itemById.get(id)}
              stackIndex={visibleIds.length - index - 1}
              windowOrder={index}
              zIndex={1300 + index}
              onBringToFront={onOpen}
              onClose={onClose}
              onMinimize={onMinimize}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
      {minimizedItems.length > 0 && (
        <div className="footer-contact-minimized" aria-label="Minimized contact windows">
          {minimizedItems.map((item) => (
            <div className="footer-contact-minimized-item" key={item.id}>
              <button type="button" aria-label={`Restore ${item.label} window`} onClick={() => onOpen(item.id)}>
                <MaterialSymbol name={item.icon} />
                <span>{item.label}</span>
              </button>
              <button type="button" aria-label={`Close ${item.label} window`} onClick={() => onClose(item.id)}>
                <MaterialSymbol name="close" />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
