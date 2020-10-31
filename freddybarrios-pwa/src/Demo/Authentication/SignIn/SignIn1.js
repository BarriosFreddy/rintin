import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../../assets/scss/style.scss";
import Aux from "../../../hoc/_Aux";
import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import { authenticate } from "../../../store/actions";

class SignUp1 extends React.Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }
  componentDidUpdate(prevProps) {
    const { authenticating, loggedIn } = this.props;
    if (prevProps.authenticating && !authenticating && loggedIn) {
      this.props.history.push("/app/dashboard");
    } else if (!authenticating && !loggedIn) {
    }
  }

  login() {
    const { username, password } = this.state;
    if (this.validateForm()) {
      this.setState({ loading: true });
      this.props.authenticate({
        username,
        password,
      });
    }
  }

  validateForm() {
    const { username, password } = this.state;
    let isOk = true;

    if (!username) isOk = false;
    if (isOk && !password) isOk = false;

    return isOk;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    event.preventDefault();
  }

  render() {
    const { username, password } = this.state;
    const { authenticating } = this.props;
    return (
      <Aux>
        <Breadcrumb />
        <div className="auth-wrapper">
          <div className="auth-content">
            <div className="auth-bg">
              <span className="r" />
              <span className="r s" />
              <span className="r s" />
              <span className="r" />
            </div>
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="feather icon-unlock auth-icon" />
                </div>
                <h3 className="mb-4">Login</h3>
                <div className="input-group mb-3">
                  <input
                    type="email"
                    value={username}
                    name="username"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.handleChange}
                    disabled={authenticating}
                  />
                </div>
                <div className="input-group mb-4">
                  <input
                    type="password"
                    value={password}
                    name="password"
                    className="form-control"
                    placeholder="password"
                    onChange={this.handleChange}
                    disabled={authenticating}
                  />
                </div>
                <div className="form-group text-left">
                  <div className="checkbox checkbox-fill d-inline">
                    <input
                      type="checkbox"
                      name="checkbox-fill-1"
                      id="checkbox-fill-a1"
                    />
                    <label htmlFor="checkbox-fill-a1" className="cr">
                      {" "}
                      Save credentials
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary shadow-2 mb-4"
                  type="button"
                  onClick={this.login}
                  disabled={authenticating}
                >
                  Login
                </button>
                <p className="mb-2 text-muted">
                  Forgot password?{" "}
                  <NavLink to="/auth/reset-password-1">Reset</NavLink>
                </p>
                <p className="mb-0 text-muted">
                  Don’t have an account?{" "}
                  <NavLink to="/auth/signup-1">Signup</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  const { authenticating, loggedIn } = state.auth;
  return {
    authenticating,
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  authenticate: (credentials) => dispatch(authenticate(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp1);
