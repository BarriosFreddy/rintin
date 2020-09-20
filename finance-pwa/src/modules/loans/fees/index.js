import React from "react";

import moment from "moment";
import FeesForm from "./FeesForm";
import FeesTable from "./FeesTable";
import { Card, Button } from "react-bootstrap";
const Action = {
  EDIT: "E",
  CREATE: "C",
  INITIAL: "I",
};

class Fees extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    const records = [
      {
        code: this.randomNumber(),
        debtor: "Debtor 3",
        amount: 250000,
        createdAt: moment().format(),
      },
    ];
    this.state = {
      records,
      action: Action.INITIAL,
      loan: null,
      fee: null,
    };
  }

  randomNumber() {
    return `20200000000${Math.floor(Math.random() * 10)}`;
  }

  handleSave(record) {
    const { action, records } = this.state;
    switch (action) {
      case Action.CREATE:
        const recordsCopy = [...records];
        recordsCopy.push({
          ...record,
          code: this.randomNumber(),
          createdAt: moment().format(),
        });
        this.setState({ records: recordsCopy, action: Action.INITIAL });
        break;
      case Action.EDIT:
        const index = recordsCopy.findIndex((item) => item.id === record.id);
        recordsCopy.splice(index, 1, record);
        this.setState({ records: recordsCopy });
        break;
      default:
        break;
    }
    this.setState({ action: Action.INITIAL });
  }

  handleEdit(record) {
    this.setState({ action: Action.EDIT, fee: record });
  }

  handleAdd() {
    this.setState({ action: Action.CREATE });
  }

  handleBack() {
    this.props.onBack();
  }

  render() {
    const { action, records, fee } = this.state;
    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Fees</Card.Title>
            <Button variant="info" size="sm" onClick={this.handleBack}>
              Back
            </Button>
          </Card.Header>
          <Card.Body>
            {action === Action.INITIAL && (
              <FeesTable
                records={records}
                onShow={this.handleShow}
                onEdit={this.handleEdit}
                onAdd={this.handleAdd}
              />
            )}
            {[Action.CREATE, Action.EDIT].includes(action) && (
              <FeesForm fee={fee} onSave={this.handleSave} />
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Fees;
