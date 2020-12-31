import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Post from "../../../models/posts/Post";

class PostsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    const post = props.post || new Post();
    this.state = {
      post,
    };
  }

  handleSave() {
    if (this.validateForm()) {
      console.log(this.state.post);
      this.props.onSave(this.state.post);
    } else {
      console.log("invalid form");
    }
  }

  handleCancel() {
    this.props.onCancel();
  }

  validateForm() {
    const {
      post: { title, content  },
    } = this.state;
    let isOk = true;

    if (!title) isOk = false;
    if (isOk && !content) isOk = false;
    return isOk;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      post: { ...this.state.post, [name]: value },
    });
    event.preventDefault();
  }

  render() {
    const {
      post: { title, content },
    } = this.state;
    const { loading, showUpdatedMessage } = this.props;
    return (
      <Form>
        <Form.Group controlId="title">
          <Form.Control
            required
            name="title"
            value={title}
            type="text"
            placeholder="Title"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Control
            name="content"
            value={content}
            as="textarea"
            rows="30"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Alert variant="success" show={showUpdatedMessage}>
          Record Updated
        </Alert>
        <Button
          variant="success"
          type="button"
          size="sm"
          disabled={loading}
          onClick={this.handleSave}
        >
          SAVE
        </Button>
        <Button type="button" size="sm" onClick={this.handleCancel}>
          CANCEL
        </Button>
      </Form>
    );
  }
}

export default PostsForm;
