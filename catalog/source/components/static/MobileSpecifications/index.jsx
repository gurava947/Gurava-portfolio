import "./index.css";

function MobileSpecifications({ data }) {
  return (
    <div className="mobile-page min-vh-100 d-flex justify-content-center">
      <main className="mobile-content bg-white shadow-sm">
        <img
          src={data.image}
          alt="iPhone X"
          className="mobile-image w-100"
          fetchPriority="high"
          decoding="async"
        />

        <section className="specifications-section px-4 py-4">
          <h1 className="h4 fw-bold text-dark mb-3">
            {data.title}
          </h1>

          <ul className="mb-4 ps-4">
            {data.specifications.map((specification, index) => (
              <li
                key={index}
                className="text-dark mb-3 ps-1"
              >
                {specification}
              </li>
            ))}
          </ul>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-primary px-3 py-2 rounded-2 shadow-sm"
            >
              {data.buttonText}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MobileSpecifications;
