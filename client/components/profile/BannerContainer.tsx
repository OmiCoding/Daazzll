import React from "react";
import useApp from "../../hooks/general/useApp";

interface BannerProps {
  user: boolean;
}

const BannerContainer: React.FC<BannerProps> = function ({ user }) {
  const { handleModal } = useApp();

  return (
    <div className="banner-wrapper">
      <div className="bg-img-wrapper">
        <div className="img-wrapper">
          {user ? (
            <div className="add-img-btn-wrapper">
              <button
                className="add-img__btn"
                onClick={(e) => handleModal!(e, "user-photo")}
              >
                <i className="fa-solid fa-camera" />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
