import React from "react";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import Post from "./containers/Post";
import NotFound from "./containers/NotFound";
import { Route, Switch } from "react-router-dom";


const Blog = ({match}) => {
  return (
  <Layout>
    <Switch>
      <Route exact path={`${match.path}/`} component={Home} />
      <Route path={`${match.path}/post/:id`} component={Post} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)
}

export default Blog;
