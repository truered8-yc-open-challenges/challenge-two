import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PromotionModal from "./../store/PromotionModal";
import { withRouter } from "react-router-dom";

import { UserContext } from "./../../../contexts/UserContext";
import * as ROUTES from "./../../../constants/routes";

import "../../css/Partials.css";

const Account = (props) => {
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
            <Popover id="profile-popover" className="w-100">
              <Popover.Title as="h3">Hi {userData["name"]}!</Popover.Title>
              <Popover.Content>
                <strong>Holy guacamole!</strong> You have{" "}
                <strong>{userData["points"]}</strong> points.
                <br />
                <Button
                  variant="link"
                  onClick={() => props.history.push(ROUTES.LOGOUT)}
                  className="m-0 p-0"
                >
                  Logout
                </Button>
              </Popover.Content>
            </Popover>
          }
          placement="bottom"
        >
          <Button
            id="points"
            onClick={() => setShowPopover(!showPopover)}
            className="p-sm-1 mb-sm-1 rounded-circle"
          >
            {userData["points"]}
          </Button>
        </OverlayTrigger>
      </div>
    );
  }
  return (
    <Button
      variant="link"
      onClick={() => props.history.push(ROUTES.LOGIN)}
      className="text-secondary w-25 p-sm-2 bg-white shadow border-0"
    >
      Log in
    </Button>
  );
};

export default withRouter(Account);
