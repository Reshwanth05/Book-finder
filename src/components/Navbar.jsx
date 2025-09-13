import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FavoritesContext } from "../Context/FavoritesContext";

function Navbar({ query, setQuery, onSearch, searchHistory }) {
  const { favorites } = useContext(FavoritesContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo + Title */}
        <img
          src="https://img.freepik.com/premium-vector/book-finder-logo-design-template_145155-4553.jpg"
          alt="Book Finder Logo"
          className="logo"
        />
        <h1 className="navbar-title">Book Finder</h1>
      </div>

      <div className="navbar-center">
        {/* ✅ Controlled form */}
        <form className="search-form" onSubmit={(e) => onSearch(e)}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={query} // ✅ controlled input
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {/* ✅ Optional: show search history */}
        {searchHistory && searchHistory.length > 0 && (
          <div className="search-history">
            {searchHistory.map((term, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => onSearch(e, term)}
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ✅ Favorites Button */}
      <div className="navbar-right">
        <Link to="/favorites" className="fav-link">
          ❤️ Favorites {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
