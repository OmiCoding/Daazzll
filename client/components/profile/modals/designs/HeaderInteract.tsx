import React from "react";
import "../../../../styles/profile/social.css";


const HeaderInteract = function() {
  return (
    <div className="interaction-wrapper">
      <button className="icon-btn icon-btn--heart">
        <i className="fa-solid fa-heart" />
      </button>
      <button className="icon-btn icon-btn--share">
        <i className="fa-solid fa-share" />
      </button>
      <button className="icon-btn icon-btn--info">
        <i className="fa-solid fa-circle-info" />
      </button>
      <button className="icon-btn icon-btn--folder">
        <i className="fa-solid fa-folder-plus" />
      </button>
    </div>
  ); 
}


export default HeaderInteract;