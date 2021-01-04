import React from "react";
import { connect } from "react-redux";

import FeesForm from "./FeesForm";
import FeesTable from "./FeesTable";
import { Card, Button } from "react-bootstrap";
import { updateLoan, findByIdLoan, closeLoan } from "../../../store/actions";
import utils from "../../../utils";
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
    this.handleCancel = this.handleCancel.bind(this);
    this.handleCloseLoan = this.handleCloseLoan.bind(this);
    this.state = {
      action: Action.INITIAL,
      fee: null,
      showUpdatedMessage: false
    };
  }

  componentDidUpdate(prevProps) {
    const { fetching, updating } = this.props;
    if (prevProps.updating && !updating) {
      const {
        loan: { _id: id },
      } = this.props;
      this.props.findByIdLoan(id);
    } else if (prevProps.fetching && !fetching) {
      this.setState({ action: Action.INITIAL });
    }
  }

  handleSave(record) {
    const { action } = this.state;
    const { loan } = this.props;
    const { fees = [], _id: id } = loan;
    let loanToUpdate = {};
    switch (action) {
      case Action.CREATE:
        record.code = utils.generateCode();
        loanToUpdate = {
          ...loan,
          fees: [...fees, record],
        };
        delete loanToUpdate._id;
        this.props.update(id, loanToUpdate);
        break;
      case Action.EDIT:
        const feeIndex = fees.findIndex((fee) => fee.code === record.code);
        fees.splice(feeIndex, 1, record);
        loanToUpdate = {
          ...loan,
          fees,
        };
        delete loanToUpdate._id;
        this.props.update(id, loanToUpdate);
        break;
      default:
        break;
    }
  }

  handleEdit(record) {
    this.setState({ action: Action.EDIT, fee: record });
  }

  handleCancel() {
    this.setState({ action: Action.INITIAL });    
  }

  handleAdd() {
    this.setState({ action: Action.CREATE });
  }

  handleCloseLoan() {
    const {
      loan: { _id: id },
    } = this.props;
    this.props.closeLoan(id);
  }

  calculateLeftAmount({ amount, percentage, fees }) {
    const totalAmount = Number(amount) + (Number(amount) * (Number(percentage) / 100))
    const collectedAmount = fees ? utils.sumFees(fees) : 0;
    return totalAmount - collectedAmount;
  }

  render() {
    const { action, fee, showUpdatedMessage } = this.state;
    const { loan } = this.props;
    const { fees = [], active = true } = loan;

    const leftAmount = this.calculateLeftAmount(loan)
    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Fees</Card.Title>
            <Button variant="success" size="sm" onClick={this.handleAdd}>
                Add
              </Button>
            <span>
              Left amount: <b>${utils.formatNumber(leftAmount)} </b>
            </span>
            {leftAmount <= 0 && <Button
                variant="light"
                size="sm"
                onClick={this.handleCloseLoan}
                disabled={!active}
              >
                Close Loan
              </Button>
            }
          </Card.Header>
          <Card.Body>
            {action === Action.INITIAL && (
              <FeesTable
                records={fees}
                onEdit={this.handleEdit}
                onAdd={this.handleAdd}
              />
            )}
            {[Action.CREATE, Action.EDIT].includes(action) && (
              <FeesForm fee={fee} feeDefault={loan.feeDefault} onSave={this.handleSave} onCancel={this.handleCancel} showUpdatedMessage={showUpdatedMessage} />
            )}
          </Card.Body>
        </Card>
      </>
    );
  }
}

const maptStateToProps = (state) => {
  const { loan, updating, fetching } = state.loans;
  return {
    loan,
    updating,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  update: (id, loan) => dispatch(updateLoan(id, loan)),
  closeLoan: (id) => dispatch(closeLoan(id)),
  findByIdLoan: (id) => dispatch(findByIdLoan(id)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Fees);
