import React from "react";

const Promotion = (props) => {
  return (
    <div id="promotion" className="w-100 m-0">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.promotion["event_url"]}
      >
        <img
          src={props.promotion["image_url"]}
          alt="promotion"
          className="d-block mx-auto mb-md-3 shadow"
        />
      </a>
    </div>
  );
};

export default Promotion;
