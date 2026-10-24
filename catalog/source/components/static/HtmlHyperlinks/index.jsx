import "./index.css";

function HtmlHyperlinks() {
  return (
    <main className="html-hyperlinks-page">
      <section className="profile-section" aria-labelledby="profile-title">
        <h1 id="profile-title">Profile</h1>
        <p className="profile-copy">
          Visit <a href="https://www.google.com/" target="_blank" rel="noreferrer">Google</a> to explore the web.
        </p>
        <a href="#bio" className="profile-image-link" aria-label="Go to bio section">
          <img src="https://assets.ccbp.in/frontend/static-website/profile-img.png" alt="Profile" />
        </a>
      </section>

      <section id="bio" className="bio-section" aria-labelledby="bio-title">
        <img src="https://assets.ccbp.in/frontend/static-website/bio-img.png" alt="Bio" />
        <div>
          <p className="section-eyebrow">About me</p>
          <h2 id="bio-title">Bio</h2>
          <p>Learn more about this profile and the person behind the page.</p>
        </div>
      </section>
    </main>
  );
}

export default HtmlHyperlinks;
