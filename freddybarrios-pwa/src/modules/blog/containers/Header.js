import React from "react";
import "../assets/styles/containers/Header.css";
import {Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
import LogoJS from "../../../assets/images/JS_64.png";

const Header = () => (
  <header className="header">
    <div className="header__home">
      <Image src={LogoJS} rounded />
      <Link to="/"><h1>Freddy Barrios</h1></Link>
    </div>
    <nav className="header__nav">
    </nav>
  </header>
);

export default Header;
