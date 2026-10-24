import { useState } from "react";
import "./index.css";

const animals = [
  {
    id: "turtles",
    name: "Turtles",
    image: "https://assets.ccbp.in/frontend/static-website/animals-turtle-img.png",
    background: "https://assets.ccbp.in/frontend/static-website/animals-turtle-bg.png",
    description: "Turtles are reptiles known for their protective shells and calm movement.",
  },
  {
    id: "raccoon",
    name: "Raccoon",
    image: "https://assets.ccbp.in/frontend/static-website/animals-raccoon-img.png",
    background: "https://assets.ccbp.in/frontend/static-website/animals-raccoon-bg.png",
    description: "Raccoons are clever nocturnal mammals with distinctive masked faces.",
  },
  {
    id: "kangaroos",
    name: "Kangaroos",
    image: "https://assets.ccbp.in/frontend/static-website/animals-kangaroo-img.png",
    background: "https://assets.ccbp.in/frontend/static-website/animals-kangaroo-bg.png",
    description: "Kangaroos are iconic Australian animals that move by powerful hopping.",
  },
  {
    id: "lions",
    name: "Lions",
    image: "https://assets.ccbp.in/frontend/static-website/animals-lion-img.png",
    background: "https://assets.ccbp.in/frontend/static-website/animals-lion-bg.png",
    description: "Lions are social big cats that live and hunt together in prides.",
  },
];

function AnimalsIntegration() {
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const selectedAnimal = animals.find((animal) => animal.id === selectedAnimalId);

  if (selectedAnimal) {
    return (
      <main
        className="animals-detail-page"
        style={{ backgroundImage: `url(${selectedAnimal.background})` }}
      >
        <div className="animals-detail-content">
          <img src={selectedAnimal.image} alt={selectedAnimal.name} className="animals-detail-image" />
          <div className="animals-detail-card">
            <p className="animals-eyebrow">Animal details</p>
            <h1>{selectedAnimal.name}</h1>
            <p>{selectedAnimal.description}</p>
            <button type="button" className="btn btn-light" onClick={() => setSelectedAnimalId(null)}>
              Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="animals-home-page">
      <section className="animals-hero">
        <p className="animals-eyebrow">CCBP UI Kit</p>
        <h1>Animals</h1>
        <p>Explore the animal kingdom</p>
      </section>
      <section className="animals-grid" aria-label="Animals list">
        {animals.map((animal) => (
          <article className="animal-card" key={animal.id}>
            <img src={animal.image} alt={animal.name} />
            <div className="animal-card-body">
              <h2>{animal.name}</h2>
              <button type="button" className="btn btn-primary" onClick={() => setSelectedAnimalId(animal.id)}>
                View Details
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AnimalsIntegration;
