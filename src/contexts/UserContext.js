import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default (props) => {
  const [userData, _setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const updateUserData = (newUserData) => {
    _setUserData(newUserData);
    sessionStorage.setItem("userData", JSON.stringify(newUserData));
  };
  const initUserData = () => {
    console.log(userData);
    if (userData) {
      fetch(`https://api.youthcomputing.ca/users/${userData["id"]}`)
        .then((response) => response.json())
        .then((response) => {
          updateUserData(response["userData"]);
        });
    }
  };
  useEffect(initUserData, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};
