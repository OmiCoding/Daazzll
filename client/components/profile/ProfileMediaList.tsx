import React, { MouseEvent } from "react";

interface MediaProps {
  auth: boolean;
  show: boolean;
}

const ProfileMediaList: React.FC<MediaProps> = function ({ auth, show }) {
  const setMediaLinks = async function (e: MouseEvent<HTMLButtonElement>) {
    // trigger modal
  };

  const openSideMenu = async function (e: MouseEvent<HTMLButtonElement>) {
    // trigger side menu
  };

  return (
    <ul
      className="profile-media__list"
      style={{
        transform: show
          ? "translateY(110%) scaleY(1)"
          : "translateY(110%) scaleY(0)",
        opacity: show ? "1" : "0",
      }}
    >
      <li className="profile__list__item">
        <i className="fa-solid fa-flag" />
        Report
      </li>
      <li className="profile__list__item">
        <button onClick={(e) => setMediaLinks(e)} className="abs-list__btn" />
        <i className="fa-solid fa-plus" />
        Set media links
      </li>
      <li className="profile__list__item">
        <button onClick={(e) => openSideMenu(e)} className="abs-list__btn" />
        <i className="fa-solid fa-wand-magic-sparkles" />
        Add to watchlist
      </li>
    </ul>
  );
};

export default ProfileMediaList;
