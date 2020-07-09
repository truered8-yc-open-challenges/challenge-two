import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default (props) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
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
