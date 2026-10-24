import "./index.css";

function FoodOrder({ data }) {
  return (
    <main className="food-background-section d-flex flex-column justify-content-end">
      <div className="container-fluid food-order-container px-0">
        <section className="food-card-content p-4 p-md-5 rounded-4 shadow-lg card-styles">
          <div className="food-order-copy text-center">
            <h1 className="h2 fw-bold mb-3">{data.heading}</h1>
            <p className="fs-6 fw-semibold mb-4">{data.description}</p>
            <button
              type="button"
              className="btn btn-primary primary fw-bold px-4 py-2 rounded-3 shadow-sm"
            >
              {data.buttonText}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodOrder;
