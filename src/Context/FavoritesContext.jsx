import React, { createContext, useState, useContext } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add favorite
  const addFavorite = (book) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.key === book.key)) return prev;
      return [...prev, book];
    });
  };

  // Remove favorite
  const removeFavorite = (key) => {
    setFavorites((prev) => prev.filter((book) => book.key !== key));
  };

  // Toggle favorite
  const toggleFavorite = (book) => {
    const exists = favorites.find((fav) => fav.key === book.key);
    if (exists) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
