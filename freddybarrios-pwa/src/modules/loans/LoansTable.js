import React from "react";
import "./assets/styles/loans.css"
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import contants from "../../constants";
import utils from "../../utils";

const { DATE_FORMAT } = contants;

class LoansTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 10,
    };
    this.handleEdit = this.handleEdit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleEdit(record) {
    this.props.onEdit(record);
  }

  handleShow(record) {
    this.props.onShow(record);
  }

  handleAdd() {
    this.props.onAdd();
  }

  handleLoadMore() {
    const { size: prevSize } = this.state;
    let size = prevSize + 10;
    this.props.onLoadMore({
      size,
    });
    this.setState({ size });
  }

  calculateLeftAmount({ amount, fees, percentage }) {
    const totalAmount =
      Number(amount) + Number(amount) * (Number(percentage) / 100);
    const collectedAmount = fees ? utils.sumFees(fees) : 0;
    return utils.formatNumber(totalAmount - collectedAmount);
  }

  render() {
    const { records, loading } = this.props;
    return (
      <Table responsive hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Left Amount</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr
              className="pointer"
              key={index}
              onClick={() => this.handleShow(record)}
            >
              <td>{record.debtor}</td>
              <td>{"$" + this.calculateLeftAmount(record)}</td>
              <td>{moment(record.createdAt).format(DATE_FORMAT)}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="100">
              <Button
                size="sm"
                disabled={loading}
                onClick={this.handleLoadMore}
              >
                Load more
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default LoansTable;
