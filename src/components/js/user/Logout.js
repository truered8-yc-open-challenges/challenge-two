import React, { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

import { FirebaseContext } from "./../../../contexts/FirebaseContext";
import { UserContext } from "./../../../contexts/UserContext";

import * as ROUTES from "./../../../constants/routes";

import "./../../css/User.css";

const Logout = (props) => {
  const { auth } = useContext(FirebaseContext);
  const { updateUserData } = useContext(UserContext);

  const [message, _setMessage] = useState();

  const logUserOut = () => {
    auth.signOut().then(() => {
      updateUserData(null);
      _setMessage("Successfully logged out!");
    });
  };

  useEffect(logUserOut, []);

  return (
    <div id="logout" className="position-relative bg-white text-center">
      <div id="logout-heading" className="p-sm-3 pt-sm-5">
        {message}
      </div>
      <Button
        className="bg-white text-body border-dark shadow mb-md-5 mt-sm-4 py-sm-1 px-sm-5 rounded-pill"
        onClick={() => props.history.push(ROUTES.STORE)}
      >
        Return to Store
      </Button>
    </div>
  );
};

export default withRouter(Logout);
