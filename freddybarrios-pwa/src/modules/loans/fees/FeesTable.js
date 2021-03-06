import React from "react";
import { Table } from "react-bootstrap";
import moment from "moment";
import constants from "../../../constants";
import utils from "../../../utils";

const { DATE_FORMAT } = constants;

class FeesTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(record) {
    this.props.onEdit(record);
  }

  render() {
    let { records } = this.props;
    const fees = [...records];
    fees.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
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
          {fees.map((fee, index) => (
            <tr
              className="pointer"
              key={index}
              onClick={() => this.handleEdit(fee)}
            >
              <td>{index + 1}</td>
              <td>{`$${utils.formatNumber(fee.amount)}`}</td>
              <td>{moment(Number(fee.createdAt)).format(DATE_FORMAT)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default FeesTable;
