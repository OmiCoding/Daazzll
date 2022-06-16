import React from "react";

interface MediaProps {
  auth: boolean;
  show: boolean;
}

const ProfileMediaList: React.FC<MediaProps> = function ({ auth, show }) {
  return (
    <ul
      style={{
        transform: show ? "scaleY(100%)" : "scaleY(0)",
        opacity: show ? "1" : "0",
      }}
      className="profile-media__list"
    >
      <li className="profile__list__item">
        <i className="fa-solid fa-flag" />
        Report
      </li>
    </ul>
  );
};

export default ProfileMediaList;
