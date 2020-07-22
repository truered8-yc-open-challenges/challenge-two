import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { UserContext } from "../../../contexts/UserContext";

const PromotionModal = (props) => {
  const [code, _setCode] = useState("");
  const [errorMessage, _setErrorMessage] = useState();

  const { userData, updateUserData } = useContext(UserContext);

  const onSubmit = () => {
    fetch("https://api.youthcomputing.ca/shop/redeem/event", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: userData["id"],
        eventCode: code,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response["error"]) {
          fetch(`https://api.youthcomputing.ca/users/${userData["id"]}`)
            .then((response) => response.json())
            .then((response) => {
              updateUserData(response["userData"]);
            });
          _setErrorMessage();
          props.handleClose();
        } else _setErrorMessage(response["message"]);
      });
  };

  return (
    <Modal
      id="promotion-modal"
      show={props.show}
      backdropClassName="position-fixed m-auto"
      autoFocus
    >
      <Modal.Header closeButton>
        <Modal.Title>Redeem Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          id="event-code"
          className="rounded m-auto m-sm-2 p-sm-1"
          value={code}
          onChange={(event) => _setCode(event.target.value)}
          placeholder="Enter event code"
        ></input>

        {errorMessage && (
          <div className="error-message p-sm-2">Error: {errorMessage}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.handleClose}
          className="float-left"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PromotionModal;
