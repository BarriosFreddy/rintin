import React from "react";
import { connect } from "react-redux";
import { findAllPosts } from "../../../store/actions";
import "../assets/styles/containers/Home.css";
import ListItem from "../components/ListItem";

class Home extends React.Component {

  componentDidMount() {
    this.props.findAll()
  }

  render() {
    const { match, posts } = this.props;
    return (
      <section className="home">
        {!posts && <h1>LOADING...</h1>}
        {posts && posts.map(post => <ListItem key={post.id} {...post} link={`${match.path}post/${post.id}`} />)}
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { posts } = state.posts;
  return {
    posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findAll: (pageSize) => dispatch(findAllPosts(pageSize)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
