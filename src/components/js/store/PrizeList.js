import React from "react";
import Prize from "./Prize";
import { categories } from "./../../../constants/categories";

const PrizeList = (props) => {
  return (
    <div id="prize-list" className="d-inline">
      {props.prizeList
        .filter((prize) => categories[prize["category"]] === props.category)
        .map((prize) => (
          <Prize prizeJson={prize} key={prize["id"]} />
        ))}
    </div>
  );
};

export default PrizeList;
