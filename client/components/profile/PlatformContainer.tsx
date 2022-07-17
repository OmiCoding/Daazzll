import React from "react";
import IconContainer from "./IconContainer";

const PlatformContainer = function () {
  return (
    <div className="ml-platform-wrapper">
      <h2 className="platform__title">Available platforms</h2>
      <div className="flex-wrapper-2">
        <IconContainer
          iconClass={"discord"}
          typeClass={"brands"}
          content={"discord"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"twitter"}
          typeClass={"brands"}
          content={"twitter"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"instagram"}
          typeClass={"brands"}
          content={"instagram"}
          ttClass={"tt-abs--center"}
        />
      </div>
      <div className="flex-wrapper-2">
        <IconContainer
          iconClass={"facebook"}
          typeClass={"brands"}
          content={"facebook"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"globe"}
          typeClass={"solid"}
          content={"website"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"pinterest"}
          typeClass={"brands"}
          content={"pinterest"}
          ttClass={"tt-abs--center"}
        />
      </div>
      <div className="flex-wrapper-2">
        <IconContainer
          iconClass={"reddit"}
          typeClass={"brands"}
          content={"reddit"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"tumblr"}
          typeClass={"brands"}
          content={"tumblr"}
          ttClass={"tt-abs--center"}
        />
        <IconContainer
          iconClass={"tiktok"}
          typeClass={"brands"}
          content={"tiktok"}
          ttClass={"tt-abs--center"}
        />
      </div>
    </div>
  );
};

export default PlatformContainer;
