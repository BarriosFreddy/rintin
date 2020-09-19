import React from "react";
import { Card, Button, Form } from "react-bootstrap";

class LoansForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      loan: {},
    };
  }

  handleSave() {
    this.props.onSave(this.state.loan);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      loan: { ...this.state.loan, [name]: value },
    });
    event.preventDefault();
  }

  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h5">Filter</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Debtor</Form.Label>
              <Form.Control
                name="debtor"
                type="text"
                placeholder="Full name"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                name="amount"
                value={this.state.loan.amount}
                type="number"
                placeholder="0.00"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                name="percentage"
                type="number"
                placeholder="0.00"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Default fee</Form.Label>
              <Form.Control
                name="fee"
                type="number"
                placeholder="0.00"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Comments</Form.Label>
              <Form.Control
                name="comments"
                as="textarea"
                rows="3"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="success" type="button" onClick={this.handleSave}>
              SAVE
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default LoansForm;
