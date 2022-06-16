import React, { SyntheticEvent, useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/profile/useGetProfile";
import ProfileMediaList from "./ProfileMediaList";

const ProfileMediaContainer: React.FC = function () {
  const [state, setState] = useState({
    show: false,
  });

  const { show } = state;
  const { auth } = useAuth();

  const handleEllipsis = function (e: SyntheticEvent) {
    return setState({
      ...state,
      show: !show,
    });
  };

  useGetProfile();

  return (
    <div className="profile-media-wrapper">
      <div className="flex-media-wrapper">
        <button className="profile-media__btn">
          <i className="fa-solid fa-plus" />
          Add to watchlist
        </button>
        <ProfileMediaList auth={auth} show={show} />
        <div className="ellipsi-wrapper">
          <button className="ellipsi-button" onClick={handleEllipsis}>
            <i className="fa-solid fa-ellipsis-vertical" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMediaContainer;
