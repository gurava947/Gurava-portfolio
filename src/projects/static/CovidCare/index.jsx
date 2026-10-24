import "./index.css";

function CovidCare({ data }) {
  return (
    <div className="covid-page py-4">
      <div className="container">
        {/* Page Title */}
        <p className="text-center text-primary fw-bold mb-4">
          {data.pageTitle}
        </p>

        {/* Hero Section */}
        <section className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-12 col-md-7 order-2 order-md-1">
              <h1 className="h3 fw-bold text-dark mb-3">
                {data.hero.title}
              </h1>

              <button
                type="button"
                className="btn btn-primary px-4 py-2 rounded-3 shadow-sm"
              >
                {data.hero.buttonText}
              </button>
            </div>

            <div className="col-12 col-md-5 order-1 order-md-2 text-center">
              <img
                src={data.hero.image}
                alt="Medical care"
                className="img-fluid hero-image"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* COVID-19 Test Section */}
        <section className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
          <div className="row align-items-center g-3">
            <div className="col-4 col-sm-3 text-center">
              <img
                src={data.test.image}
                alt="COVID-19 test"
                className="img-fluid test-image"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="col-8 col-sm-9">
              <h2 className="h5 fw-bold text-dark mb-2">
                {data.test.title}
              </h2>

              <p className="text-secondary mb-0">
                {data.test.description}
              </p>
            </div>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-4">
          <h2 className="h4 fw-bold text-dark mb-3">
            {data.symptomsTitle}
          </h2>

          <div className="row g-3">
            {data.symptoms.map((symptom) => (
              <div
                key={symptom.id}
                className="col-4"
              >
                <div className="symptom-card bg-white rounded-4 shadow-sm text-center p-2 p-md-3 h-100">
                  <img
                    src={symptom.image}
                    alt={symptom.title}
                    className="img-fluid symptom-image mb-2"
                    loading="lazy"
                    decoding="async"
                  />

                  <p className="small fw-semibold text-dark mb-0">
                    {symptom.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Videos */}
        <section>
          <h2 className="h4 fw-bold text-dark mb-3">
            {data.videosTitle}
          </h2>

          <div className="bg-white rounded-4 shadow-sm p-3 p-md-4">
            <div className="row align-items-center g-3">
              <div className="col-5 col-md-4 text-center">
                <img
                  src={data.video.image}
                  alt="Doctor explaining COVID-19 prevention"
                  className="img-fluid doctor-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="col-7 col-md-8">
                <h3 className="h5 fw-bold text-dark mb-2">
                  {data.video.title}
                </h3>

                <p className="text-secondary mb-3">
                  {data.video.description}
                </p>

                <button
                  type="button"
                  className="btn btn-primary px-3 py-2 rounded-3 shadow-sm"
                >
                  {data.video.buttonText}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CovidCare;
