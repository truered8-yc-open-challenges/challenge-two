import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

import { UserContext } from "./../../../contexts/UserContext";

const PromotionModal = (props) => {
  const [code, _setCode] = useState("");

  const [success, _setSuccess] = useState(false);
  const [errorMessage, _setErrorMessage] = useState();
  const [loading, _setLoading] = useState(false);

  const { userData, updateUserData } = useContext(UserContext);

  const onSubmit = () => {
    _setLoading(true);
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
          _setSuccess(true);
        } else _setErrorMessage(response["message"]);
        _setLoading(false);
      });
  };

  return (
    <Modal id="promotion-modal" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Redeem Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!success ? (
          <div>
            <FormControl
              type="text"
              id="event-code"
              className="rounded mx-auto m-sm-2 p-sm-1"
              value={code}
              onChange={(event) => _setCode(event.target.value)}
              placeholder="Enter event code"
            />

            {errorMessage && (
              <div className="error-message p-sm-2">{errorMessage}</div>
            )}
          </div>
        ) : (
          "Successfully redeemed promotion!"
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
        {!success && (
          <Button variant="primary" onClick={onSubmit} disabled={loading}>
            {loading ? (
              <div id="loading-promotion">
                <Spinner animation="border" size="sm" />
              </div>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default PromotionModal;
