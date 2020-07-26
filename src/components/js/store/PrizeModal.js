import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PacmanLoader from "react-spinners/PacmanLoader";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const PrizeModal = (props) => {
  return (
    <Modal id="prize-modal" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Prize</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.success && (
          <img
            src={props.prizeJson["image_url"]}
            alt={props.prizeJson["name"]}
            className="w-100"
          />
        )}
        {props.message}
        <PacmanLoader
          css={loaderStyle}
          color={"#123abc"}
          loading={!props.message}
          size={50}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PrizeModal;
