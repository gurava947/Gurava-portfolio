import "./index.css";

function IntroductionHtmlCss({ data }) {
  return (
    <main className="html-css-exam-page min-vh-100 d-flex align-items-center justify-content-center px-3 py-4">
      <section className="html-css-exam-panel container p-4 p-sm-5 text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <h1 className="html-css-exam-title mb-3">{data.title}</h1>
            <p className="html-css-exam-description mb-4">{data.description}</p>
            <button type="button" className="btn html-css-exam-button px-4 py-2">
              {data.buttonText}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default IntroductionHtmlCss;
