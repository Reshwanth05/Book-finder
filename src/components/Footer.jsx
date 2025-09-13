import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>Powered by OpenLibrary API</p>
      <p>&copy; {new Date().getFullYear()} Book Finder</p>
    </footer>
  );
}

export default Footer;
