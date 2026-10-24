import { useState } from "react";
import "./index.css";
import HappyMeals from "../HappyMeals";

function MyProjects({ data }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const selectedProject = data.projects.find((project) => project.id === selectedProjectId);

  if (selectedProject) {
    return (
      <ProjectDetails
        project={selectedProject}
        onBack={() => setSelectedProjectId(null)}
      />
    );
  }

  return (
    <div className="my-projects-page min-vh-100">
      <section className="home-section">
        <div className="container my-projects-content px-3 px-sm-4 py-4 text-center">
          <img
            src={data.hero.image}
            alt="Software developer working on projects"
            className="developer-image img-fluid"
            fetchPriority="high"
          />
          <h1 className="projects-title mb-3">{data.hero.title}</h1>
          <p className="projects-description mb-4">{data.hero.description}</p>
          <div className="row g-3">
            {data.projects.map((project) => (
              <div key={project.id} className="col-6">
                <button
                  type="button"
                  className="project-thumbnail-button w-100 border-0 p-0 bg-transparent"
                  onClick={() => setSelectedProjectId(project.id)}
                  aria-label={`Open ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project`}
                    className="project-thumbnail img-fluid w-100 rounded-2"
                    loading="lazy"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectDetails({ project, onBack }) {
  if (project.id === "advanced-technologies") {
    return (
      <div className="my-project-detail advanced-project-background min-vh-100 d-flex flex-column justify-content-end">
        <div className="project-bottom-card bg-white rounded-top-4 p-4">
          <h1 className="detail-heading mb-2">{project.title}</h1>
          <p className="detail-description mb-4">{project.description}</p>
          <div className="d-flex flex-wrap gap-2">
            <button type="button" className="btn btn-outline-secondary px-4">
              {project.buttonText}
            </button>
            <BackButton onBack={onBack} />
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "diwali") {
    return (
      <div className="diwali-detail-page min-vh-100">
        <div className="diwali-banner" style={{ backgroundImage: `url("${project.image}")` }}>
          <h1 className="diwali-heading">{project.title}</h1>
        </div>
        <div className="diwali-products-section container px-3 px-sm-4 py-4">
          <div className="row g-3 g-sm-4">
            {project.products.map((product) => (
              <div key={product.name} className="col-6">
                <article className="diwali-product-card bg-white rounded-3 p-3 text-center shadow-sm h-100">
                  <div className="diwali-product-icon" aria-hidden="true">{product.emoji}</div>
                  <p className="mb-2">{product.name}</p>
                  <h2 className="h5 mb-0">{product.price}</h2>
                </article>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <BackButton onBack={onBack} />
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "happy-meals") {
    return <HappyMeals title={project.title} description={project.description} />;
  }

  return (
    <div className="my-project-detail newspaper-background min-vh-100 d-flex flex-column justify-content-end">
      <div className="newspaper-card bg-white rounded-top-4 p-4">
        <p className="news-category mb-3">{project.category}</p>
        <h1 className="news-heading h4 mb-3">{project.title}</h1>
        <p className="news-description mb-4">{project.description}</p>
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn btn-dark px-4">{project.buttonText}</button>
          <BackButton onBack={onBack} />
        </div>
      </div>
    </div>
  );
}

function BackButton({ onBack }) {
  return (
    <button type="button" className="btn btn-primary px-4" onClick={onBack}>
      Back
    </button>
  );
}

export default MyProjects;
