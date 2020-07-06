import React from "react";

import "../../css/partials.css";

const Account = (props) => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);

  if (userData) {
    return (
      <div id="account" className="w-25 p-sm-2 bg-white shadow">
        Hi {userData["name"]}!
        <button id="points" className="p-sm-1 rounded-circle">
          {userData["points"]}
        </button>
      </div>
    );
  }
  return (
    <a
      href="/login"
      id="account"
      className="w-25 p-sm-2 bg-white shadow border-0"
    >
      Log in
    </a>
  );
};

export default Account;
