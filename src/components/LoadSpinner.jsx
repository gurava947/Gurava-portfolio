import { DEFAULT_LOADER_SETTINGS, normalizeLoaderSettings } from "../hooks/useTheme";

function LoaderGraphic({ style }) {
  return (
    <span className="load-spinner-graphic" aria-hidden="true">
      {style === "dots" && (
        <span className="load-spinner-dots"><i /><i /><i /></span>
      )}
      {style === "bar" && (
        <span className="load-spinner-track"><span /></span>
      )}
      {style === "ring" && <span className="load-spinner-ring" />}
    </span>
  );
}

export function LoadSpinner({ settings, label = "Loading", size = "md", className = "" }) {
  const loader = settings ? normalizeLoaderSettings(settings) : DEFAULT_LOADER_SETTINGS;
  if (!loader.enabled && !loader.labels) return null;
  return (
    <span className={`load-spinner is-${size}${className ? ` ${className}` : ""}`} role="status">
      {loader.enabled && <LoaderGraphic style={loader.style} />}
      {loader.labels
        ? <span className="load-spinner-label">{label}</span>
        : <span className="visually-hidden">{label}</span>}
    </span>
  );
}

export function LoaderOverlay({ settings, label = "Loading", className = "" }) {
  const loader = settings ? normalizeLoaderSettings(settings) : DEFAULT_LOADER_SETTINGS;
  if (!loader.enabled && !loader.labels) return null;
  return (
    <div className={`load-overlay${className ? ` ${className}` : ""}`}>
      <LoadSpinner settings={loader} label={label} />
    </div>
  );
}
