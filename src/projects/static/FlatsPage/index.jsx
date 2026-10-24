import { useState } from "react";
import "./index.css";

function FlatsPage({ data }) {
  const [page, setPage] = useState("home");
  const [selectedFlatId, setSelectedFlatId] = useState(null);
  const selectedFlat = data.flats.find((flat) => flat.id === selectedFlatId);

  if (page === "details" && selectedFlat) {
    return (
      <FlatDetails
        flat={selectedFlat}
        data={data}
        onBack={() => setPage("list")}
        onConfirm={() => {
          setSelectedFlatId(null);
          setPage("home");
        }}
      />
    );
  }

  if (page === "list") {
    return (
      <FlatsList
        data={data}
        onSelect={(flatId) => {
          setSelectedFlatId(flatId);
          setPage("details");
        }}
        onBack={() => setPage("home")}
      />
    );
  }

  return <FlatsHome data={data} onBook={() => setPage("list")} />;
}

function FlatsHome({ data, onBook }) {
  return (
    <main
      className="sunrise-page sunrise-home-page min-vh-100 d-flex align-items-end"
      style={{ backgroundImage: `url("https://assets.ccbp.in/frontend/static-website/flats-list-bg.png")` }}
    >
      <section className="sunrise-home-card w-100 text-center">
        <h1 className="sunrise-home-title mb-2">{data.title}</h1>
        <p className="sunrise-home-description mb-4">{data.homeDescription}</p>
        <button type="button" className="btn sunrise-button px-4 py-2" onClick={onBook}>
          {data.bookButtonText}
        </button>
      </section>
    </main>
  );
}

function FlatsList({ data, onSelect, onBack }) {
  return (
    <main className="sunrise-page sunrise-list-page min-vh-100">
      <div className="sunrise-list-content container px-3 px-sm-4 py-4">
        <h1 className="sunrise-list-title h3 mb-3">{data.title}</h1>
        <div className="d-flex flex-column gap-3">
          {data.flats.map((flat) => (
            <button
              type="button"
              className="flat-list-card w-100 text-start"
              key={flat.id}
              onClick={() => onSelect(flat.id)}
              aria-label={`View ${flat.title}`}
            >
              <img src={flat.cardImage} alt="" className="flat-list-image img-fluid" loading="lazy" />
              <span className="flat-list-copy">
                <span className="flat-list-name">{flat.title}</span>
                <span className="flat-list-description">{flat.description}</span>
              </span>
            </button>
          ))}
        </div>
        <button type="button" className="btn sunrise-button mt-4 px-4 py-2" onClick={onBack}>
          {data.backButtonText}
        </button>
      </div>
    </main>
  );
}

function FlatDetails({ flat, data, onBack, onConfirm }) {
  return (
    <main className="sunrise-page sunrise-details-page min-vh-100">
      <img
        src={flat.detailImage}
        alt={`${flat.title} interior`}
        className="flat-detail-image img-fluid w-100"
        fetchPriority="high"
      />
      <section className="flat-detail-content container px-3 px-sm-4 py-4">
        <h1 className="flat-detail-title h3 mb-3">{flat.title}</h1>
        <p className="flat-detail-description mb-4">{flat.description}</p>
        <div className="flat-location d-flex align-items-center gap-3 mb-4">
          <img
            src={data.locationImage}
            alt=""
            className="flat-location-icon img-fluid"
            loading="lazy"
          />
          <p className="mb-0">{flat.address}</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn sunrise-button px-4 py-2" onClick={onConfirm}>
            {data.confirmButtonText}
          </button>
          <button type="button" className="btn sunrise-button sunrise-button-secondary px-4 py-2" onClick={onBack}>
            {data.backButtonText}
          </button>
        </div>
      </section>
    </main>
  );
}

export default FlatsPage;
