import { useState } from "react";
import "./index.css";

function PodcastPage({ data }) {
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const selectedDetails = selectedPodcast ? data.details[selectedPodcast] : null;

  if (selectedDetails) {
    return (
      <div className="podcast-project min-vh-100">
        <PodcastDetails
          podcast={selectedDetails}
          onBack={() => setSelectedPodcast(null)}
        />
      </div>
    );
  }

  return (
    <div className="podcast-project podcast-home-page min-vh-100">
      <header className="podcast-home-background">
        <div className="container h-100 d-flex align-items-end">
          <h1 className="display-6 text-white mb-0">{data.home.title}</h1>
        </div>
      </header>

      <main className="container podcast-home-content px-3 px-sm-4 py-4">
        <div className="row g-3 g-sm-4">
          {data.home.podcasts.map((podcast) => (
            <div key={podcast.id} className="col-6">
              <button
                type="button"
                className="podcast-home-card w-100 border-0 bg-transparent p-0 text-center"
                onClick={() => setSelectedPodcast(podcast.id)}
                aria-label={`${podcast.title}, ${podcast.episodes}`}
              >
                <img
                  src={podcast.image}
                  alt={`${podcast.title} podcast cover`}
                  className="podcast-cover img-fluid w-100 rounded-3"
                  loading="lazy"
                />
                <h2 className="h6 fw-bold text-primary mt-2 mb-2">{podcast.title}</h2>
                <p className="text-secondary mb-0">{podcast.episodes}</p>
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function PodcastDetails({ podcast, onBack }) {
  return (
    <div className="podcast-details-page">
      <header className="podcast-details-header text-white">
        <div className="container px-3 px-sm-4 py-4">
          <div className="row align-items-center g-3">
            <div className="col-5">
              <img
                src={podcast.image}
                alt={`${podcast.title} cover`}
                className="podcast-details-image img-fluid w-100 rounded-3"
              />
            </div>
            <div className="col-7">
              <p className="small mb-2">{podcast.category}</p>
              <h1 className="h4 fw-bold mb-2">{podcast.title}</h1>
              <p className="small mb-0">{podcast.description}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container podcast-episodes px-3 py-4">
        <div className="d-flex flex-column gap-3">
          {podcast.episodes.map((episode) => (
            <article key={episode.id} className="episode-item row align-items-center g-2">
              <div className="col-5">
                <img
                  src={podcast.image}
                  alt={`${episode.title} episode`}
                  className="episode-image img-fluid w-100 rounded-3"
                  loading="lazy"
                />
              </div>
              <div className="col-7">
                <h2 className="h6 fw-bold text-primary mb-2">{episode.title}</h2>
                <p className="episode-description text-secondary mb-2">{episode.description}</p>
                <p className="episode-duration small text-primary mb-0">{episode.duration}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-end mt-4">
          <button
            type="button"
            className="btn podcast-back-button text-white px-4 py-2 rounded-pill"
            onClick={onBack}
          >
            Back
          </button>
        </div>
      </main>
    </div>
  );
}

export default PodcastPage;
