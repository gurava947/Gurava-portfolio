import { useState } from "react";
import "./index.css";

function YogaPage({ data }) {
  const [showTypes, setShowTypes] = useState(false);

  if (showTypes) {
    return <YogaTypes data={data.types} onBack={() => setShowTypes(false)} />;
  }

  return <YogaHome data={data.home} onGetStarted={() => setShowTypes(true)} />;
}

function YogaHome({ data, onGetStarted }) {
  return (
    <main
      className="yoga-page yoga-home-page min-vh-100"
      style={{ backgroundImage: `url("${data.backgroundImage}")` }}
    >
      <div className="yoga-home-content container px-4 py-4 text-center">
        <h1 className="yoga-home-title fw-bold mb-3">{data.title}</h1>
        <img
          src={data.image}
          alt="Woman practicing yoga while listening to music"
          className="yoga-home-image img-fluid"
          fetchPriority="high"
        />
        <p className="yoga-home-description mb-3">{data.description}</p>
        <button
          type="button"
          className="btn yoga-button px-3 py-2"
          onClick={onGetStarted}
        >
          {data.buttonText}
        </button>
      </div>
    </main>
  );
}

function YogaTypes({ data, onBack }) {
  return (
    <main className="yoga-page yoga-types-page min-vh-100">
      <div className="yoga-types-content container px-3 px-sm-4 py-4 text-center">
        <img
          src={data.image}
          alt="Woman seated in a yoga pose"
          className="yoga-types-image img-fluid"
          fetchPriority="high"
        />
        <h1 className="yoga-types-title h4 mb-4">{data.title}</h1>

        <div className="d-flex flex-column gap-3">
          {data.poses.map((pose) => (
            <article className="yoga-pose-card d-flex align-items-center text-start" key={pose.id}>
              <img
                src={pose.image}
                alt=""
                className="yoga-pose-image img-fluid"
                loading="lazy"
              />
              <div className="yoga-pose-copy">
                <h2 className="yoga-pose-title h6 mb-2">{pose.title}</h2>
                <p className="yoga-pose-description mb-0">{pose.description}</p>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="btn yoga-button mt-3 px-4 py-2" onClick={onBack}>
          {data.backButtonText}
        </button>
      </div>
    </main>
  );
}

export default YogaPage;
