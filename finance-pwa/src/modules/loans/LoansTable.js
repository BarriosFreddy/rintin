import React from "react";
import { Table, Button } from "react-bootstrap";

class LoansTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

  render() {
    return (
      <Table responsive hover size="md">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Created at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {this.props.records.map((record, index) => (
            <tr key={index}>
              <td>{record.code}</td>
              <td>{record.debtor}</td>
              <td>{record.createdAt}</td>
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
            <td>
              <Button variant="success" size="sm" onClick={this.handleAdd}>
                Add
              </Button>
            </td>
            <td/>
            <td/>
            <td/>
          </tr>
        </tbody>
      </Table>
    );
  }
}

export default LoansTable;