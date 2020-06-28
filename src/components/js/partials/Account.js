import React from "react";
import "../../css/partials.css";

const Account = (props) => {
  if (props.loggedIn) {
    return (
      <div id="account" className="w-50 p-sm-2 bg-white shadow">
        {props.email}
        <button id="points" className="p-sm-1 rounded-circle">
          {props.points}
        </button>
      </div>
    );
  }
  return (
    <button id="account" className="w-50 p-sm-2 bg-white shadow border-0">
      Log in
    </button>
  );
};

export default Account;
