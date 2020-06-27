import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/js/partials/Header";
import Footer from "./components/js/partials/Footer";
import Login from "./components/js/Login";
import Store from "./components/js/Store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  return (
    <div className="bg-gradient-1">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Store />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
