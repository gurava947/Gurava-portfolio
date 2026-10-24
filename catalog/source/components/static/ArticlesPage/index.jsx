import { useState } from "react";
import "./index.css";

function ArticlesPage({ data }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const selectedCategory = data.categories.find(
    (category) => category.id === selectedCategoryId
  );

  const openCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setActiveImageIndex(0);
  };

  if (selectedCategory) {
    const showPrevious = () => {
      setActiveImageIndex((index) => (
        index === 0 ? selectedCategory.images.length - 1 : index - 1
      ));
    };
    const showNext = () => {
      setActiveImageIndex((index) => (
        (index + 1) % selectedCategory.images.length
      ));
    };

    return (
      <main className="articles-page articles-category-page min-vh-100">
        <div className="articles-category-content container px-3 px-sm-4 py-4">
          <h1 className="articles-category-title h3 mb-3">{selectedCategory.name}</h1>
          <div className="articles-carousel">
            <img
              src={selectedCategory.images[activeImageIndex]}
              alt={`${selectedCategory.name} article ${activeImageIndex + 1}`}
              className="articles-slide-image img-fluid w-100"
              fetchPriority="high"
            />
            <div className="articles-carousel-controls d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="articles-carousel-button"
                onClick={showPrevious}
                aria-label="Previous article"
              >
                ‹
              </button>
              <span className="articles-slide-count" aria-live="polite">
                {activeImageIndex + 1} / {selectedCategory.images.length}
              </span>
              <button
                type="button"
                className="articles-carousel-button"
                onClick={showNext}
                aria-label="Next article"
              >
                ›
              </button>
            </div>
          </div>
          <section className="articles-topics mt-4" aria-labelledby="articles-topics-heading">
            <h2 id="articles-topics-heading" className="articles-topics-title h5 mb-3">
              List of Topics
            </h2>
            <ul className="articles-topic-list list-unstyled d-flex flex-wrap gap-2 mb-0">
              {selectedCategory.topics.map((topic) => (
                <li className="articles-topic-item" key={topic}>{topic}</li>
              ))}
            </ul>
          </section>
          <button
            type="button"
            className="btn articles-back-button mt-3 px-4 py-2"
            onClick={() => setSelectedCategoryId(null)}
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="articles-page articles-home-page min-vh-100">
      <div className="articles-home-content container px-3 px-sm-4 py-4">
        <h1 className="articles-main-title mb-2">{data.title}</h1>
        <p className="articles-main-description mb-3">{data.description}</p>
        <div className="row g-3">
          {data.categories.map((category) => (
            <div className="col-6" key={category.id}>
              <button
                type="button"
                className="articles-category-card w-100 h-100 d-flex flex-column align-items-center justify-content-center"
                onClick={() => openCategory(category.id)}
                aria-label={`Open ${category.name} articles`}
              >
                <img
                  src={category.icon}
                  alt=""
                  className="articles-category-icon img-fluid"
                  loading="lazy"
                />
                <span>{category.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ArticlesPage;
