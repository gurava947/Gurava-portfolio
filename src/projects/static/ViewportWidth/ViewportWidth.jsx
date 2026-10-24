import "./index.css";

function ViewportWidth({ data }) {
  return (
    <main className="viewport-width-page container-fluid min-vh-100 p-0">
      <div className="viewport-bands">
        {data.sections.map((section) => (
          <section
            key={section.id}
            className={`viewport-band d-flex align-items-center ${section.colorClass}`}
          >
            <p className="band-text text-white fw-bold mb-0">{section.text}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

export default ViewportWidth;
