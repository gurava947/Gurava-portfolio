import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./StudioSelect.css";

const MENU_GAP = 8;
const MENU_PADDING = 6;

function ChevronIcon() {
  return (
    <svg className="studio-select-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="studio-select-option-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

export default function StudioSelect({ id, label, icon, value, options = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [placement, setPlacement] = useState(null);
  const fieldRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const optionRefs = useRef([]);
  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value));
  const selected = options[selectedIndex] ?? options[0];

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus({ preventScroll: true });
  };

  const choose = (option) => {
    if (!option) return;
    setOpen(false);
    if (option.value !== value) onChange(option.value);
    triggerRef.current?.focus({ preventScroll: true });
  };

  useEffect(() => {
    if (!open) return undefined;
    document.documentElement.setAttribute("data-studio-select-open", "");
    return () => document.documentElement.removeAttribute("data-studio-select-open");
  }, [open]);

  useLayoutEffect(() => {
    if (!open) {
      setPlacement(null);
      return undefined;
    }
    const place = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(Math.max(rect.width, 232), window.innerWidth - 16);
      const estimated = options.length * 40 + MENU_PADDING * 2;
      const below = window.innerHeight - rect.bottom - MENU_GAP - 8;
      const above = rect.top - MENU_GAP - 8;
      const dropUp = below < Math.min(estimated, 200) && above > below;
      const maxHeight = Math.min(estimated, 286, Math.max(120, dropUp ? above : below));
      const top = dropUp ? Math.max(8, rect.top - MENU_GAP - maxHeight) : rect.bottom + MENU_GAP;
      const left = Math.min(Math.max(8, rect.left), window.innerWidth - width - 8);
      setPlacement({ top, left, width, maxHeight, dropUp });
    };
    place();
    const closeOnScroll = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    const closeOnResize = () => setOpen(false);
    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("resize", closeOnResize);
    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("resize", closeOnResize);
    };
  }, [open, options.length]);

  useLayoutEffect(() => {
    if (!open || !placement) return;
    const node = optionRefs.current[activeIndex];
    node?.focus({ preventScroll: true });
    node?.scrollIntoView?.({ block: "nearest" });
  }, [open, activeIndex, placement]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnOutsidePress = (event) => {
      if (fieldRef.current?.contains(event.target)) return;
      if (menuRef.current?.contains(event.target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      triggerRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const moveFocus = (nextIndex) => {
    const clamped = (nextIndex + options.length) % options.length;
    setActiveIndex(clamped);
    optionRefs.current[clamped]?.focus({ preventScroll: true });
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    if (!open) {
      if (event.target === triggerRef.current && (key === "ArrowDown" || key === "ArrowUp")) {
        event.preventDefault();
        setActiveIndex(selectedIndex);
        setOpen(true);
      }
      return;
    }
    if (key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(true);
      return;
    }
    if (key === "Tab") {
      closeMenu(false);
      return;
    }
    if (key === "ArrowDown" || key === "ArrowUp" || key === "Home" || key === "End") {
      event.preventDefault();
      if (key === "Home") moveFocus(0);
      else if (key === "End") moveFocus(options.length - 1);
      else moveFocus(activeIndex + (key === "ArrowDown" ? 1 : -1));
      return;
    }
    if (key === "Enter" || key === " ") {
      event.preventDefault();
      choose(options[activeIndex]);
    }
  };

  return (
    <div className={`studio-select${open ? " is-open" : ""}`} ref={fieldRef}>
      <span className="studio-select-label" id={`${id}-label`}>{label}</span>
      <div className="studio-select-control">
        {icon && <span className="studio-select-icon" aria-hidden="true">{icon}</span>}
        <button
          type="button"
          id={id}
          ref={triggerRef}
          className="studio-select-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={`${id}-listbox`}
          aria-labelledby={`${id}-label ${id}-selected`}
          onClick={() => (open ? closeMenu(false) : (setActiveIndex(selectedIndex), setOpen(true)))}
          onKeyDown={handleKeyDown}
        >
          <span className="studio-select-value" id={`${id}-selected`}>{selected?.label}</span>
          <ChevronIcon />
        </button>
      </div>
      {open && placement && createPortal(
        <ul
          className={`studio-select-menu${placement.dropUp ? " is-drop-up" : ""}`}
          id={`${id}-listbox`}
          ref={menuRef}
          role="listbox"
          aria-labelledby={`${id}-label`}
          data-studio-select-menu
          style={{ top: placement.top, left: placement.left, width: placement.width, maxHeight: placement.maxHeight }}
          onMouseDown={(event) => {
            if (!event.target.closest?.('[role="option"]')) event.preventDefault();
          }}
          onKeyDown={handleKeyDown}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(node) => { optionRefs.current[index] = node; }}
              className="studio-select-option"
              role="option"
              aria-selected={option.value === value}
              tabIndex={-1}
              onClick={() => choose(option)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <span className="studio-select-option-label">{option.label}</span>
              <CheckIcon />
            </li>
          ))}
        </ul>,
        document.body,
      )}
    </div>
  );
}
