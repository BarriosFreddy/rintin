import React from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import contants from "../../constants";

const { DATE_FORMAT } = contants;

class LoansTable extends React.Component {
  constructor(props) {
    super(props);
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

  handleLoadMore() {}

  render() {
    const { records } = this.props;
    return (
      <Table responsive hover size="md">
        <thead>
          <tr>
            <td colSpan="4">
              <Button variant="success" size="sm" onClick={this.handleAdd}>
                Add
              </Button>
            </td>
          </tr>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th># Fees</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.debtor}</td>
              <td>{record.amount}</td>
              <td>{(record.fees ? record.fees.length : 0) + "/22"}</td>
              <td>{moment(record.createdAt).format(DATE_FORMAT)}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => this.handleShow(record)}
                >
                  Show
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => this.handleEdit(record)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <Button size="sm" onClick={this.handleLoadMore}>
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
