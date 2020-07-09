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
    </div>
  );
};

export default Promotion;
