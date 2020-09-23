import React from "react";
import { connect } from "react-redux";
import { getLoan, saveLoan } from "../../store/actions";
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

  componentDidUpdate(prevProps, prevState) {
    const { loans } = this.props;
    console.log({ prevProps });
    console.log({ loans });
  }

  handleSave(record) {
    const { action } = this.state;
    switch (action) {
      case Action.CREATE:
        record.createdAt = new Date().getTime()
        console.log({record});
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
    console.log(loans);
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
  fetch: () => dispatch(getLoan()),
  save: (loan) => dispatch(saveLoan(loan)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Loans);
