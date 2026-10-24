import "./index.css";

function FavoriteStores({ data }) {
  return (
    <main className="favorite-stores-page min-vh-100">
      <header className="favorite-stores-hero container-fluid d-flex align-items-center">
        <h1 className="favorite-stores-title mb-0">{data.title}</h1>
        <img
          src={data.heroImage}
          alt="Illustration of a shop and shopping cart"
          className="favorite-stores-hero-image img-fluid"
          fetchPriority="high"
        />
      </header>

      <section className="favorite-stores-panel">
        <h2 className="favorite-stores-section-title h5 fw-bold">
          {data.sectionTitle}
        </h2>

        <div className="favorite-stores-list">
          {data.stores.map((store) => (
            <article className="favorite-store-item" key={store.id}>
              <img
                src={store.image}
                alt={`${store.name} logo`}
                className="favorite-store-logo img-fluid"
                loading="lazy"
              />
              <div className="favorite-store-copy">
                <h3 className="favorite-store-name h6 fw-bold mb-2">{store.name}</h3>
                <p className="favorite-store-description mb-0">{store.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FavoriteStores;
