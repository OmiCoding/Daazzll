import React, { useEffect } from "react";
import useApp from "../../../hooks/general/useApp";
import useProfile from "../../../hooks/profile/useProfile";

interface BannerProps {
  user: boolean;
}

const BannerContainer: React.FC<BannerProps> = function ({ user }) {
  const { handleModal } = useApp();
  const { avatar, activeImg, dispatch } = useProfile();

  useEffect(() => {
   
    try {
      console.log(activeImg);
      if(activeImg === "avatar") {
        fetch("/profile/avatar", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((data) => data.json())
        .then((res) => {
          if(res.url) {
            if(dispatch) {
              dispatch({
                type: "ACTIVE_IMAGE",
              })
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
      } else {
        fetch("/profile/banner", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((data) => data.json())
        .then((res) => {
          if(res.url) {
            if(dispatch) {
              dispatch({
                type: "ACTIVE_IMAGE",
              })
            }
          }
        })
      }

    } catch(e) {
      console.error(e);
    }
  }, [activeImg, dispatch])

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
