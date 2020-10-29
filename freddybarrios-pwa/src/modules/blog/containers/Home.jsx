import React from "react";
import "../assets/styles/containers/Home.css";
import ListItem from "../components/ListItem";

const Home = ({match}) => {
 console.log({match});
  return (
  <section className="home">
    <ListItem />
    <ListItem />
  </section>
)};

export default Home;
