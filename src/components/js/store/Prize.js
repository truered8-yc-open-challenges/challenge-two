import React, { useContext, useState } from "react";
import PrizeModal from "./PrizeModal";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";

import { UserContext } from "../../../contexts/UserContext";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const Prize = (props) => {
  const [showModal, _setShow] = useState(false);
  const handleClose = () => _setShow(false);

  const [message, _setMessage] = useState();

  const { userData, updateUserData } = useContext(UserContext);

  const onClick = () => {
    _setShow(true);
    fetch("https://api.youthcomputing.ca/shop/redeem/prize", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: userData["id"],
        prizeId: props.prizeJson["id"],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response["error"]) {
          _setMessage(`Successfully redeemed ${props.prizeJson["name"]}!`);
          fetch(`https://api.youthcomputing.ca/users/${userData["id"]}`)
            .then((response) => response.json())
            .then((response) => {
              updateUserData(response["userData"]);
            });
        } else _setMessage(response["message"]);
      });
  };

  const [imageLoaded, _setImageLoaded] = useState(false);
  return (
    <div className="prize w-25 p-sm-1 m-0 d-inline-block rounded-lg">
      <PrizeModal
        prizeJson={props.prizeJson}
        message={message}
        show={showModal}
        handleClose={handleClose}
      />
      <Button className="bg-white text-body" onClick={onClick}>
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
