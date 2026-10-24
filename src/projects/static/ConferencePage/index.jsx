import { useState } from "react";
import "./index.css";

function ConferencePage({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <div className="conference-page min-vh-100 bg-white d-md-flex flex-md-column justify-content-md-center align-items-md-center">
        {/* YouTube Video */}
        <div className="ratio ratio-16x9">
          <iframe
            src={data.details.videoUrl}
            title={data.details.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Details Content */}
        <div className="container px-4 py-4 text-center">
          <h1 className="h4 fw-bold text-dark mb-2">
            {data.details.title}
          </h1>

          <p className="text-secondary mb-4">
            {data.details.description}
          </p>

          <div className="row g-4 mb-4">
            {data.details.statistics.map((statistic) => (
              <div
                key={statistic.id}
                className="col-6"
              >
                <div className="statistic-item">
                  <h2 className="h4 fw-bold text-dark mb-2">
                    {statistic.number}
                  </h2>

                  <p className="text-secondary mb-0">
                    {statistic.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="btn btn-primary px-4 py-2 rounded-2 shadow-sm"
            onClick={() => setShowDetails(false)}
          >
            {data.details.backButtonText}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="conference-page min-vh-100 bg-white d-flex flex-column align-items-center">
      {/* Conference Image */}
      <img
        src={data.image}
        alt={data.title}
        className="conference-image w-100"
        fetchPriority="high"
        decoding="async"
      />

      {/* Main Content */}
      <div className="container px-4 py-4 text-center">
        <h1 className="conference-title fw-bold mb-3">
          {data.title}
        </h1>

        <p className="text-secondary mb-4">
          {data.description}
        </p>

        <button
          type="button"
          className="btn btn-primary px-3 py-2 rounded-2 shadow-sm"
          onClick={() => setShowDetails(true)}
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  );
}

export default ConferencePage;
