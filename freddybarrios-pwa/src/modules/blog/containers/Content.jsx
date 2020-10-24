import React from "react";
import "../assets/styles/containers/Content.css";

const Content = ({ title, children }) => (
  <main className="content">
    <section className="content__headline">
      <h1 className="content__headline--title">{title}</h1>
    </section>
    {children}
  </main>
);

export default Content;
