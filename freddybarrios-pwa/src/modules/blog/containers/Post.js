import React from "react";
import "../assets/styles/containers/Post.css";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { connect } from "react-redux";
import { findPostById } from "../../../store/actions";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.findPostById(id);
    this.setState({ loading: true });
  }

  componentWillUpdate(prevProps) {
    const { fetching } = this.props;
    if (prevProps.fetching && !fetching) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { title, content } = this.props.post || {};
    const { loading } = this.state;
    return loading ? (
      <h1 className="post__loading">Loading...</h1>
    ) : (
      <section className="post">
        <h1 className="post__title">{title}</h1>
        <ReactMarkdown plugins={[gfm]} children={content}></ReactMarkdown>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  const { post, fetching } = state.posts;
  return {
    post,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findPostById: (id) => dispatch(findPostById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
