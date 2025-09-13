import React, { useState, useRef, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ popularBooks = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  // ✅ Always run hooks (never conditional)
  useEffect(() => {
    if (popularBooks.length > 0) {
      startAutoScroll();
    }
    return () => {
      stopAutoScroll();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, [popularBooks]);

  const startAutoScroll = () => {
    stopAutoScroll(); // clear old interval
    if (popularBooks.length > 1) {
      autoScrollRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % popularBooks.length);
      }, 2500);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  };

  const pauseAutoScroll = () => {
    stopAutoScroll();
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 5000);
  };

  // ✅ Safe handling if no books
  if (!popularBooks || popularBooks.length === 0) {
    return (
      <section className="carousel-wrapper empty">
        <p>No books available right now 📚</p>
      </section>
    );
  }

  // Show 4 books at a time
  const visibleBooks = popularBooks
    .concat(popularBooks) // seamless loop
    .slice(currentIndex, currentIndex + 4);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + popularBooks.length) % popularBooks.length);
    pauseAutoScroll();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % popularBooks.length);
    pauseAutoScroll();
  };

  return (
    <section className="carousel-wrapper">
      <button className="arrow left" onClick={handlePrev}>
        ❮
      </button>

      <div className="carousel-container">
        {visibleBooks.map((book, idx) => {
          const key = book.key || book.cover_i || idx;
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "https://via.placeholder.com/300x450?text=No+Cover";

          return (
            <article key={key} className="carousel-book-card">
              <div className="carousel-cover-wrap">
                <img className="carousel-book-cover" src={cover} alt={book.title} />
              </div>
              <div className="carousel-book-info">
                <h4 className="carousel-book-title">{book.title}</h4>
                <p className="carousel-book-author">
                  {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <button className="arrow right" onClick={handleNext}>
        ❯
      </button>
    </section>
  );
}
