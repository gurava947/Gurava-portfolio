import "./index.css";

function TodoList({ data }) {
  return (
    <div className="bg-container">
      <div className="container px-3 py-5">
        {/* Main Header */}
        <div className="mb-5 text-center text-white">
          <h1 className="fw-bold mb-3">
            {data.title}
          </h1>

          <p className="mb-0">
            {data.description}
          </p>
        </div>

        {/* Profiles */}
        <div className="row align-items-start justify-content-center g-4">
          {data.profiles.map((profile, index) => (
            <div
              key={index}
              className="col-12 col-md-8 col-lg-6"
            >
              <div className="card border-0 rounded-4 shadow-lg">
                <div className="card-body p-4 p-md-5">
                  {/* Card Content */}
                  <h2 className="h5 fw-bold mb-3">
                    {profile.cardTitle}
                  </h2>

                  <p className="mb-4 lh-lg">
                    {profile.cardText}
                  </p>

                  {/* Button Section */}
                  <div className="text-center mt-4">
                    <button
                      type="button"
                      className="btn btn-warning fw-bold px-4 py-2 shadow-sm mb-3"
                    >
                      {profile.buttonText}
                    </button>

                    <p className="text-decoration-underline fw-semibold mb-0">
                      {profile.footerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
