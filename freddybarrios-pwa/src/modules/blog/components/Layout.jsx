import React from "react";

import "../App.css";
import Header from "../containers/Header";
import Footer from "../containers/Footer";
import Content from "../containers/Content";

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}

export default Layout;
