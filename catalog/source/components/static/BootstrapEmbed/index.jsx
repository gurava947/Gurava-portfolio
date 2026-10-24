import "./index.css";

function BootstrapEmbed() {
  return (
    <main className="bootstrap-embed-page">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          className="embed-responsive-item"
          src="https://www.youtube.com/embed/PLzhUUGdT_c?rel=0"
          title="Bootstrap Embed video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </main>
  );
}

export default BootstrapEmbed;
