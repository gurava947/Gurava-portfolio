import "./index.css";

function AdvancedTechnologies({ data }) {
  return (
    <div className="advanced-background position-relative min-vh-100 d-flex flex-column justify-content-end">
      {/* Content Card */}
      <div className="container-fluid advanced-content-shell">
        <div className="bg-white rounded-top-3 shadow-lg p-4 p-md-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <h1 className="h3 fw-bold text-primary mb-3">
                {data.heading}
              </h1>

              <p className="text-secondary mb-4">
                {data.description}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 rounded-3 shadow-sm"
                >
                  {data.primaryButtonText}
                </button>

                <button
                  type="button"
                  className="btn btn-dark px-4 py-2 rounded-3 shadow-sm"
                >
                  {data.secondaryButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedTechnologies;
