import React, { useState } from "react";
import PromotionModal from "./PromotionModal";
import Button from "react-bootstrap/Button";

const Promotion = (props) => {
  const [show, _setShow] = useState(false);
  const handleClose = () => _setShow(false);
  const handleShow = () => _setShow(true);

  return (
    <div id="promotion">
      <PromotionModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
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
