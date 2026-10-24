import { Component, Suspense, lazy, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./preview.css";

const projectModules = import.meta.glob(["../projects/**/*.jsx", "!../projects/**/*.test.jsx"]);

function loadPreview(previewModule, exportName) {
  const loader = projectModules[`../projects/${previewModule}`];
  if (!loader) throw new Error(`Preview module "${previewModule}" is not part of this build.`);
  return loader().then((module) => {
    const component = exportName ? module[exportName] : module.default;
    if (!component) throw new Error(`Preview export "${exportName || "default"}" was not found in ${previewModule}.`);
    return { default: component };
  });
}

class PreviewErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <main className="preview-message" role="alert" data-preview-state="error">
          <p className="preview-message-kicker">Preview runtime</p>
          <h1>This preview could not render</h1>
          <p>{this.state.error.message || "The supplied component stopped unexpectedly."}</p>
        </main>
      );
    }
    return this.props.children;
  }
}

function PreviewMessage({ kicker, title, children, state = "loading" }) {
  return (
    <main className="preview-message" role="status" data-preview-state={state}>
      <p className="preview-message-kicker">{kicker}</p>
      <h1>{title}</h1>
      {children}
    </main>
  );
}

function PreviewApp() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  const device = params.get("device") || "";
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    if (!id) {
      setError("No project id was supplied.");
      return undefined;
    }
    fetch(`/data/projects/${encodeURIComponent(id)}.json`, { headers: { Accept: "application/json" } })
      .then((response) => {
        if (!response.ok) throw new Error(`Project data returned HTTP ${response.status}.`);
        return response.json();
      })
      .then((detail) => {
        if (!active) return;
        setProject(detail);
        document.documentElement.dataset.collection = detail.collection;
        document.title = `${detail.title} · Live preview`;
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || "Project data could not be loaded.");
      });
    return () => {
      active = false;
    };
  }, [id]);

  const PreviewComponent = useMemo(() => {
    if (!project?.previewModule) return null;
    return lazy(() => loadPreview(project.previewModule, project.exportName));
  }, [project]);

  if (error) {
    return <PreviewMessage kicker="Preview runtime" title="Project data unavailable" state="error">{error}</PreviewMessage>;
  }
  if (!project) {
    return <PreviewMessage kicker="Preview runtime" title="Loading the supplied build"><span className="preview-spinner" aria-hidden="true" /></PreviewMessage>;
  }
  if (project.previewType !== "react" || !PreviewComponent) {
    return <PreviewMessage kicker="Preview runtime" title="No React preview for this project" state="ready">Open the project workspace for the live Python playground.</PreviewMessage>;
  }

  return (
    <PreviewErrorBoundary>
      <Suspense fallback={<PreviewMessage kicker="Preview runtime" title="Loading the supplied build"><span className="preview-spinner" aria-hidden="true" /></PreviewMessage>}>
        <main className="preview-canvas" data-device={device} data-preview-state="ready">
          <PreviewComponent data={project.data} device={device} />
        </main>
      </Suspense>
    </PreviewErrorBoundary>
  );
}

createRoot(document.getElementById("preview-root")).render(<PreviewApp />);
