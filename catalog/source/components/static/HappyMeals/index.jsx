import "./index.css";

function HappyMeals({ title, description }) {
  return (
    <main className="happy-meals-page">
      <div className="bg bg-primary text-center happy-meals-preview">
        <h1 className="text text-white text-uppercase">{title}</h1>
        <p className="text text-light text-capitalize">{description}</p>
      </div>
    </main>
  );
}

export default HappyMeals;
