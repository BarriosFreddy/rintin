import React from "react";
import { Button, Form } from "react-bootstrap";
import Loan from "../../models/loans/Loan";

class LoansForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    const loan = props.loan || new Loan();
    this.state = {
      loan,
    };
  }

  handleSave() {
    if (this.validateForm()) {
      this.props.onSave(this.state.loan);
    }
  }

  handleCancel() {
    this.props.onCancel();
  }

  validateForm() {
    const {
      loan: { debtor, amount, percentage, feeDefault },
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
      loan: { ...this.state.loan, [name]: value },
    });
    event.preventDefault();
  }

  render() {
    const {
      loan: { debtor, amount, percentage, feeDefault, comments },
    } = this.state;
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
        <Button type="button" onClick={this.handleCancel}>
          CANCEL
        </Button>
      </Form>
    );
  }
}

export default LoansForm;
