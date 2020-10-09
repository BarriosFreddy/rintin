import React from "react";
import { connect } from "react-redux";
import {
  findAllLoan,
  saveLoan,
  updateLoan,
  loanSelected,
  findByIdLoan,
} from "../../store/actions";
import LoansForm from "./LoansForm";
import LoansTable from "./LoansTable";
import { Card } from "react-bootstrap";
import Fees from "./fees";
const Action = {
  EDIT: "E",
  CREATE: "C",
  INITIAL: "I",
  FEE: "F",
};

class Loans extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.state = {
      action: Action.INITIAL,
    };
  }

  componentDidMount() {
    this.props.findAll();
  }

  componentDidUpdate(prevProps) {
    const { saving, updating, fetching } = this.props;
    if (prevProps.saving && !saving) {
      this.setState({ action: Action.INITIAL });
      this.props.findAll();
    } if (prevProps.updating && !updating) {
    } else if (!prevProps.fetching && fetching) {
    }
  }

  handleSave(record) {
    const { action } = this.state;
    switch (action) {
      case Action.CREATE:
        record.createdAt = new Date().getTime();
        this.props.save(record);
        break;
      case Action.EDIT:
        const { _id: id } = record;
        record.updatedAt = new Date().getTime();
        delete record._id;
        this.props.update(id, record);
        record._id = id
        break;
      default:
        break;
    }
  }

  handleShow(record) {
    this.props.loanSelected(record);
    this.setState({ action: Action.FEE });
  }

  handleEdit(record) {
    this.props.loanSelected(record);
    this.setState({ action: Action.EDIT });
  }

  handleAdd() {
    this.props.loanSelected(null);
    this.setState({ action: Action.CREATE });
  }

  handleBack() {
    this.props.loanSelected(null);
    this.props.findAll();
    this.setState({ action: Action.INITIAL });
  }

  render() {
    const { action } = this.state;
    const { loans, loan, saving, updating } = this.props;
    return (
      <Card>
        <Card.Body>
          {action === Action.INITIAL && (
            <LoansTable
              records={loans}
              onShow={this.handleShow}
              onEdit={this.handleEdit}
              onAdd={this.handleAdd}
            />
          )}
          {[Action.CREATE, Action.EDIT].includes(action) && (
            <LoansForm
              loan={loan}
              loading={saving || updating}
              onSave={this.handleSave}
              onCancel={this.handleBack}
            />
          )}
          {action === Action.FEE && (
            <Fees loan={loan} onBack={this.handleBack} />
          )}
        </Card.Body>
      </Card>
    );
  }
}

const maptStateToProps = (state) => {
  const { loan, loans, saving, updating, fetching } = state.loans;
  return {
    loan,
    loans,
    saving,
    updating,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findAll: () => dispatch(findAllLoan()),
  save: (loan) => dispatch(saveLoan(loan)),
  update: (id, loan) => dispatch(updateLoan(id, loan)),
  loanSelected: (loan) => dispatch(loanSelected(loan)),
  findByIdLoan: (id) => dispatch(findByIdLoan(id)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Loans);
