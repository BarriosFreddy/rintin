import React from "react";
import { Button, Form } from "react-bootstrap";
import Fee from "../../../models/loans/Fee";
import moment from "moment";

class FeesForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    const fee = props.fee || new Fee();
    this.state = {
      fee,
    };
  }

  handleSave() {
    if (this.validateForm()) {
      const feeToSave = {
        ...this.state.fee,
        createdAt: new Date().getTime(),
      };
      this.props.onSave(feeToSave);
    }
  }

  validateForm() {
    const {
      fee: { amount },
    } = this.state;
    let isOk = true;

    if (!amount) isOk = false;

    return isOk;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      fee: { ...this.state.fee, [name]: value },
    });
    event.preventDefault();
  }

  render() {
    const {
      fee: { amount, comments },
    } = this.state;
    return (
      <Form>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            name="amount"
            value={amount}
            type="number"
            placeholder="0.00"
            onChange={this.handleChange}
          />
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
        <Button variant="success" type="button" onClick={this.handleSave}>
          SAVE
        </Button>
      </Form>
    );
  }
}

export default FeesForm;
