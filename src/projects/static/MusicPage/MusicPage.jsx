import { useState } from "react";
import "./index.css";

function MusicPage({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  return showDetails ? (
    <MusicDetails data={data.details} onBack={() => setShowDetails(false)} />
  ) : (
    <MusicHome data={data.home} onGetStarted={() => setShowDetails(true)} />
  );
}

function MusicHome({ data, onGetStarted }) {
  return (
    <main
      className="music-page music-home-page min-vh-100"
      style={{
        "--music-background": `url("${data.backgroundImage}")`,
        "--music-stars": `url("${data.starsImage}")`,
      }}
    >
      <div className="music-home-content container px-3 px-sm-4 py-4 py-md-5 text-center">
        <h1 className="music-title fw-bold mb-3">{data.title}</h1>
        <p className="music-description fw-semibold mb-0">{data.description}</p>

        <section className="music-feature-card rounded-4 shadow-lg mt-4 mt-md-5" aria-label={data.featureTitle}>
          <div className="music-feature-image d-flex align-items-center justify-content-center">
            <h2 className="music-feature-title fw-bold mb-0">{data.featureTitle}</h2>
          </div>
        </section>

        <p className="music-feature-description fw-bold mt-4 mb-3">
          {data.featureDescription}
        </p>
        <button
          type="button"
          className="btn music-primary-button fw-bold px-4 py-2 rounded-pill shadow-sm"
          onClick={onGetStarted}
        >
          {data.buttonText}
        </button>
      </div>
    </main>
  );
}

function MusicDetails({ data, onBack }) {
  return (
    <div className="music-page music-details-page min-vh-100">
      <img
        src={data.mainImage}
        alt={`${data.title} night sky`}
        className="music-main-image img-fluid w-100"
        fetchPriority="high"
      />

      <main className="container music-details-content px-3 px-sm-4 py-4">
        <h1 className="music-details-title h3 fw-bold mb-3">{data.title}</h1>
        <p className="music-details-description mb-4">{data.description}</p>
        <p className="music-duration fw-bold mb-4">{data.duration}</p>
        <h2 className="music-related-title h5 fw-bold mb-3">{data.relatedTitle}</h2>

        <div className="row music-related-grid g-3">
          {data.relatedMusic.map((music) => (
            <div key={music.id} className="col-12 col-sm-6">
              <article className="related-music-card">
                <img
                  src={music.image}
                  alt={`${music.title} cover`}
                  className="related-music-image img-fluid w-100 rounded-3"
                  loading="lazy"
                />
                <h3 className="h6 fw-bold mt-2 mb-2">{music.title}</h3>
                <p className="small mb-0">{music.duration}</p>
              </article>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn music-primary-button px-4 py-2 rounded-pill mt-4"
            onClick={onBack}
          >
            {data.backButtonText}
          </button>
        </div>
      </main>
    </div>
  );
}

export default MusicPage;
