import { useEffect, useMemo, useRef, useState } from "react";
import MaterialSymbol from "./MaterialSymbol";

const ORDER_STORAGE_KEY = "practicefolio.footer-contact-order.v1";

function readSavedOrder() {
  try {
    const saved = window.localStorage.getItem(ORDER_STORAGE_KEY);
    if (!saved) return [];
    const order = JSON.parse(saved);
    return Array.isArray(order) && order.every((id) => typeof id === "string") ? order : [];
  } catch (error) {
    console.warn("Unable to read the saved footer contact order.", error);
    return [];
  }
}

function itemDomId(id) {
  return `footer-contact-item-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

export default function FooterContactDrawer({ items, activeId, onSelect, onClose, onNavigate }) {
  const [savedOrder, setSavedOrder] = useState(readSavedOrder);
  const [draggedId, setDraggedId] = useState("");
  const [dropTargetId, setDropTargetId] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const closeButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const activeItem = items.find((item) => item.id === activeId);
  const orderedItems = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const ids = [
      ...savedOrder.filter((id, index) => byId.has(id) && savedOrder.indexOf(id) === index),
      ...items.map((item) => item.id).filter((id) => !savedOrder.includes(id)),
    ];
    return ids.map((id) => byId.get(id));
  }, [items, savedOrder]);

  useEffect(() => {
    if (!activeItem) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll("button:not(:disabled), a[href]"))
        .filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [activeItem, onClose]);

  if (!activeItem) return null;

  const reorder = (sourceId, targetId) => {
    if (!sourceId || !targetId || sourceId === targetId) return;
    const ids = orderedItems.map((item) => item.id);
    const sourceIndex = ids.indexOf(sourceId);
    const targetIndex = ids.indexOf(targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;
    ids.splice(sourceIndex, 1);
    ids.splice(targetIndex, 0, sourceId);
    setSavedOrder(ids);
    setAnnouncement(`${orderedItems.find((item) => item.id === sourceId)?.label || "Contact"} moved.`);
    try {
      window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(ids));
    } catch (error) {
      console.warn("Unable to save the footer contact order.", error);
    }
  };

  const moveBy = (itemId, offset) => {
    const index = orderedItems.findIndex((item) => item.id === itemId);
    const target = orderedItems[index + offset];
    if (!target) return;
    reorder(itemId, target.id);
    window.requestAnimationFrame(() => document.getElementById(itemDomId(itemId))?.focus());
  };

  const handleDrop = (event, targetId) => {
    event.preventDefault();
    const sourceId = event.dataTransfer?.getData("text/plain") || draggedId;
    reorder(sourceId, targetId);
    setDraggedId("");
    setDropTargetId("");
  };

  return (
    <div
      className="footer-contact-drawer-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="footer-contact-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="footer-contact-drawer-title"
      >
        <header className="footer-contact-drawer-head">
          <div>
            <p className="footer-contact-drawer-eyebrow">Stay connected</p>
            <h2 id="footer-contact-drawer-title">{activeItem.label}</h2>
          </div>
          <button ref={closeButtonRef} className="footer-contact-drawer-close" type="button" aria-label="Close contact panel" onClick={onClose}>
            <MaterialSymbol name="close" />
          </button>
        </header>

        <div className="footer-contact-preview">
          <span className="footer-contact-preview-icon"><MaterialSymbol name={activeItem.icon} /></span>
          <div>
            <span>{activeItem.label}</span>
            <strong>{activeItem.value}</strong>
          </div>
          <a
            className="footer-contact-action"
            href={activeItem.href}
            target={activeItem.external ? "_blank" : undefined}
            rel={activeItem.external ? "noopener noreferrer" : undefined}
            onClick={(event) => {
              if (!activeItem.internal) return;
              onClose();
              onNavigate(event, activeItem.href);
            }}
          >
            <span>{activeItem.actionLabel}</span>
            <MaterialSymbol name={activeItem.external ? "open_in_new" : "arrow_forward"} />
          </a>
        </div>

        <div className="footer-contact-order-heading">
          <div>
            <h3>Contact cards</h3>
            <p>Drag to reorder, or use the arrow controls.</p>
          </div>
          <MaterialSymbol name="drag_indicator" />
        </div>
        <ul className="footer-contact-order-list" aria-label="Reorder contact and profile cards">
          {orderedItems.map((item, index) => (
            <li
              id={itemDomId(item.id)}
              className={`footer-contact-order-item${activeId === item.id ? " is-active" : ""}${dropTargetId === item.id ? " is-drop-target" : ""}`}
              key={item.id}
              aria-grabbed={draggedId === item.id}
              draggable
              onDragStart={(event) => {
                event.dataTransfer?.setData("text/plain", item.id);
                if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
                setDraggedId(item.id);
              }}
              onDragOver={(event) => {
                event.preventDefault();
                setDropTargetId(item.id);
              }}
              onDrop={(event) => handleDrop(event, item.id)}
              onDragEnd={() => {
                setDraggedId("");
                setDropTargetId("");
              }}
            >
              <button
                type="button"
                className="footer-contact-order-select"
                aria-pressed={activeId === item.id}
                onClick={() => onSelect(item.id)}
              >
                <MaterialSymbol name={item.icon} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.value}</small>
                </span>
              </button>
              <div className="footer-contact-order-actions" aria-label={`Reorder ${item.label}`}>
                <button type="button" aria-label={`Move ${item.label} earlier`} disabled={index === 0} onClick={() => moveBy(item.id, -1)}>
                  <MaterialSymbol name="arrow_upward" />
                </button>
                <button type="button" aria-label={`Move ${item.label} later`} disabled={index === orderedItems.length - 1} onClick={() => moveBy(item.id, 1)}>
                  <MaterialSymbol name="arrow_downward" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p className="footer-contact-drawer-status" role="status" aria-live="polite">{announcement}</p>
      </aside>
    </div>
  );
}
