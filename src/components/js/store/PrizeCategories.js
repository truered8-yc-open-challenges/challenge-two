import React from "react";
import Button from "react-bootstrap/Button";
import { categories } from "../../../constants/helpers";

const PrizeCategory = (props) => {
  return (
    <Button
      className={`border-0 shadow m-sm-2 rounded-pill ${
        props.selected === props.name
          ? "bg-blue text-white"
          : "bg-white text-body"
      }`}
      onClick={() => props.setSelected(props.name)}
      style={{
        width: `calc(${100 / Object.entries(categories).length}% - 1em)`,
      }}
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
