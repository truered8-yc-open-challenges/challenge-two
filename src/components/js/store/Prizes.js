import React, { useState } from "react";
import PrizeCategories from "./PrizeCategories";
import PrizeList from "./PrizeList";

const Prizes = (props) => {
  const [category, _setCategory] = useState("Laptops");

  return (
    <div id="prizes">
      <PrizeCategories category={category} setCategory={_setCategory} />
      <PrizeList prizeList={props.prizeList} category={category} />
    </div>
  );
};

export default Prizes;
