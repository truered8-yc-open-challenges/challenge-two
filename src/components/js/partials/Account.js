import React from "react";
import "../../css/partials.css";

const Account = (props) => {
  if (props.loggedIn) {
    return (
      <div id="account" className="w-50 p-sm-2 bg-white shadow">
        Logged in as {props.email}
        <span id="points" className="p-sm-1">
          {props.points}
        </span>
      </div>
    );
  }
  return (
    <div id="account" className="w-50 p-sm-2 bg-white shadow">
      <a href="/login">Log in</a>
    </div>
  );
};

export default Account;
