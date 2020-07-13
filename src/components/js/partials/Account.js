import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import EventModal from "./../store/EventModal";
import { UserContext } from "./../../../contexts/UserContext";

import "../../css/partials.css";

const Account = (props) => {
  const [showEvent, _setShowEvent] = useState(false);
  const handleClose = () => _setShowEvent(false);
  const handleShow = () => _setShowEvent(true);

  const { userData } = useContext(UserContext);

  if (userData) {
    return (
      <div id="account" className="w-25 p-sm-2 bg-white shadow">
        <EventModal
          show={showEvent}
          handleClose={handleClose}
          handleShow={handleShow}
        />
        <Button
          variant="primary"
          onClick={handleShow}
          className="w-100 border-0 shadow-none m-0 p-0 bg-white text-black-50"
        >
          Redeem Event
        </Button>
        <Button id="points" className="p-sm-1 rounded-circle">
          {userData["points"]}
        </Button>
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
