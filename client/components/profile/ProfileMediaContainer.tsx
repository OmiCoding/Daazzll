import React from "react";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/profile/useGetProfile";
import ProfileMediaList from "./ProfileMediaList";

const ProfileMediaContainer: React.FC = function () {
  const { auth } = useAuth();

  useGetProfile();

  return (
    <div className="profile-media-wrapper">
      <div className="flex-media-wrapper">
        <button className="profile-media__btn">
          <i className="fa-solid fa-plus" />
          Add to watchlist
        </button>
        <div className="ellipsi-wrapper">
          <button className="ellipsi-button">
            <i className="fa-solid fa-ellipsis-vertical" />
          </button>
        </div>
        {/* <ProfileMediaList auth={auth} /> */}
      </div>
    </div>
  );
};

export default ProfileMediaContainer;
