import React from "react";

interface BannerProps {
  user: boolean;
}

const BannerContainer: React.FC<BannerProps> = function ({ user }) {
  return (
    <div className="banner-wrapper">
      <div className="bg-img-wrapper">
        <div className="img-wrapper">
          {user ? null : (
            <div className="add-img-btn-wrapper">
              <button className="add-img__btn">
                <i className="fa-solid fa-camera" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
