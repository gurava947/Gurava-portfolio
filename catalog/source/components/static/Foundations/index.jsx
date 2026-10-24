import "./index.css";

function Foundations({ data }) {
  return (
    <main className="foundations-page min-vh-100">
      <header
        className="foundations-hero"
        style={{ backgroundImage: `url("${data.backgroundImage}")` }}
        aria-label="Programming code on a screen"
      />

      <section className="foundations-content container px-4 py-4">
        <h1 className="foundations-title h3 fw-bold mb-2">{data.title}</h1>
        <p className="foundations-description mb-3">{data.description}</p>

        <div className="row g-3">
          {data.technologies.map((technology) => (
            <div className="col-6" key={technology.id}>
              <article className="foundation-technology-card h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <img
                  src={technology.image}
                  alt=""
                  className="foundation-technology-image img-fluid"
                  loading="lazy"
                />
                <h2 className="foundation-technology-name mb-0">{technology.name}</h2>
              </article>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Foundations;
