import "./index.css";

function ScubaDiving({ data }) {
  return (
    <main id="sectionScubaDiving" className="scuba-diving-page min-vh-100">
      <div className="container-fluid px-3 px-md-5 py-3 text-center text-white">
        <h1 className="scuba-title fw-bold mb-4">{data.title}</h1>
        <p className="scuba-description mx-auto mb-0">{data.description}</p>
      </div>
    </main>
  );
}

export default ScubaDiving;
