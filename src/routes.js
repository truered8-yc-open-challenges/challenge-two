import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Login from "./components/js/Login";
import Store from "./components/js/Store";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Store} />
    <Route path="/login" component={Login} />
  </Route>
);
