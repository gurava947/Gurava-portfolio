import "./index.css";

function GoaPage({ data }) {
  return (
    <div className="goa-page">
      {/* Carousel */}
      <div
        id="goaCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {data.carouselImages.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-bs-target="#goaCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="carousel-inner">
          {data.carouselImages.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${
                index === 0 ? "active" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                className="d-block w-100 carousel-image"
                fetchPriority={index === 0 ? "high" : "auto"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="carousel-control-prev"
          data-bs-target="#goaCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          type="button"
          className="carousel-control-next"
          data-bs-target="#goaCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <main className="container-fluid px-4 py-4">
        {/* About */}
        <section className="mb-4">
          <h1 className="h5 text-dark mb-2">
            {data.aboutTitle}
          </h1>

          <p className="text-secondary lh-lg mb-0">
            {data.aboutText}
          </p>
        </section>

        {/* More Pictures */}
        <section className="mb-2">
          <h2 className="h5 text-dark mb-3">
            {data.morePicturesTitle}
          </h2>

          <div className="row g-2">
            {data.morePictures.map((picture) => (
              <div key={picture.id} className="col-6 col-sm-4">
                <img
                  src={picture.image}
                  alt={picture.alt}
                  className="w-100 rounded-3 more-picture"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section>
          <h2 className="h5 text-dark mb-3">
            {data.videosTitle}
          </h2>

          <div className="row g-2">
            {data.videos.map((video) => (
              <div key={video.id} className="col-6 col-sm-4">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="video-link position-relative d-block overflow-hidden rounded-3"
                >
                  <img
                    src={video.thumbnail}
                    alt={`Goa tourism video ${video.id}`}
                    className="w-100 video-thumbnail"
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="play-button position-absolute top-50 start-50 translate-middle">
                    ▶
                  </span>
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default GoaPage;
