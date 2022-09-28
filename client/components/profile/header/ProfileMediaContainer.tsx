import React, { MouseEvent, useState } from "react";
import ProfileMediaList from "./ProfileMediaList";

interface MediaProps {
  user: boolean;
}

const ProfileMediaContainer: React.FC<MediaProps> = function ({ user }) {
  const [state, setState] = useState({
    show: false,
  });

  const { show } = state;

  const handleEllipsis = function (e: MouseEvent<HTMLButtonElement>) {
    return setState({
      ...state,
      show: !show,
    });
  };

  return (
    <div className="profile-media-wrapper">
      <div className="flex-media-wrapper">
        <button className="profile-media__btn hide--desktop">
          <i className="fa-solid fa-wand-magic-sparkles" />
          Add to watchlist
        </button>
        <ProfileMediaList show={show} user={user} />
        <div className="ellipsi-wrapper">
          <button className="ellipsi-button" onClick={(e) => handleEllipsis(e)}>
            <i className="fa-solid fa-ellipsis-vertical" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileMediaContainer;
