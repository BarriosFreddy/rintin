import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import moment from "moment";
import LoansForm from "./LoansForm";
const Action = {
  EDIT: "E",
  CREATE: "C",
  INITIAL: "I",
};

class Loans extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    const records = [
      {
        code: this.randomNumber(),
        debtor: "Debtor 3",
        createdAt: moment().format(),
      },
      {
        code: this.randomNumber(),
        debtor: "Debtor 4",
        createdAt: moment().format(),
      },
    ];
    this.state = {
      records,
      action: Action.INITIAL,
      loan: null,
    };
  }

  randomNumber() {
    return `20200000000${Math.floor(Math.random() * 10)}`;
  }

  handleAdd() {
    this.setState({
      action: Action.CREATE,
    });
    const { records } = this.state;
    records.push({
      code: this.randomNumber(),
      debtor: "Debtor 3",
      createdAt: moment().format(),
    });
    this.setState({ records });
  }

  handleSave(loan) {
    const { records } = this.state;
    const recordsCopy = [...records]
    recordsCopy.push({
      ...loan,
      code: this.randomNumber(),
      createdAt: moment().format(),
    });
    this.setState({ records: recordsCopy, action: Action.INITIAL})
  }

  handleEdit() {}

  render() {
    const { action } = this.state;
    return (
      <>
        {action === Action.INITIAL && (
          <Card>
            <Card.Header>
              <Card.Title as="h5">Filter</Card.Title>
              <Button variant="success" size="md" onClick={this.handleAdd}>
                Add
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive hover size="md">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Created at</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.records.map((record, index) => (
                    <tr key={index}>
                      <td>{record.code}</td>
                      <td>{record.debtor}</td>
                      <td>{record.createdAt}</td>
                      <td>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={this.handleEdit}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
        {[Action.CREATE, Action.EDIT].includes(action) && (
          <LoansForm onSave={this.handleSave} />
        )}
      </>
    );
  }
}

export default Loans;
