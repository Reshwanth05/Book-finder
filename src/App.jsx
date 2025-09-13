// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import FavoritesPage from "./Pages/FavoritesPage";
import { FavoritesProvider } from "./Context/FavoritesContext";

function App() {
  return (
   <FavoritesProvider>
  <Router>
    {/* <Navbar /> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  </Router>
</FavoritesProvider>

  );
}

export default App;
