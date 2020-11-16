import React from "react";
import "../assets/styles/containers/Post.css";
import snarkdown from "snarkdown";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { connect } from "react-redux";
import { findPostById } from "../../../store/actions";

const content = `# An awesome headline about some topic

## Description

--- 

* Item

* [x] check

A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x]  done

A table:

| a | b |
| - | - |

\\\
// Some code

var x = 1;
\\\
`;
class Post extends React.Component {

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.findPostById(id);
  }
  render() {
    const { post: { title, content } ={} } = this.props;

    return content ?
      <section className="post">
        <h2>{title}</h2>
        {snarkdown(content)}
        {console.log(snarkdown(content))}
      </section>
     : <h1>Loading...</h1>;
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