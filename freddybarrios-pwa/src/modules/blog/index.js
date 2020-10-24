import React from "react";
import Layout from "./components/Layout";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import { Route, Switch } from "react-router-dom";


const Blog = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
);

export default Blog;
