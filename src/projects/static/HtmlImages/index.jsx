import "./index.css";

const imageItems = [
  {
    className: "image1",
    src: "https://assets.ccbp.in/frontend/static-website/lotus-temple-img.png",
    title: "Lotus Temple",
  },
  {
    className: "image2",
    src: "https://assets.ccbp.in/frontend/static-website/kerala-img.png",
    title: "Thrivanthapuram",
  },
  {
    className: "image3",
    src: "https://assets.ccbp.in/frontend/static-website/coimbatore-img.png",
    title: "Coimbatore",
  },
];

function HtmlImages() {
  return (
    <main className="html-images-page">
      <div className="text-center">
        {imageItems.map((item) => (
          <div className="html-image-item" key={item.className}>
            <img
              src={item.src}
              className={item.className}
              width="200"
              height="200"
              alt={item.title}
            />
            <h1 className={`text${item.className.replace("image", "")}`}>
              {item.title}
            </h1>
          </div>
        ))}
      </div>
    </main>
  );
}

export default HtmlImages;
