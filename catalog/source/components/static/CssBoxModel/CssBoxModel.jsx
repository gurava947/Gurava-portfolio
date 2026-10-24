import "./index.css";

function CssBoxModel({ data }) {
  return (
    <main id="sectionCssBoxModel" className="css-box-model-page min-vh-100">
      <div className="container-fluid px-0 py-2">
        <div className="d-flex flex-column align-items-start">
          {data.beaches.map((beach) => (
            <div
              key={beach.id}
              className="beach-image-container position-relative"
              style={{
                "--beach-width": `${beach.width}px`,
                "--beach-height": `${beach.height}px`,
                width: `${beach.width}px`,
                height: `${beach.height}px`,
              }}
            >
              <img
                src={beach.image}
                alt={`${data.title} view ${beach.id}`}
                width={beach.width}
                height={beach.height}
                className="beach-image d-block"
                loading={beach.id === data.beaches[0].id ? "eager" : "lazy"}
              />
              <h1 className="beach-title position-absolute top-0 start-50 translate-middle-x mb-0">
                {data.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default CssBoxModel;
