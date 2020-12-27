import React from "react";
import { connect } from "react-redux";
import {
  findAllLoan,
  saveLoan,
  updateLoan,
  loanSelected,
  findByIdLoan,
} from "../../../store/actions";
import PostsForm from "./PostsForm";
import PostsTable from "./PostsTable";
import { Button, Card } from "react-bootstrap";
const Action = {
  EDIT: "E",
  CREATE: "C",
  INITIAL: "I",
  FEE: "F",
};

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBackEdit = this.handleBackEdit.bind(this);
    this.handleBackFee = this.handleBackFee.bind(this);
    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.findAll = this.findAll.bind(this);

    this.state = {
      action: Action.INITIAL,
      showUpdatedMessage: false,
    };
  }

  componentDidMount() {
    this.findAll();
  }

  componentDidUpdate(prevProps) {
    const { saving, updating } = this.props;
    if (prevProps.saving && !saving) {
      this.setState({ action: Action.INITIAL });
      this.findAll();
    }
    if (prevProps.updating && !updating) {
      this.setState({ showUpdatedMessage: true });
    }
  }

  findAll() {
    this.props.findAll({ active: true });
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
        record._id = id;
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

  handleBackFee() {
    this.props.loanSelected(null);
    this.findAll();
    this.setState({ action: Action.INITIAL });
  }
  
  handleBackEdit() {
    this.setState({ action: Action.FEE });
  }

  handleLoadMore(pageRequest) {
    this.props.findAll({
      ...pageRequest,
      active: true,
    });
  }

  render() {
    const { action, showUpdatedMessage } = this.state;
    const { posts, post, saving, updating, fetching } = this.props;
    return (
      <Card>
        <Card.Header>
          <Card.Title as="h5">Loans</Card.Title>
          {action === Action.INITIAL && (
            <Button variant="success" size="sm" onClick={this.handleAdd}>
              Add
            </Button>
          )}
          {action === Action.FEE && (
            <>
              <h6>{post.debtor}  </h6>
              <Button
                variant="primary"
                size="sm"
                onClick={() => this.handleEdit(post)}
              >
                Edit
              </Button>
            </>
          )}
           <Button
              className="pull-right"
              variant="info"
              size="sm"
              onClick={this.handleBackFee}
            >
              Back
            </Button>
        </Card.Header>
        <Card.Body>
          {action === Action.INITIAL && (
            <PostsTable
              records={posts}
              loading={fetching}
              onShow={this.handleShow}
              onEdit={this.handleEdit}
              onLoadMore={this.handleLoadMore}
            />
          )}
          {[Action.CREATE, Action.EDIT].includes(action) && (
            <PostsForm
              post={post}
              loading={saving || updating}
              onSave={this.handleSave}
              onCancel={this.handleBackEdit}
              showUpdatedMessage={showUpdatedMessage}
            />
          )}
        </Card.Body>
      </Card>
    );
  }
}

const maptStateToProps = (state) => {
  const { post, posts, saving, updating, fetching } = state.posts;
  return {
    post,
    posts,
    saving,
    updating,
    fetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  findAll: (pageSize) => dispatch(findAllLoan(pageSize)),
  save: (loan) => dispatch(saveLoan(loan)),
  update: (id, loan) => dispatch(updateLoan(id, loan)),
  loanSelected: (loan) => dispatch(loanSelected(loan)),
  findByIdLoan: (id) => dispatch(findByIdLoan(id)),
});

export default connect(maptStateToProps, mapDispatchToProps)(Posts);
