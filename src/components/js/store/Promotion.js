import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-modal";

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement("#promotion");
const Promotion = (props) => {
  const [show, _setShow] = useState(false);
  const [code, _setCode] = useState("");

  const handleClose = () => _setShow(false);
  const handleShow = () => _setShow(true);

  const onSubmit = () => {};

  return (
    <div id="promotion">
      <Modal
        id="promotion-modal"
        className="w-50 m-auto d-flex align-items-center bg-white"
        isOpen={show}
        onRequestClose={handleClose}
        contentLabel="Redeem Event"
      >
        <h2>Redeem Event</h2>
        <input
          type="text"
          id="event-code"
          value={code}
          onChange={(event) => _setCode(event.target.value)}
          placeholder="Enter event code"
        ></input>
        <button id="button-close" onClick={handleClose}>
          Cancel
        </button>
        <button id="button-submit" onSubmit={onSubmit}>
          Submit
        </button>
      </Modal>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.promotion["event_url"]}
      >
        <img
          src={props.promotion["image_url"]}
          alt="promotion"
          className="w-50 m-sm-2"
        />
      </a>
      <div id="promotion-buttons">
        <Button
          variant="primary"
          onClick={handleShow}
          className="w-100 m-sm-2 mb-sm-2 p-sm-3"
        >
          Redeem Event
        </Button>
        <a
          href={props.promotion["event_url"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-100 m-sm-2 p-sm-3"
        >
          More Information
        </a>
      </div>
    </div>
  );
};

export default Promotion;
