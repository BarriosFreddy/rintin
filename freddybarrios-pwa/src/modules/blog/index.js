import React from "react";
import Loadable from 'react-loadable';
import '../../assets/scss/style.scss';
import Layout from "./components/Layout";
import NotFound from "./containers/NotFound";
import { Route, Switch } from "react-router-dom";
import loader from "../../App/layout/Loader";

const HomeLayout = Loadable({
  loader: () => import('./containers/Home'),
  loading: loader
});
const PostLayout = Loadable({
  loader: () => import('./containers/Post'),
  loading: loader
});

const Blog = ({match}) => {
  return (
  <Layout>
    <Switch>
      <Route exact path={`${match.path}/`} component={HomeLayout} />
      <Route path={`${match.path}/post/:id`} component={PostLayout} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)
}

export default Blog;
