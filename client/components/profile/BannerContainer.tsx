import React from "react";

const BannerContainer: React.FC = function () {
  return (
    <div className="banner-wrapper">
      <div className="bg-img-wrapper">
        <div className="img-wrapper">
          <div className="add-img-btn-wrapper">
            <button className="add-img__btn">
              <i className="fa-solid fa-camera" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
