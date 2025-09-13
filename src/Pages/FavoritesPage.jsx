import React, { useContext } from "react";
import { FavoritesContext } from "../Context/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  if (favorites.length === 0) return <h3>No favorite books yet.</h3>;

  return (
    <div className="favorites-page">
      <h2>My Favorites</h2>
      <div className="book-grid">
        {favorites.map((book, idx) => {
          const key = book.key || idx;
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/200x300?text=No+Cover";

          return (
            <div key={key} className="book-card">
              <img src={cover} alt={book.title} className="book-cover" />
              <h4>{book.title}</h4>
              <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
              <button onClick={() => toggleFavorite({ ...book, key })}>
                Remove from Favorites
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
