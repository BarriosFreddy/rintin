import React from "react";
import { connect } from "react-redux";

import FeesForm from "./FeesForm";
import FeesTable from "./FeesTable";
import { Card, Button } from "react-bootstrap";
import { updateLoan, findByIdLoan } from "../../../store/actions";
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
    this.state = {
      action: Action.INITIAL,
      fee: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.updating && this.props.updating) {
      const {
        loan: { _id: id },
      } = this.props;
      this.props.findByIdLoan(id);
    } else if (!prevProps.fetching && this.props.fetching) {
      this.setState({ action: Action.INITIAL });
    }
  }

  handleSave(record) {
    const { action } = this.state;
    switch (action) {
      case Action.CREATE:
        const { loan } = this.props;
        const { fees = [], _id: id } = loan;
        const feesArray = [...fees, record];
        const loanToUpdate = {
          ...loan,
          fees: feesArray,
        };
        delete loanToUpdate._id;
        this.props.update(id, loanToUpdate);
        break;
      case Action.EDIT:
        break;
      default:
        break;
    }
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
    const { action, fee } = this.state;
    const {
      loan: { fees = [] },
    } = this.props;
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
                records={fees}
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

const maptStateToProps = (state) => {
  const { loan, updating } = state.loans;
  return {
    loan,
    updating,
  };
};

const mapDispatchToProps = (dispatch) => ({
  update: (id, loan) => dispatch(updateLoan(id, loan)),
  findByIdLoan: (id) => dispatch(findByIdLoan(id)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Fees);
