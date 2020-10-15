import React from "react";
import { connect } from "react-redux";

import FeesForm from "./FeesForm";
import FeesTable from "./FeesTable";
import { Card, Button } from "react-bootstrap";
import { updateLoan, findByIdLoan } from "../../../store/actions";
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
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      action: Action.INITIAL,
      fee: null,
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

  handleAdd() {
    this.setState({ action: Action.CREATE });
  }

  handleBack() {
    this.props.onBack();
  }

  calculateLeftAmount({ amount, percentage, fees}) {
      return utils.formatNumber(amount + (amount * (percentage / 100)) - utils.sumFees(fees))
  }

  render() {
    const { action, fee } = this.state;
    const { loan } = this.props;
    const { fees = [] } = loan;
    return (
      <>
        <Card>
          <Card.Header>
            <Card.Title as="h5">Fees</Card.Title>
            <Button variant="info" size="sm" onClick={this.handleBack}>
              Back
            </Button>
            <span>Left amount <b>${this.calculateLeftAmount(loan)}</b></span>
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
              <FeesForm fee={fee} onSave={this.handleSave} />
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
  findByIdLoan: (id) => dispatch(findByIdLoan(id)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Fees);
