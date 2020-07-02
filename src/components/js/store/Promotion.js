import React from "react";

const Promotion = (props) => {
  return (
    <div id="promotion">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.promotion["event_url"]}
      >
        <img
          src={props.promotion["image_url"]}
          alt="promotion"
          className="w-50 m-sm-2"
        />
      </a>
      <div id="promotion-buttons">
        <button className="w-100 m-sm-2 mb-sm-2 p-sm-3">Redeem Event</button>
        <a
          href={props.promotion["event_url"]}
          target="_blank"
          rel="noopener noreferrer"
          className="w-100 m-sm-2 p-sm-3"
        >
          More Information
        </a>
      </div>
    </div>
  );
};

export default Promotion;
