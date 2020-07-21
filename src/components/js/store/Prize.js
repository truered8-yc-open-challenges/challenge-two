import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const Prize = (props) => {
  const [imageLoaded, _setImageLoaded] = useState(false);
  return (
    <div className="prize w-25 p-sm-1 m-0 d-inline-block rounded-lg">
      <Button className="bg-white text-body">
        <img
          src={props.prizeJson["image_url"]}
          alt={props.prizeJson["name"]}
          style={imageLoaded ? {} : { display: "none" }}
          onLoad={() => _setImageLoaded(true)}
          className="w-100"
        />
        <ClipLoader
          css={loaderStyle}
          color={"#123abc"}
          loading={!imageLoaded}
          size={100}
        />
        <div className="prize-name p-sm-2">
          <strong>{props.prizeJson["name"]}</strong>
        </div>
        <div className="float-left m-sm-2">Redeem Now</div>
        <div className="float-right m-sm-2">
          {props.prizeJson["points"]} points
        </div>
      </Button>
    </div>
  );
};

export default Prize;
