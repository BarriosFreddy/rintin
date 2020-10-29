import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Fullscreen from "react-full-screen";
import windowSize from "react-window-size";

import Navigation from "./Navigation";
import NavBar from "./NavBar";
import Breadcrumb from "./Breadcrumb";
import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";

import Blog from "../../../modules/blog";
import Post from "../../../modules/blog/containers/Post";


import "./app.scss";

class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit();
    }
  };

  componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== "horizontal"
    ) {
      this.props.onComponentWillMount();
    }
  }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount();
    }
  }

  handleLogout() {
    this.props.history.push("/auth/signin");
  }

  render() {
    /* full screen exit call */
    document.addEventListener("fullscreenchange", this.fullScreenExitHandler);
    document.addEventListener(
      "webkitfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener(
      "mozfullscreenchange",
      this.fullScreenExitHandler
    );
    document.addEventListener("MSFullscreenChange", this.fullScreenExitHandler);
    const { loggedIn } = this.props;
    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) => {
            return loggedIn ? (
              <route.component {...props} />
            ) : (
              <Redirect to={"/auth/signin"} />
            );
          }}
        ></Route>
      ) : null;
    });

    return loggedIn ? (
      <Aux>
        <Fullscreen enabled={this.props.isFullScreen}>
          <Navigation />
          <NavBar onLogout={this.handleLogout} />
          <div
            className="pcoded-main-container"
            onClick={() => this.mobileOutClickHandler}
          >
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <Breadcrumb />
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          {menu}
                          <Route
                            path="/blog"
                            exact={true}
                            name="Blog"
                            component={Blog}
                          ></Route>
                          <Route
                            path="/"
                            exact={true}
                            name="Blog"
                            component={Blog}
                          ></Route>
                          <Redirect from="/" to="/blog" />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    ) : (
      <Switch>
        <Route path="/blog" exact={true} name="Blog" component={Blog}></Route>
        <Route path="/" exact={true} name="Blog" component={Blog}></Route>
        <Redirect from="/" to="/blog" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout));
