import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PromotionModal from "./../store/PromotionModal";

import { UserContext } from "./../../../contexts/UserContext";
import * as ROUTES from "./../../../constants/routes";

import "../../css/partials.css";

const Account = () => {
  const [showEvent, _setShowEvent] = useState(false);
  const handleClose = () => _setShowEvent(false);
  const handleShow = () => _setShowEvent(true);

  const [showPopover, setShowPopover] = useState(false);

  const { userData } = useContext(UserContext);

  if (userData) {
    return (
      <div id="account" className="w-25 p-sm-2 bg-white shadow">
        <PromotionModal show={showEvent} handleClose={handleClose} />
        <Button
          variant="primary"
          onClick={handleShow}
          className="w-100 border-0 shadow-none m-0 p-0 bg-white text-body"
        >
          Redeem Event
        </Button>
        <OverlayTrigger
          trigger="focus"
          key="bottom"
          overlay={
            <Popover id={`popover-positioned-bottom`} className="w-100">
              <Popover.Title as="h3">Hi {userData["name"]}!</Popover.Title>
              <Popover.Content>
                <strong>Holy guacamole!</strong> You have{" "}
                <strong>{userData["points"]}</strong> points.
                <br />
                <a href={ROUTES.LOGOUT}>Logout</a>
              </Popover.Content>
            </Popover>
          }
          placement="bottom"
        >
          <Button
            id="points"
            onClick={() => setShowPopover(!showPopover)}
            className="p-sm-1 rounded-circle"
          >
            {userData["points"]}
          </Button>
        </OverlayTrigger>
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
