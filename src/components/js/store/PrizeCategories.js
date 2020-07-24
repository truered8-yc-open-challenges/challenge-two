import React from "react";
import Button from "react-bootstrap/Button";

import { categories } from "./../../../constants/helpers";

const PrizeCategory = (props) => {
  return (
    <Button
      variant={props.selected === props.name ? "primary" : ""}
      className={`${props.selected === props.name ? "bg-blue" : "bg-red"}`}
      onClick={() => props.setSelected(props.name)}
      style={{ width: `${100 / Object.entries(categories).length}%` }}
    >
      {props.name}
    </Button>
  );
};
const PrizeCategories = (props) => {
  return (
    <div id="prize-categories" className="w-100 p-sm-2">
      {Object.entries(categories).map(([key, value]) => (
        <PrizeCategory
          name={value}
          key={value}
          selected={props.category}
          setSelected={props.setCategory}
        />
      ))}
    </div>
  );
};

export default PrizeCategories;
