import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default (props) => {
  const [remember, _setRemember] = useState(
    JSON.parse(localStorage.getItem("remember"))
      ? JSON.parse(localStorage.getItem("remember"))
      : false
  );
  const updateRemember = (newRemember) => {
    _setRemember(newRemember);
    localStorage.setItem("remember", JSON.stringify(newRemember));
    switch (remember) {
      case true:
        sessionStorage.removeItem("userData");
        break;
      default:
        localStorage.removeItem("userData");
        break;
    }
  };

  const [userData, _setUserData] = useState(
    JSON.parse((remember ? localStorage : sessionStorage).getItem("userData"))
  );
  const updateUserData = (newUserData) => {
    _setUserData(newUserData);
    (remember ? localStorage : sessionStorage).setItem(
      "userData",
      JSON.stringify(newUserData)
    );
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
    <UserContext.Provider
      value={{ remember, updateRemember, userData, updateUserData }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
