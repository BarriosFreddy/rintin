import React from "react";
import "../assets/styles/containers/Header.css";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="header">
    <div className="header__home">
      <Link to="/"><h1>Freddy Barrios</h1></Link>
    </div>
    <nav className="header__nav">
    </nav>
  </header>
);

export default Header;
