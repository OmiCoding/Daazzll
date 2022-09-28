import React from "react";
import useApp from "../../../hooks/general/useApp";

interface MediaProps {
  show: boolean;
  user: boolean;
}

const ProfileMediaList: React.FC<MediaProps> = function ({ show, user }) {
  const { handleModal } = useApp();

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
      {user ? (
        <li className="profile__list__item">
          <button
            onClick={(e) => handleModal!(e, "media-links")}
            className="abs-list__btn"
          />
          <i className="fa-solid fa-plus" />
          Set media links
        </li>
      ) : null}
      <li className="profile__list__item hide--mobile">
        <button className="abs-list__btn" />
        <i className="fa-solid fa-wand-magic-sparkles" />
        Add to watchlist
      </li>
    </ul>
  );
};

export default ProfileMediaList;
