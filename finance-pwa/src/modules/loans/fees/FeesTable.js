import React from "react";
import { Table, Button } from "react-bootstrap";
import moment from "moment";
import constants from "../../../constants";
import utils from "../../../utils";

const { DATE_FORMAT } = constants;

class FeesTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleEdit(record) {
    this.props.onEdit(record);
  }

  handleAdd() {
    this.props.onAdd();
  }

  render() {
    return (
      <Table responsive hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{`$${utils.formatNumber(record.amount)}`}</td>
              <td>{moment(record.createdAt).format(DATE_FORMAT)}</td>
              <td>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => this.handleEdit(record)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Button variant="success" size="sm" onClick={this.handleAdd}>
                Add
              </Button>
            </td>
            <td />
            <td />
            <td />
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default FeesTable;
