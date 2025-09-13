import React, { useState, useEffect, useRef, useContext } from "react";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import BookGrid from "../components/BookGrid";
import Footer from "../components/Footer";
import Suggestions from "../components/Suggestions";
import { searchBooks, getPopularBooks } from "../BookService";
import { FavoritesContext } from "../Context/FavoritesContext";
import "./Home.css";

function Home() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext); // ✅ favorites context
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [popularBooks, setPopularBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const cardsRef = useRef(null);

  // ✅ Fetch popular books on mount
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const popular = await getPopularBooks();
        setPopularBooks(popular);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };
    fetchPopular();
  }, []);

  // ✅ Search handler
  const handleSearch = async (e, term = null) => {
    if (e && e.preventDefault) e.preventDefault();
    const searchTerm = term || query;
    if (!searchTerm.trim()) return;

    try {
      const results = await searchBooks(searchTerm);
      setBooks(results);

      // Update search history
      setSearchHistory((prev) => {
        const updated = [searchTerm, ...prev.filter((item) => item !== searchTerm)];
        return updated.slice(0, 5);
      });

      setSelectedGenre("");
      setQuery(searchTerm);

      // Scroll to results
      setTimeout(() => {
        if (cardsRef.current) {
          cardsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    }
  };

  // ✅ Genre select handler
  const handleGenreSelect = async (genre) => {
    try {
      const results = await searchBooks(genre);
      setBooks(results);
      setSelectedGenre(genre);
      setQuery("");

      // Scroll to results
      setTimeout(() => {
        if (cardsRef.current) {
          cardsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error fetching genre books:", error);
      setBooks([]);
    }
  };

  return (
    <div className="home">
      {/* Navbar with search + favorites */}
      <Navbar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        searchHistory={searchHistory}
      />

      {/* Popular Books Carousel */}
      <div className="books-section">
        <h2 className="section-title">Popular Books</h2>
        <Carousel popularBooks={popularBooks} />
      </div>

      {/* Genre Suggestions */}
      <Suggestions onGenreSelect={handleGenreSelect} />

      {/* Search / Genre Results */}
      <div className="container mt-5" ref={cardsRef}>
        {books.length > 0 && (
          <>
            <h2 className="section-title">
              {selectedGenre ? `${selectedGenre} Books` : "Search Results"}
            </h2>

            {/* BookGrid with favorites support */}
            <BookGrid books={books} toggleFavorite={toggleFavorite} favorites={favorites} />
          </>
        )}
      </div>

      {/* Favorites Section (Optional) */}
      {favorites.length > 0 && (
        <div className="container mt-5">
          <h2 className="section-title">My Favorites</h2>
          <BookGrid books={favorites} toggleFavorite={toggleFavorite} favorites={favorites} />
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
