import React from "react";
import Button from "react-bootstrap/Button";

const Prize = (props) => {
  return (
    <div className="prize w-25 p-sm-1 m-0 d-inline-block rounded-lg">
      <Button className="bg-white text-body">
        <img
          src={props.prizeJson["image_url"]}
          alt={props.prizeJson["name"]}
          className="w-100"
        />
        <div className="p-sm-2">
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
