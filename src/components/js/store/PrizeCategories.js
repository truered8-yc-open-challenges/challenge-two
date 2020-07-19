import React from "react";
import Button from "react-bootstrap/Button";

const categories = [
  "Laptops",
  "Wearables",
  "Gift Cards",
  "Drones",
  "Tablets",
  "Headphones and Speakers",
  "Miscellaneous",
];

const PrizeCategory = (props) => {
  return (
    <Button
      variant={props.selected === props.name ? "primary" : ""}
      className={`${props.selected === props.name ? "bg-blue" : "bg-red"}`}
      onClick={() => props.setSelected(props.name)}
      style={{ width: `${100 / categories.length}%` }}
    >
      {props.name}
    </Button>
  );
};
const PrizeCategories = (props) => {
  return (
    <div id="prize-categories" className="w-100 p-sm-2">
      {categories.map((value) => (
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