import { useState } from "react";
import "./index.css";

function BookStore({ data }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const allBooks = [data.popularBook, ...data.recommendedBooks];
  const activeBook = allBooks.find((book) => book.id === selectedBook);

  if (activeBook) {
    return (
      <BookDetails
        book={activeBook}
        data={data}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  return (
    <div className="book-store-page min-vh-100">
      <main className="container book-store-content px-3 px-sm-4 py-4">
        <h1 className="book-section-title h4 fw-bold mb-3">{data.popularTitle}</h1>

        <article className="popular-book-card rounded-3 mb-4">
          <div className="row g-0 align-items-center">
            <div className="col-5 col-sm-4">
              <img
                src={data.popularBook.image}
                alt={`${data.popularBook.title} book cover`}
                className="popular-book-image img-fluid w-100 rounded-start"
                fetchPriority="high"
              />
            </div>
            <div className="col-7 col-sm-8 p-2 p-sm-3">
              <h2 className="book-title h6 fw-bold mb-2">{data.popularBook.title}</h2>
              <p className="book-small-text fw-bold mb-2">{data.popularBook.subtitle}</p>
              <p className="book-small-text mb-2">{data.popularBook.author}</p>
              <button
                type="button"
                className="btn btn-primary btn-sm px-3"
                onClick={() => setSelectedBook(data.popularBook.id)}
              >
                {data.readButtonText}
              </button>
            </div>
          </div>
        </article>

        <h2 className="book-section-title h4 fw-bold mb-3">{data.recommendedTitle}</h2>
        <div className="d-flex flex-column gap-3">
          {data.recommendedBooks.map((book) => (
            <article key={book.id} className="recommended-book-item row align-items-center g-2">
              <div className="col-3">
                <img
                  src={book.image}
                  alt={`${book.title} book cover`}
                  className="recommended-book-image img-fluid w-100 rounded-1"
                  loading="lazy"
                />
              </div>
              <div className="col-9">
                <h3 className="book-title h6 fw-bold mb-2">{book.title}</h3>
                <p className="book-small-text fw-bold mb-1">{book.subtitle}</p>
                <p className="book-small-text mb-2">{book.author}</p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm px-3"
                  onClick={() => setSelectedBook(book.id)}
                >
                  {data.readButtonText}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function BookDetails({ book, data, onBack }) {
  return (
    <div className="book-details-page min-vh-100">
      <main className="container book-details-content px-3 px-sm-4 py-4 text-center">
        <img
          src={book.image}
          alt={`${book.title} book cover`}
          className="book-details-image img-fluid"
          fetchPriority="high"
        />
        <h1 className="book-details-title h2 fw-bold mt-4 mb-2">{book.title}</h1>
        <p className="book-author mb-4">{book.author}</p>
        <p className="book-description text-start mb-4">{book.description}</p>
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button type="button" className="btn btn-warning px-3 py-2" onClick={onBack}>
            {data.backButtonText}
          </button>
          <button type="button" className="btn btn-primary px-3 py-2">
            {data.buyButtonText}
          </button>
        </div>
      </main>
    </div>
  );
}

export default BookStore;
