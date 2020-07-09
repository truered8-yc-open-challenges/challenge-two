import React, { useEffect, useState } from "react";
import "../css/Store.css";
import Button from "react-bootstrap/Button";
import Promotion from "./store/Promotion";
import EventModal from "./store/EventModal";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const Store = () => {
  const [promotion, _setPromotion] = useState(null);

  const [showEvent, _setShowEvent] = useState(false);
  const handleClose = () => _setShowEvent(false);
  const handleShow = () => _setShowEvent(true);

  useEffect(() => {
    const getPromotion = async () => {
      const promotionsJson = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.youthcomputing.ca/shop/promotions"
      ).then((response) => response.json());
      return (
        <Promotion promotion={getRandomElement(promotionsJson["promotions"])} />
      );
    };
    getPromotion().then((response) => {
      _setPromotion(response);
    });
  }, []);
  return (
    <div id="store">
      <EventModal
        show={showEvent}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {promotion}
      <Button
        variant="primary"
        onClick={handleShow}
        className="w-75 m-sm-2 mb-sm-2 p-sm-3"
      >
        Redeem Event
      </Button>
    </div>
  );
};

export default Store;
