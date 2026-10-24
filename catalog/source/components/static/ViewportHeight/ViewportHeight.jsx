import "./index.css";

function ViewportHeight({ data }) {
  return (
    <main className="viewport-height-page container-fluid min-vh-100 p-0">
      <div className="viewport-height-columns d-flex flex-row align-items-start">
        {data.sections.map((section) => (
          <section
            key={section.id}
            className={`viewport-height-column d-flex align-items-center justify-content-center ${section.className}`}
          >
            <p className="viewport-height-text text-white fw-bold mb-0">
              {section.text}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}

export default ViewportHeight;
