import React from "react";
import { connect } from "react-redux";
import { FETCH_LOAN, SAVE_LOAN, UPDATE_LOAN } from "../../store/actions";
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
      loan: null,
    };
  }

  componentDidMount() {
    this.props.fetch();
  }

  handleSave(record) {
    const { action } = this.state;
    switch (action) {
      case Action.CREATE:
        record.id = 2;
        this.props.save(record);
        break;
      case Action.EDIT:
        this.props.save(record);
        break;
      default:
        break;
    }
    this.setState({ action: Action.INITIAL });
  }

  handleShow(record) {
    this.setState({ action: Action.FEE, loan: record });
  }

  handleEdit(record) {
    this.setState({ action: Action.EDIT, loan: record });
  }

  handleAdd() {
    this.setState({ action: Action.CREATE });
  }

  handleBack() {
    this.setState({ action: Action.INITIAL });
  }

  render() {
    const { action, loan } = this.state;
    const { loans } = this.props;
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
            <LoansForm loan={loan} onSave={this.handleSave} />
          )}
          {action === Action.FEE && (
            <Fees loan={loan} onBack={this.handleBack} />
          )}
        </Card.Body>
      </Card>
    );
  }
}

const maptStateToProps = (state) => ({
  loans: state.loans,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch({ type: FETCH_LOAN}),
  save: (loan) => dispatch({ type: SAVE_LOAN, payload: loan}),
  update: (loan) => dispatch({ type: UPDATE_LOAN, payload: loan}),
});

export default connect(maptStateToProps, mapDispatchToProps)(Loans);
