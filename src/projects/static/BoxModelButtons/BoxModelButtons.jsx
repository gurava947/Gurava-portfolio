import "./index.css";

function BoxModelButtons({ data }) {
  return (
    <main className="container-fluid box-model-buttons-page">
      <div>
        <h1 className="heading">{data.leafHeading}</h1>

        <button className="leaf-button" type="submit">
          {data.leafLabel}
        </button>
      </div>

      <div>
        <h1 className="heading-1">{data.stylesHeading}</h1>

        <button className="Ready" type="button">
          {data.readyLabel}
        </button>

        <button className="button-set mr-4 ml-4" type="button">
          {data.setLabel}
        </button>

        <button className="button-go" type="button">
          {data.goLabel}
        </button>
      </div>
    </main>
  );
}

export default BoxModelButtons;
