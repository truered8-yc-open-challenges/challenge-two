import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/js/partials/Header";
import Footer from "./components/js/partials/Footer";
import Login from "./components/js/Login";
import Signup from "./components/js/Signup";
import Store from "./components/js/Store";

import * as ROUTES from "./constants/routes";
import UserContextProvider from "./contexts/UserContext";

import Logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(props) {
  const [loadedPromotion, _setLoadedPromotion] = useState(false);
  const [loadedPrizes, _setLoadedPrizes] = useState(false);

  return (
    <div className="bg-gradient-1">
      <UserContextProvider>
        <Router>
          <LoadingOverlay
            active={!(loadedPromotion && loadedPrizes)}
            spinner /* ={<img src={Logo} alt="YouthComputing logo" />} */
            text="Loading store..."
          >
            <Header />

            <Route
              exact
              path={ROUTES.STORE}
              render={() => (
                <Store
                  setLoadedPromotion={_setLoadedPromotion}
                  setLoadedPrizes={_setLoadedPrizes}
                />
              )}
            />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGNUP} component={Signup} />

            <Footer />
          </LoadingOverlay>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
