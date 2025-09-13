// src/components/BookCard.jsx
import React from "react";
import { useFavorites } from "../Context/FavoritesContext"; // ✅ use our hook
import "./BookCard.css";

function BookCard({ book }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.key === book.key);

  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/300x450?text=No+Cover";

  return (
    <article className="book-card">
      <img src={cover} alt={book.title} className="book-cover" />

      <div className="book-info">
        <h4>{book.title}</h4>
        <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
      </div>

      <button
        className="favorite-btn"
        onClick={() =>
          isFavorite ? removeFavorite(book.key) : addFavorite(book)
        }
      >
        {isFavorite ? "💔 Remove" : "❤️ Add"}
      </button>
    </article>
  );
}

export default BookCard;
