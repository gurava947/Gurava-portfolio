import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LoaderOverlay, LoadSpinner } from "./LoadSpinner";
import { ProjectWorkspace } from "./ProjectWorkspace";

function resultOutput(result) {
  if (!result) return "";
  if (result.error) return result.error.trim();
  return result.stdout ? result.stdout.trimEnd() : "(no output)";
}

function caseInput(testCase) {
  return typeof testCase.input === "string" ? testCase.input : "";
}

function DetailState({ title, message, onRetry, isLoading = false, loader }) {
  return (
    <section className="lab-section">
      <div className="lab-workspace-wide">
        <div
          className={`lab-detail-state${isLoading ? " is-loading" : ""}`}
          role={onRetry ? "alert" : "status"}
          aria-busy={isLoading || undefined}
        >
          {isLoading && (
            <div className="lab-detail-state-spinner" aria-hidden="true">
              <LoadSpinner settings={loader} label="Loading project data" size="lg" />
            </div>
          )}
          <strong>{title}</strong>
          <p>{message}</p>
          {onRetry && <button className="lab-button lab-button-primary" type="button" onClick={onRetry}>Try again</button>}
        </div>
      </div>
    </section>
  );
}

function DeviceGlyph({ width }) {
  const common = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };
  if (width < 600) return <svg {...common}><rect x="7" y="2.5" width="10" height="19" rx="2.4" /><path d="M10.5 18.5h3" /></svg>;
  if (width < 900) return <svg {...common}><rect x="4.5" y="2.5" width="15" height="19" rx="2.6" /><path d="M10 18.5h4" /></svg>;
  return <svg {...common}><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M8.5 20h7M12 16.5V20" /></svg>;
}

function DeviceToggle({ devices, value, onChange }) {
  return (
    <div className="device-toggle" role="group" aria-label="Preview size">
      {devices.map((device) => (
        <button
          key={device.id}
          type="button"
          className={`device-toggle-option${value === device.id ? " active" : ""}`}
          aria-pressed={value === device.id}
          onClick={() => onChange(device.id)}
          title={`${device.label} · ${device.range}`}
        >
          <span className="device-toggle-glyph"><DeviceGlyph width={device.width} /></span>
          <span className="device-toggle-copy">
            <span>{device.label}</span>
            <small>{device.range}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function ReactPreview({ project, devices, copy, loader }) {
  const initialDevice = devices.find((device) => device.id === "large")?.id || devices[0]?.id;
  const [deviceId, setDeviceId] = useState(initialDevice);
  const [stageWidth, setStageWidth] = useState(0);
  const [ready, setReady] = useState(false);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const selectedDevice = devices.find((device) => device.id === deviceId) || devices[0];
  const frameWidth = selectedDevice.width + selectedDevice.frameBorder * 2;
  const frameHeight = selectedDevice.height + selectedDevice.frameBorder * 2;
  const scale = stageWidth ? Math.min(1, stageWidth / frameWidth) : 1;
  const previewUrl = `/preview.html?id=${encodeURIComponent(project.id)}&device=${encodeURIComponent(deviceId)}`;

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const updateWidth = () => {
      const styles = window.getComputedStyle(stage);
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight);
      setStageWidth(Math.max(0, stage.clientWidth - horizontalPadding - 8));
    };
    updateWidth();
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(stage);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setReady(false);
    let cancelled = false;
    let timer = 0;
    const startedAt = Date.now();
    const inspectFrame = () => {
      if (cancelled) return;
      let documentNode = null;
      try {
        documentNode = frameRef.current?.contentDocument;
      } catch {
        documentNode = null;
      }
      if (documentNode?.querySelector('[data-preview-state="ready"], [data-preview-state="error"]')) {
        setReady(true);
        return;
      }
      if (Date.now() - startedAt > 15000) {
        setReady(true);
        return;
      }
      timer = window.setTimeout(inspectFrame, 120);
    };
    timer = window.setTimeout(inspectFrame, 120);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [deviceId, project.id]);

  return (
    <section className="lab-workspace-section lab-preview-section" id="preview">
      <div className="lab-workspace-wide">
        <header className="lab-section-heading">
          <div>
            <p className="lab-eyebrow">{copy.previewEyebrow}</p>
            <h2>{copy.previewTitle}</h2>
          </div>
          <p className="lab-section-note">{copy.previewNote}</p>
        </header>
        <div className="lab-workspace-panel lab-build-panel">
          <div className="lab-build-toolbar">
            <div className="lab-build-meta">
              <span className="lab-build-dot" aria-hidden="true" />
              <span>{project.collectionLabel} · supplied React component</span>
            </div>
            <DeviceToggle devices={devices} value={deviceId} onChange={setDeviceId} />
          </div>
          <div className="lab-build-stage" ref={stageRef}>
            <div className="device-frame-sizer" style={{ width: frameWidth * scale, height: frameHeight * scale }}>
              <div
                className="device-frame"
                style={{ width: frameWidth, height: frameHeight, padding: selectedDevice.frameBorder, transform: `scale(${scale})` }}
              >
                <iframe
                  ref={frameRef}
                  key={deviceId}
                  className="preview-frame lab-build-frame"
                  src={previewUrl}
                  title={`${project.title} live preview`}
                  loading="lazy"
                  style={{ width: selectedDevice.width, height: selectedDevice.height }}
                />
                {!ready && (
                  <LoaderOverlay settings={loader} label={copy.loadingPreview} className="lab-build-loading" />
                )}
              </div>
            </div>
          </div>
          <p className="lab-build-caption">{copy.sourceNote}</p>
        </div>
      </div>
    </section>
  );
}

function PythonWorkspace({ project, copy, loader }) {
  const data = project.data || {};
  const tests = data.tests || {};
  const testCases = Array.isArray(tests.cases) ? tests.cases : [];
  const instructions = Array.isArray(data.instructions) ? data.instructions : [];
  const brief = data.brief || {};
  const sections = Array.isArray(brief.sections) ? brief.sections : [];
  const [status, setStatus] = useState(null);
  const results = Array.isArray(status?.results) ? status.results : [];

  return (
    <>
      <section className="lab-workspace-section" id="workspace">
        <div className="lab-workspace-wide">
          <header className="lab-section-heading">
            <div>
              <p className="lab-eyebrow">The playground</p>
              <h2>Live playground</h2>
            </div>
            <p className="lab-section-note lab-workspace-heading-side">
              The supplied solution is already loaded and runs automatically in your browser through Pyodide.
            </p>
          </header>
          <div className="lab-workspace-panel">
            <ProjectWorkspace project={project} onStatus={setStatus} loader={loader} />
          </div>
        </div>
      </section>

      <section className="lab-section lab-tests-section">
        <div className="lab-workspace-wide">
          <header className="lab-section-heading">
            <div>
              <p className="lab-eyebrow">Tests</p>
              <h2>Test cases</h2>
            </div>
            <div className="lab-test-badges">
              {tests.derived && <span className="lab-badge lab-badge-derived">Derived from tutorial</span>}
              {testCases.every((testCase) => !caseInput(testCase).trim()) && (
                <span className="lab-badge">No input required</span>
              )}
            </div>
          </header>
          {tests.note && <p className="lab-section-note lab-tests-note">{tests.note}</p>}
          {testCases.length === 0 ? (
            <div className="lab-empty-tests">
              <strong>No test cases are available for this project yet.</strong>
              <p>The workspace can still run any code you write, but no expected output has been supplied.</p>
            </div>
          ) : (
            <div className="lab-test-grid">
              {testCases.map((testCase, index) => {
                const result = results.find((item) => item.caseId === testCase.id);
                const input = caseInput(testCase);
                const resultState = !status
                  ? "waiting"
                  : result
                    ? result.passed ? "passed" : "failed"
                    : "not-run";
                return (
                  <article className={`lab-test-card is-${resultState}`} key={testCase.id}>
                    <div className="lab-test-card-heading">
                      <span className="lab-test-number">{String(index + 1).padStart(2, "0")}</span>
                      <h3>{testCase.name}</h3>
                      <span className={`lab-test-state state-${resultState}`}>
                        {resultState === "passed" ? "Passed" : resultState === "failed" ? "Failed" : resultState === "not-run" ? "Not run" : "Waiting"}
                      </span>
                    </div>
                    <dl>
                      <div>
                        <dt>Input</dt>
                        <dd>{input.trim() ? <pre>{input}</pre> : <span className="lab-test-empty">{testCase.inputPlaceholder || "No input — this program reads no input."}</span>}</dd>
                      </div>
                      <div>
                        <dt>Expected output</dt>
                        <dd><pre>{testCase.expectedOutput || "(empty output)"}</pre></dd>
                      </div>
                      <div>
                        <dt>Actual output</dt>
                        <dd>
                          {result
                            ? <pre className={result.error ? "has-error" : undefined}>{resultOutput(result)}</pre>
                            : <span className="lab-test-empty">
                              {status ? "Not part of the latest run." : "Waiting for the first automatic run…"}
                            </span>}
                        </dd>
                      </div>
                    </dl>
                    {result && <p className="lab-test-runtime">Executed in {result.runtimeMs.toFixed(2)} ms</p>}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="lab-section lab-description-section" id="description">
        <div className="lab-workspace-wide">
          <header className="lab-section-heading">
            <div>
              <p className="lab-eyebrow">Project description</p>
              <h2>How {project.title} works</h2>
            </div>
            <span className="lab-badge">{data.language || "Python 3.10"}</span>
          </header>
          <div className="lab-description-grid">
            <div className="lab-description-copy">
              <p className="lab-lead">{brief.summary || project.description}</p>
              {sections.map((section) => (
                <section className="lab-brief-section" key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body && <p>{section.body}</p>}
                  {section.code && <pre className="lab-code-block"><code>{section.code}</code></pre>}
                  {Array.isArray(section.points) && section.points.length > 0 && (
                    <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  )}
                </section>
              ))}
              {brief.note && <p className="lab-brief-note">{brief.note}</p>}
            </div>
            <aside className="lab-output-card">
              <p className="lab-eyebrow">Expected output</p>
              <pre>{brief.expectedOutput || testCases[0]?.expectedOutput || "(not supplied)"}</pre>
              <p>This is the exact value the supplied program prints. The live value above comes from a real Python run in your browser.</p>
            </aside>
          </div>
        </div>
      </section>

      {instructions.length > 0 && (
        <section className="lab-section lab-instructions-section">
          <div className="lab-workspace-wide">
            <header className="lab-section-heading">
              <div>
                <p className="lab-eyebrow">Working in the playground</p>
                <h2>Instructions</h2>
              </div>
            </header>
            <ol className="lab-instructions">{instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol>
          </div>
        </section>
      )}
    </>
  );
}

function ReactAbout({ project, copy }) {
  return (
    <section className="lab-section lab-description-section" id="description">
      <div className="lab-workspace-wide">
        <header className="lab-section-heading">
          <div>
            <p className="lab-eyebrow">{copy.aboutEyebrow}</p>
            <h2>{copy.aboutTitle}</h2>
          </div>
          <span className="lab-badge">{project.collectionLabel}</span>
        </header>
        <div className="lab-description-grid">
          <div className="lab-description-copy">
            <p className="lab-lead">{project.description}</p>
            <section className="lab-brief-section">
              <h3>What this preview is</h3>
              <p>{copy.previewNote} {copy.sourceNote}</p>
            </section>
            <section className="lab-brief-section">
              <h3>Built with</h3>
              <ul>{(project.technologies || []).map((technology) => <li key={technology}>{technology}</li>)}</ul>
            </section>
          </div>
          <aside className="lab-output-card">
            <p className="lab-eyebrow">{copy.factsLabel}</p>
            <dl className="lab-detail-facts">
              <div><dt>{copy.collection}</dt><dd>{project.collectionLabel}</dd></div>
              <div><dt>{copy.category}</dt><dd>{project.category}</dd></div>
              <div><dt>Practice</dt><dd>{project.practiceLabel}</dd></div>
              <div><dt>{copy.previewType}</dt><dd>{copy.previewReact}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function ProjectDetail({ project, detail, devices, isLoading, error, onRetry, onNavigate, onBack, previousProject, nextProject, copy, loader }) {
  const fullProject = detail || project;
  const data = fullProject.data || {};
  const eyebrow = [...new Set([fullProject.collectionLabel, fullProject.category].filter(Boolean))].join(" · ");
  const pythonFacts = Array.isArray(data.facts) ? data.facts : [];
  const facts = fullProject.previewType === "python" && pythonFacts.length > 0
    ? pythonFacts
    : [
      { label: copy.collection, value: fullProject.collectionLabel },
      { label: copy.category, value: fullProject.category },
      { label: "Practice", value: fullProject.practiceLabel },
      { label: copy.previewType, value: copy.previewReact },
    ];
  const navigate = (event, destination) => {
    if (onNavigate) onNavigate(event, destination);
  };
  const previewDevices = devices?.[fullProject.deviceSet] || devices?.static || [];

  return (
    <main className="lab-main">
      <section className="lab-hero lab-detail-hero">
        <div className="lab-workspace-wide">
          <a className="lab-back-link" href="/projects" onClick={(event) => (onBack ? onBack(event) : navigate(event, "/projects"))}>
            <span aria-hidden="true">←</span> {copy.backToCatalog}
          </a>
          <div className="lab-hero-grid">
            <div className="lab-hero-copy">
              <p className="lab-eyebrow">{eyebrow}</p>
              <h1>{fullProject.title}</h1>
              <p className="lab-hero-summary">{fullProject.description}</p>
              <ul className="lab-hero-tech" aria-label={`${fullProject.title} technologies`}>
                {(fullProject.technologies || []).map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
            <dl className="lab-facts" aria-label={`${fullProject.title} project facts`}>
              {facts.map((fact) => (
                <div key={`${fact.label}-${fact.value}`}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {isLoading && (
        <DetailState
          title="Loading project"
          message="Fetching the supplied project data."
          isLoading
          loader={loader}
        />
      )}
      {!isLoading && error && <DetailState title={copy.previewError} message={error} onRetry={onRetry} />}
      {!isLoading && !error && detail && fullProject.previewType === "python" && <PythonWorkspace project={fullProject} copy={copy} loader={loader} />}
      {!isLoading && !error && detail && fullProject.previewType !== "python" && (
        <>
          <ReactPreview project={fullProject} devices={previewDevices} copy={copy} loader={loader} />
          <ReactAbout project={fullProject} copy={copy} />
        </>
      )}

      {!isLoading && detail && (previousProject || nextProject) && (
        <nav className="lab-project-nav" aria-label="Project navigation">
          <div className="lab-workspace-wide lab-project-nav-inner">
            {previousProject ? (
              <a href={previousProject.route} onClick={(event) => navigate(event, previousProject.route)}>
                <span>{copy.previousProject}</span>
                <strong>{previousProject.title}</strong>
              </a>
            ) : <span />}
            {nextProject ? (
              <a className="is-next" href={nextProject.route} onClick={(event) => navigate(event, nextProject.route)}>
                <span>{copy.nextProject}</span>
                <strong>{nextProject.title}</strong>
              </a>
            ) : <span />}
          </div>
        </nav>
      )}
    </main>
  );
}
