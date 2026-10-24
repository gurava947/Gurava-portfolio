import "./index.css";

function CricketerPage({ data }) {
  return (
    <div className="cricketer-page min-vh-100">
      {/* Top Player Section */}
      <section className="player-section text-white">
        <div className="container-fluid px-3 py-3">
          <div className="row align-items-center">
            <div className="col-12 col-sm-8">
              <h1 className="h2 fw-bold mb-2">
                {data.player.name}
              </h1>

              <p className="small mb-0">
                {data.player.description}
              </p>
            </div>

            <div className="col-12 col-sm-4 text-center mt-3 mt-sm-0">
              <img
                src={data.player.image}
                alt={data.player.name}
                className="player-image img-fluid"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Content Section */}
      <section className="content-section py-3">
        <div className="container-fluid px-3">
          {/* IPL Records */}
          <h2 className="h6 fw-bold text-dark mb-3">
            {data.recordsTitle}
          </h2>

          <div className="record-card bg-white rounded-4 shadow-sm overflow-hidden mb-3">
            <div className="row align-items-center g-0">
              <div className="col-4">
                <img
                  src={data.record.image}
                  alt={data.record.title}
                  className="record-image w-100"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="col-8 p-2">
                <h3 className="h6 text-dark mb-2">
                  {data.record.title}
                </h3>

                <p className="small text-secondary mb-0">
                  {data.record.description}
                </p>
              </div>
            </div>
          </div>

          {/* Videos */}
          <h2 className="h6 fw-bold text-dark mb-3">
            {data.videosTitle}
          </h2>

          <div className="row g-2">
            {data.videos.map((video) => (
              <div className="col-6 col-sm-4" key={video.id}>
                <img
                  src={video.image}
                  alt={video.title}
                  className="video-image w-100 rounded-3"
                  loading="lazy"
                  decoding="async"
                />

                <p className="video-title small text-dark mb-0">
                  {video.title} {video.subtitle}
                </p>
              </div>
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-4">
            <button
              type="button"
              className="btn btn-primary px-3 py-2 rounded-2"
            >
              {data.buttonText}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CricketerPage;
