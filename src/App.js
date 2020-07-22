import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import Header from "./components/js/partials/Header";
import Footer from "./components/js/partials/Footer";
import Login from "./components/js/Login";
import Logout from "./components/js/Logout";
import Signup from "./components/js/Signup";
import Store from "./components/js/Store";

import * as ROUTES from "./constants/routes";

import SearchContextProvider from "./contexts/SearchContext";
import UserContextProvider from "./contexts/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  return (
    <div className="bg-gradient-1">
      <UserContextProvider>
        <Router>
          <SearchContextProvider>
            <Header />
            <Route exact path={ROUTES.STORE} component={Store} />
          </SearchContextProvider>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.LOGOUT} component={Logout} />
          <Route path={ROUTES.SIGNUP} component={Signup} />

          <Footer />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
