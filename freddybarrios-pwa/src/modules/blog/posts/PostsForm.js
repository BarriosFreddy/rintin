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
      this.props.onSave(this.state.post);
    }
  }

  handleCancel() {
    this.props.onCancel();
  }

  validateForm() {
    const {
      post: { debtor, amount, percentage, feeDefault },
    } = this.state;
    let isOk = true;

    if (!debtor) isOk = false;
    if (isOk && !amount) isOk = false;
    if (isOk && (percentage === null || percentage === undefined)) isOk = false;
    if (isOk && (feeDefault === null || feeDefault === undefined)) isOk = false;

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
      post: { debtor, amount, percentage, feeDefault, collect, comments },
    } = this.state;
    const { loading, showUpdatedMessage } = this.props;
    return (
      <Form>
        <Form.Group controlId="debtor">
          <Form.Label>Debtor</Form.Label>
          <Form.Control
            required
            name="debtor"
            value={debtor}
            type="text"
            placeholder="Full name"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required
            name="amount"
            value={amount}
            type="number"
            placeholder="0.00"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="percentage">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            required
            name="percentage"
            value={percentage}
            type="number"
            placeholder="0.00"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="fee">
          <Form.Label>Default fee</Form.Label>
          <Form.Control
            required
            name="feeDefault"
            value={feeDefault}
            type="number"
            placeholder="0.00"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="collect">
          <Form.Label>Collect</Form.Label>
          <Form.Control
            as="select"
            name="collect"
            value={collect}
            onChange={this.handleChange}
          >
            <option>Daily</option>
            <option>Biweekly</option>
            <option>Monthly</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="comments">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            name="comments"
            value={comments}
            as="textarea"
            rows="3"
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
