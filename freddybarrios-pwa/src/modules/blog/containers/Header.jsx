import React from "react";
import "../assets/styles/containers/Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="header__home">
      <Link to="/">Freddy Barrios</Link>
    </div>
    <nav className="header__nav">
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  </header>
);

export default Header;
