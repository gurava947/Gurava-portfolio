import "./index.css";

function HotelBooking({ data }) {
  return (
    <div className="hotel-background min-vh-100 d-flex flex-column justify-content-end position-relative">
      {/* Hotel Details */}
      <div className="container-fluid hotel-content-shell px-2 px-sm-3">
        <div className="row g-0 justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 px-2">
            <div className="bg-dark bg-opacity-75 text-white rounded-4 shadow-lg p-3 p-sm-4 my-3">
              <h1 className="h2 fw-bold mb-3">
                {data.hotelName}
              </h1>

              <p className="fs-5 mb-2">
                {data.location}
              </p>

              <p className="fs-4 fw-bold mb-0">
                {data.price}
              </p>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <div className="text-center px-3 pb-4">
          <button
            type="button"
            className="btn btn-light fw-bold px-5 py-2 rounded-3 shadow"
          >
            {data.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelBooking;
