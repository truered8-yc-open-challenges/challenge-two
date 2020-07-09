import React, { createContext, useState } from "react";

export const UserContext = createContext();

export default (props) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData"))
  );
  const updateUserData = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
  };
  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {props.children}
    </UserContext.Provider>
  );
};
