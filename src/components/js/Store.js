import React, { useEffect, useState } from "react";
import "../css/Store.css";
import Promotion from "./store/Promotion";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const getPromotion = async () => {
  const promotionsJson = await fetch(
    "https://api.youthcomputing.ca/shop/promotions"
  ).then((response) => response.json());
  return (
    <Promotion promotion={getRandomElement(promotionsJson["promotions"])} />
  );
};

const Store = () => {
  const [promotion, _setPromotion] = useState(null);
  useEffect(() =>
    getPromotion().then((response) => {
      _setPromotion(response);
    }), []);
  return <div id="store">{promotion}</div>;
};

export default Store;
