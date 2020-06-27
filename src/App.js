import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/js/partials/Navbar";
import Footer from "./components/js/partials/Footer";
import Login from "./components/js/Login";
import Store from "./components/js/Store";
import "./App.css";

function App(props) {
  return (
    <Router>
      <Navbar />
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
  );
}

export default App;
