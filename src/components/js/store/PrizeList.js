import React from "react";
import Prize from "./Prize";

const formattedCategories = {
  laptops: "Laptops",
  wearable_tech: "Wearables",
  gift_cards: "Gift Cards",
  drones: "Drones",
  tablets: "Tablets",
  "headphones_& speakers": "Headphones and Speakers",
  miscellaneous: "Miscellaneous",
};

const PrizeList = (props) => {
  return (
    <div id="prize-list" className="d-inline">
      {props.prizeList
        .filter(
          (prize) => formattedCategories[prize["category"]] === props.category
        )
        .map((prize) => (
          <Prize prizeJson={prize} key={prize["id"]} />
        ))}
    </div>
  );
};

export default PrizeList;
