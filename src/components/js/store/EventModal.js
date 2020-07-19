import React, { useState, useContext, useEffect } from "react";
import Modal from "react-modal";
import { UserContext } from "../../../contexts/UserContext";

const PromotionModal = (props) => {
  const [code, _setCode] = useState("");
  const [errorMessage, _setErrorMessage] = useState();

  const { userData, updateUserData } = useContext(UserContext);

  useEffect(() => Modal.setAppElement("#account"), []);

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
      className="w-50 m-auto bg-white"
      isOpen={props.show}
      onRequestClose={props.handleClose}
      contentLabel="Redeem Event"
    >
      <h2 className="m-sm-2">Redeem Event</h2>
      <input
        type="text"
        id="event-code"
        className="rounded m-auto m-sm-2 p-sm-1"
        value={code}
        onChange={(event) => _setCode(event.target.value)}
        placeholder="Enter event code"
      ></input>
      <br />
      <button
        id="button-close"
        className="btn-outline rounded border-0 m-sm-2 p-sm-2"
        onClick={props.handleClose}
      >
        Cancel
      </button>
      <button
        id="button-submit"
        className="btn-primary rounded m-sm-2 p-sm-2"
        onClick={onSubmit}
      >
        Submit
      </button>
      {errorMessage && (
        <div className="error-message p-sm-2">Error: {errorMessage}</div>
      )}
    </Modal>
  );
};

export default PromotionModal;
