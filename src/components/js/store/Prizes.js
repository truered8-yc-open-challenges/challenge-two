import React, { useState, useContext } from "react";
import PrizeCategories from "./PrizeCategories";
import PrizeList from "./PrizeList";

import { SearchContext } from "./../../../contexts/SearchContext";

const Prizes = (props) => {
  const [category, _setCategory] = useState("Laptops");
  const { setQuery } = useContext(SearchContext);
  const updateCategory = (newCategory) => {
    _setCategory(newCategory);
    setQuery("");
  };

  return (
    <div id="prizes">
      <PrizeCategories category={category} setCategory={updateCategory} />
      <PrizeList prizeList={props.prizeList} category={category} />
    </div>
  );
};

export default Prizes;
