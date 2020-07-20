import React, { useEffect, useState } from "react";
import Promotion from "./store/Promotion";
import Prizes from "./store/Prizes";

import "../css/Store.css";

const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const Store = (props) => {
  const [promotion, _setPromotion] = useState(null);
  const [prizes, _setPrizes] = useState(null);

  useEffect(() => {
    const getPromotion = async () => {
      const promotionsJson = await fetch(
        "https://cors-anywhere.herokuapp.com/https://api.youthcomputing.ca/shop/promotions"
      ).then((response) => response.json());
      return (
        <Promotion promotion={getRandomElement(promotionsJson["promotions"])} />
      );
    };
    const getPrizes = async () => {
      const prizesJson = await fetch(
        "https://api.youthcomputing.ca/shop/prizes"
      ).then((response) => response.json());
      return <Prizes prizeList={prizesJson["prizes"]} />;
    };
    getPromotion().then((response) => {
      _setPromotion(response);
      props.setLoadedPromotion(true);
    });
    getPrizes().then((response) => {
      _setPrizes(response);
      props.setLoadedPrizes(true);
    });
  }, []);
  return (
    <div id="store">
      {promotion ? promotion : <div>Loading promotion...</div>}
      {prizes ? prizes : <div>Loading prizes...</div>}
    </div>
  );
};

export default Store;
