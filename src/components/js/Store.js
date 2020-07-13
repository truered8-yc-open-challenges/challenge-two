import React, { useEffect, useState } from "react";
import "../css/Store.css";
import Promotion from "./store/Promotion";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const Store = () => {
  const [promotion, _setPromotion] = useState(null);

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
  return <div id="store">{promotion}</div>;
};

export default Store;
