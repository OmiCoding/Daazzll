import React from "react";

import MediaLinksForm from "./MediaLinksForm";

const MediaLinks = function () {
  return (
    <div className="medialinks-wrapper">
      <div className="ml-btn-wrapper">
        <button className="medialinks__cls-btn">Close</button>
      </div>
      <div className="ml-split-wrapper">
        <MediaLinksForm />
        <div className="ml-platform-wrapper">
          <h2 className="platform__title">Available platforms</h2>
          <div className="flex-wrapper-2">
            <div className="card-wrapper"></div>
            <div className="card-wrapper"></div>
            <div className="card-wrapper"></div>
          </div>
          <div className="flex-wrapper-2">
            <div className="card-wrapper"></div>
            <div className="card-wrapper"></div>
            <div className="card-wrapper"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLinks;
