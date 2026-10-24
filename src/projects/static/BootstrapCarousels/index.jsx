import { useState } from "react";
import "./index.css";

const slides = [
  {
    src: "https://assets.ccbp.in/frontend/static-website/bootstrap-carousels-football-img.png",
    alt: "Football",
  },
  {
    src: "https://assets.ccbp.in/frontend/static-website/bootstrap-carousels-cricket-img.png",
    alt: "Cricket",
  },
  {
    src: "https://assets.ccbp.in/frontend/static-website/bootstrap-carousels-tennis-img.png",
    alt: "Tennis",
  },
];

function BootstrapCarousels() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <main className="bootstrap-carousels-page">
      <h1 className="text-center text">Famous Sport</h1>
      <div id="carouselExampleIndicators" className="carousel slide" aria-label="Famous Sport carousel">
        <ol className="carousel-indicators">
          {slides.map((slide, index) => (
            <li
              key={slide.alt}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={`Go to ${slide.alt} slide`}
              onClick={() => showSlide(index)}
            />
          ))}
        </ol>
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item${index === activeIndex ? " active" : ""}`} key={slide.src}>
              <img src={slide.src} className="d-block w-100" alt={slide.alt} />
            </div>
          ))}
        </div>
        <button type="button" className="carousel-control-prev" onClick={() => showSlide(activeIndex - 1)} aria-label="Previous slide">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button type="button" className="carousel-control-next" onClick={() => showSlide(activeIndex + 1)} aria-label="Next slide">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </main>
  );
}

export default BootstrapCarousels;
