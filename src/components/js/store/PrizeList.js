import React, { useState, useEffect } from "react";
import DotLoader from "react-spinners/DotLoader";
import Prize from "./Prize";
import debounce from "lodash.debounce";
import { categories } from "./../../../constants/categories";

const override = `
  display: block;
  margin: 1em auto;
  border-color: red;
`;

const PrizeList = (props) => {
  const numPrizeIncrement = 4;
  const [numPrizes, _setNumPrizes] = useState(numPrizeIncrement);
  const [availablePrizes, _setAvailablePrizes] = useState(
    props.prizeList.filter(
      (prize) => categories[prize["category"]] === props.category
    )
  );

  const [loading, _setLoading] = useState(false);

  useEffect(() => {
    _setAvailablePrizes(
      props.prizeList.filter(
        (prize) => categories[prize["category"]] === props.category
      )
      /* Array(100).fill(
        props.prizeList.filter(
          (prize) => categories[prize["category"]] === props.category
        )[0]
      ) */
    );
  }, [props.prizeList, props.category, numPrizes]);
  useEffect(() => _setLoading(numPrizes < availablePrizes.length), [
    numPrizes,
    availablePrizes,
  ]);

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      if (numPrizes < availablePrizes.length)
        _setNumPrizes(numPrizes + numPrizeIncrement);
    }
  }, 100);

  return (
    <div id="prize-list" className="d-inline">
      {availablePrizes.slice(0, numPrizes).map((prize) => (
        <Prize prizeJson={prize} key={prize["id"]} />
      ))}
      <DotLoader css={override} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default PrizeList;
