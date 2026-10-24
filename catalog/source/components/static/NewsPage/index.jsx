import "./index.css";

function NewsPage({ data }) {
  return (
    <div className="news-background position-relative min-vh-100 d-flex flex-column justify-content-end">
      {/* News Content Card */}
      <div className="container-fluid news-content-shell">
        <div className="bg-white rounded-top-4 shadow-lg p-4 p-md-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <p className="text-secondary fw-bold mb-3">
                {data.category}
              </p>

              <h1 className="h3 fw-bold text-dark mb-3">
                {data.heading}
              </h1>

              <p className="text-secondary lh-lg mb-4">
                {data.description}
              </p>

              <button
                type="button"
                className="btn btn-dark px-4 py-2 rounded-4 shadow-sm"
              >
                {data.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsPage;
