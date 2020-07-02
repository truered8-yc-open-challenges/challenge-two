import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/js/partials/Header";
import Footer from "./components/js/partials/Footer";
import Signup from "./components/js/Signup";
import Store from "./components/js/Store";

import * as ROUTES from "./constants/routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  return (
    <div className="bg-gradient-1">
      <Router>
        <Header />

        <Route exact path={ROUTES.STORE} component={Store} />
        <Route path={ROUTES.SIGNUP} component={Signup} />

        <Footer />
      </Router>
    </div>
  );
}

export default App;
