import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import "../../node_modules/font-awesome/scss/font-awesome.scss";

import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../route";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loggedIn } = this.props;
    const menu = routes.map((route, index) => {
      console.log({ loggedIn });

      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
                  render={props => (
                      <route.component {...props} />
                  )} />
          ) : (null);
        });

    return (
      <Aux>
        <ScrollToTop>
          <Suspense fallback={<Loader />}>
            <Switch>
              {menu}
              <Route path="/" component={AdminLayout} />
            </Switch>
          </Suspense>
        </ScrollToTop>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return {
    loggedIn,
  };
};
export default connect(mapStateToProps, null)(App);
