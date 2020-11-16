import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/containers/Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="footer__legend">
      <p>© Copyright 2020, Freddy Barrios</p>
      <Link to='/auth/signin'>Sing in</Link>
    </div>
  </footer>
);

export default Footer;
