import React from "react";
import { connect } from "react-redux";
import { findAllPosts } from "../../../store/actions";
import "../assets/styles/containers/Home.css";
import ListItem from "../components/ListItem";

const Home = ({ match }) => {

  return (
  <section className="home">
    <ListItem link={`${match.path}post/123-title`} />
    <ListItem link={`${match.path}post/123-title-2`}/>
  </section>
)};

const mapStateToProps = (state) => {
  const { posts } = state.posts;
  return {
    posts,
  };
}

const mapDispatchToProps = (dispatch) => ({
  findAll: (pageSize) => dispatch(findAllPosts(pageSize)),
});

export default connect(null, mapDispatchToProps)(Home);
