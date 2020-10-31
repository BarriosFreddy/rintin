import React from "react";
import "../assets/styles/components/ListItem.css";
import moment from "moment";
import { Link } from "react-router-dom";

const ListItem = ({link}) => (
  <section className="item">
    <Link to={link}>
      <h3 className="item__title">An awesome headline about some topic</h3>
      <div>{moment().format("LL")}</div>
      <div className="item__description">Description about the article...</div>
    </Link>
  </section>
);

export default ListItem;
