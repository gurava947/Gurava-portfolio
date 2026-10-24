import "./index.css";

function ViewportWidthScale({ data }) {
  return (
    <main className="viewport-width-scale-page container-fluid min-vh-100 p-0">
      <div className="viewport-width-scale-container">
        {data.items.map((item) => (
          <p
            key={item.id}
            className={`${item.className} text-white fw-bold d-flex align-items-center mb-0`}
          >
            {item.text}
          </p>
        ))}
      </div>
    </main>
  );
}

export default ViewportWidthScale;
