import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './layout/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import routes from "../route";
import Blog from '../modules/blog';
import Post from '../modules/blog/containers/Post';
import NotFound from '../modules/blog/containers/NotFound';

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        const menu = routes.map((route, index) => {
          return (route.component) ? (
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

        const {match} = this.props
        console.log({match});

        return (
            <Aux>
                <ScrollToTop>
                    <Suspense fallback={<Loader/>}>
                        <Switch>
                            {menu}
                            <Route exact path="/app"  component={AdminLayout} />
                            <Route path="/blog" component={Blog}/>
                            <Redirect from="/" to="blog"/>
                            <Route component={NotFound} />
                        </Switch>
                    </Suspense>
                </ScrollToTop>
            </Aux>
        );
    }
}

export default App;
