import React from "react";
import { connect } from "react-redux";
import {
  findAllPosts,
  savePost,
  updatePost,
  postSelected,
  findByIdLoan,
} from "../../../store/actions";
import PostsForm from "./PostsForm";
import PostsTable from "./PostsTable";
import { Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
const Action = {
  EDIT: "E",
  SHOW: "S",
  CREATE: "C",
  INITIAL: "I",
};

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBackEdit = this.handleBackEdit.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.findAll = this.findAll.bind(this);

    this.state = {
      action: Action.INITIAL,
      showUpdatedMessage: false,
    };
  }

  componentDidMount() {
    this.findAll();
  }

  componentDidUpdate(prevProps) {
    const { saving, updating } = this.props;
    if (prevProps.saving && !saving) {
      this.setState({ action: Action.INITIAL });
      this.findAll();
    }
    if (prevProps.updating && !updating) {
      this.setState({ showUpdatedMessage: true });
    }
  }

  findAll() {
    this.props.findAll({ active: true });
  }

  handleSave(record) {
    const { action } = this.state;
    console.log({ action });
    switch (action) {
      case Action.CREATE:
        record.createdAt = new Date().getTime();
        this.props.save(record);
        break;
      case Action.EDIT:
        const { _id: id } = record;
        record.updatedAt = new Date().getTime();
        delete record._id;
        this.props.update(id, record);
        record._id = id;
        break;
      default:
        break;
    }
  }

  handleShow(record) {
    this.props.postSelected(record);
    this.setState({ action: Action.SHOW });
  }

  handleEdit() {
    this.setState({ action: Action.EDIT });
  }

  handleAdd() {
    this.props.postSelected(null);
    this.setState({ action: Action.CREATE });
  }
  
  handleBackEdit() {
    this.setState({ action: Action.INITIAL });
  }

  handleLoadMore(pageRequest) {
    this.props.findAll({
      ...pageRequest,
      active: true,
    });
  }

  render() {
    const { action, showUpdatedMessage } = this.state;
    const { posts, post, saving, updating, fetching } = this.props;
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h5">Posts</Card.Title>
          {action === Action.INITIAL && (
            <Button variant="success" size="sm" onClick={this.handleAdd}>
              Add
            </Button>
          )}
          {action === Action.SHOW && (
            <Button variant="info" size="sm" onClick={this.handleEdit}>
              Edit
            </Button>
          )}
           {action !== Action.INITIAL && <Button
              className="pull-right"
              variant="info"
              size="sm"
              onClick={this.handleBackEdit}
            >
              Back
            </Button>}
        </Card.Header>
        <Card.Body>
          {action === Action.INITIAL && (
            <PostsTable
              records={posts}
              loading={fetching}
              onShow={this.handleShow}
              onEdit={this.handleEdit}
              onLoadMore={this.handleLoadMore}
            />
          )}
          {action === Action.SHOW &&
              <ReactMarkdown plugins={[gfm]} children={post.content}></ReactMarkdown>
          }
          {[Action.CREATE, Action.EDIT].includes(action) && (
            <PostsForm
              post={post}
              loading={saving || updating}
              onSave={this.handleSave}
              onCancel={this.handleBackEdit}
              showUpdatedMessage={showUpdatedMessage}
            />
          )}
        </Card.Body>
      </Card>
    );
  }
}

const maptStateToProps = (state) => {
  const { post, posts, saving, updating, fetching } = state.posts;
  return {
    post,
    posts,
    saving,
    updating,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findAll: (pageSize) => dispatch(findAllPosts(pageSize)),
  save: (post) => dispatch(savePost(post)),
  update: (id, post) => dispatch(updatePost(id, post)),
  postSelected: (post) => dispatch(postSelected(post)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Posts);
