import React, { useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Route, withRouter } from "react-router-dom";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import Login from "./Login";
import Signup from "./Signup";
import Store from "./Store";

import * as ROUTES from "../../constants/routes";
import Logo from "../../logo.svg";

const Main = (props) => {
  const [loadedPromotion, _setLoadedPromotion] = useState(false);
  const [loadedPrizes, _setLoadedPrizes] = useState(false);
  return (
    <LoadingOverlay
      active={
        !(loadedPromotion && loadedPrizes) && props.location.pathname === "/"
      }
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
  );
};

export default withRouter(Main);
