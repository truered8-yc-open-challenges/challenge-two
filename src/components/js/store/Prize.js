import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";
import PrizeModal from "./PrizeModal";

import { UserContext } from "./../../../contexts/UserContext";

const loaderStyle = `
  display: block;
  margin: 1em auto;
  border-color: blue;
`;

const Prize = (props) => {
  const [showModal, _setShow] = useState(false);
  const handleClose = () => _setShow(false);

  const [message, _setMessage] = useState();
  const [success, _setSuccess] = useState(false);

  const { userData, updateUserData } = useContext(UserContext);
  const onClick = () => {
    _setShow(true);
    if (userData)
      if (userData["points"] >= props.prizeJson["points"])
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
              _setSuccess(true);
              fetch(`https://api.youthcomputing.ca/users/${userData["id"]}`)
                .then((response) => response.json())
                .then((response) => {
                  updateUserData(response["userData"]);
                });
            } else {
              _setMessage(response["message"]);
              _setSuccess(false);
            }
          });
      else {
        _setMessage(
          `Sorry, you need ${
            props.prizeJson["points"] - userData["points"]
          } more points to redeem ${props.prizeJson["name"]}!`
        );
        _setSuccess(false);
      }
    else {
      _setMessage("You must log in to redeem prizes!");
      _setSuccess(false);
    }
  };

  const [imageLoaded, _setImageLoaded] = useState(false);
  const prizeClassName = `prize w-${
    props.isMobile ? "100" : "25"
  } p-sm-1 m-0 d-inline-block rounded-lg`;
  return (
    <div className={prizeClassName}>
      <PrizeModal
        prizeJson={props.prizeJson}
        message={message}
        success={success}
        show={showModal}
        handleClose={handleClose}
      />
      <Button className="border-0 shadow bg-white text-body" onClick={onClick}>
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
        <div className="prize-name p-md-2">
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
