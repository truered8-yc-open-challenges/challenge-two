import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";

import Header from "./components/js/partials/Header";
import Footer from "./components/js/partials/Footer";
import Login from "./components/js/user/Login";
import Logout from "./components/js/user/Logout";
import Signup from "./components/js/user/Signup";
import Store from "./components/js/Store";

import SearchContextProvider from "./contexts/SearchContext";
import UserContextProvider from "./contexts/UserContext";

import * as ROUTES from "./constants/routes";

import Waves from "./waves.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div id="wrapper" className="bg-gradient-1 d-flex flex-column">
      <UserContextProvider>
        <Router>
          <div className="flex-fill">
            <SearchContextProvider>
              <Header />
              <Route exact path={ROUTES.STORE} component={Store} />
            </SearchContextProvider>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.LOGOUT} component={Logout} />
            <Route path={ROUTES.SIGNUP} component={Signup} />
          </div>
          <img id="background-image" src={Waves} alt="background" />
          <Footer />
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
