import "./index.css";

function CodingPractice({ data }) {
  return (
    <main className="coding-background-section d-flex flex-column justify-content-center align-items-center p-3 p-md-4">
      <div className="row w-100 mx-0 justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 coding-practice-content">
          <div className="coding-practice-card bg-dark bg-opacity-75 border border-success border-2 rounded-0 shadow-lg p-4 p-md-5">
            <h1 className="h2 fw-bold text-white text-center mb-0">
              {data.title}
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CodingPractice;
