import React, { useEffect, useContext, useState } from "react";

import { FirebaseContext } from "../../contexts/FirebaseContext";
import { UserContext } from "./../../contexts/UserContext";

const Logout = () => {
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

  return <div id="logout">{message}</div>;
};

export default Logout;
