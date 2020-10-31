import React from "react";
import "../assets/styles/containers/Home.css";
import ListItem from "../components/ListItem";

const Home = ({match}) => {
  return (
  <section className="home">
    <ListItem link={`${match.path}post/123-title`} />
    <ListItem link={`${match.path}post/123-title-2`}/>
  </section>
)};

export default Home;
