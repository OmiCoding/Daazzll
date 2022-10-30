import React from "react";
import useApp from "../../../hooks/general/useApp";
import useProfile from "../../../hooks/profile/useProfile";

interface BannerProps {
  user: boolean;
}

const BannerContainer: React.FC<BannerProps> = function ({ user }) {
  const { handleModal } = useApp();
  const { avatar } = useProfile();

  return (
    <div className="banner-wrapper">
      <div className="max-wrapper">
        <div className="bg-img-wrapper">
          <div className="img-wrapper">
            {user ? (
              <div className="add-img-btn-wrapper">
                <div className="aimg-pos-rel-wrap">
                  <button
                    onClick={(e) => handleModal!(e, "avatar")}
                    className="add-img__btn"
                  >
                    <i className="fa-solid fa-camera" />
                  </button>
                  <p className="btn-text">
                    add photos
                    <i className="fa-solid fa-plus" />
                  </p>
                </div>
              </div>
            ) : null}
            {avatar && <img className="avatar-img" src={avatar} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerContainer;
