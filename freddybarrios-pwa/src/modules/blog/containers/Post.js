import React from "react";
import "../assets/styles/containers/Post.css";
import snarkdown from "snarkdown";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { connect } from "react-redux";
import { findPostById } from "../../../store/actions";

class Post extends React.Component {

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.findPostById(id);
  }
  render() {
    const { post: { title, body_markdown } ={} } = this.props;

    return title ?
      <section className="post">
        <h1 className='post__title'>{title}</h1>
        <ReactMarkdown plugins={[gfm]} children={body_markdown}></ReactMarkdown>
      </section>
     : <h1 className='post__loading'>Loading...</h1>;
  }
}
const mapStateToProps = (state) => {
  const { post } = state.posts;
  return {
    post
  };
};

const mapDispatchToProps = (dispatch) => ({
  findPostById: (id) => dispatch(findPostById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);