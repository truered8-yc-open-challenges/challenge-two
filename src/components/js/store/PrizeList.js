import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { SortNumericDown, SortNumericUp } from "react-bootstrap-icons";
import DotLoader from "react-spinners/DotLoader";
import debounce from "lodash.debounce";

import Prize from "./Prize";
import { SearchContext } from "./../../../contexts/SearchContext";
import { categories } from "./../../../constants/categories";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: red;
`;

const PrizeList = (props) => {
  const [lowToHigh, setLowToHigh] = useState(true);

  const isMobile = window.screen.orientation === "portrait";
  const numPrizeIncrement = isMobile ? 1 : 4;
  const [numPrizes, _setNumPrizes] = useState(numPrizeIncrement);
  const [availablePrizes, _setAvailablePrizes] = useState(
    props.prizeList.filter(
      (prize) => categories[prize["category"]] === props.category
    )
  );
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

  const [loading, _setLoading] = useState(false);
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

  const { query } = useContext(SearchContext);
  const [displayPrizes, _setDisplayPrizes] = useState(
    availablePrizes
      .slice(0, numPrizes)
      .sort((a, b) =>
        lowToHigh ? a["points"] - b["points"] : b["points"] - a["points"]
      )
      .filter((prize) =>
        prize["name"].toLowerCase().includes(query.toLowerCase())
      )
      .map((prize) => (
        <Prize prizeJson={prize} key={prize["id"]} isMobile={isMobile} />
      ))
  );
  useEffect(
    () =>
      _setDisplayPrizes(
        availablePrizes
          .slice(0, numPrizes)
          .sort((a, b) =>
            lowToHigh ? a["points"] - b["points"] : b["points"] - a["points"]
          )
          .filter((prize) =>
            prize["name"].toLowerCase().includes(query.toLowerCase())
          )
          .map((prize) => (
            <Prize prizeJson={prize} key={prize["id"]} isMobile={isMobile} />
          ))
      ),
    [availablePrizes, numPrizes, lowToHigh, isMobile, query]
  );

  return (
    <div>
      {displayPrizes.length > 1 && (
        <Button
          id="prize-sorter"
          variant="info"
          onClick={() => setLowToHigh(!lowToHigh)}
          className="display-block mx-sm-2"
        >
          Sort: {lowToHigh ? <SortNumericDown /> : <SortNumericUp />}
        </Button>
      )}
      <div id="prize-list" className="d-inline-block">
        {displayPrizes}
      </div>
      <DotLoader css={loaderStyle} color={"#123abc"} loading={loading} />
    </div>
  );
};

export default PrizeList;
