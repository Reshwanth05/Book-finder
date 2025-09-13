// src/components/BookGrid.jsx
import React, { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";
import "./BookGrid.css";

export default function BookGrid({ books }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  return (
    <div className="book-grid">
      {books.map((book, idx) => {
        const key = book.key || book.cover_i || idx;
        const cover = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/200x300?text=No+Cover";
        const isFav = favorites.some((b) => b.key === key);
        const publishedYear = book.first_publish_year || "Unknown Year";

        return (
          <div key={key} className="book-card">
            <img src={cover} alt={book.title} className="book-cover" />
            <div className="book-info">
              <h4 className="book-title">{book.title}</h4>
              <p className="book-author">
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
              </p>
              <p className="book-year">{publishedYear}</p>
            </div>
            <button
              className={`fav-btn ${isFav ? "active" : ""}`}
              onClick={() => toggleFavorite({ ...book, key })}
            >
              {isFav ? "❤️ Remove" : "🤍 Add"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
