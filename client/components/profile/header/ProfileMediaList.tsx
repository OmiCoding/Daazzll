import { link } from "joi";
import React from "react";
import useApp from "../../../hooks/general/useApp";
import useProfile from "../../../hooks/profile/useProfile";

interface MediaProps {
  show: boolean;
  user: boolean;
}

const ProfileMediaList: React.FC<MediaProps> = function ({ show, user }) {
  const { handleModal } = useApp();
  const { website, instagram, facebook, discord, twitter } = useProfile();

  const linkObj = {
    website,
    instagram,
    facebook,
    discord,
    twitter,
  }
  
  const objArr = Object.keys(linkObj);
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
      {objArr.filter((elem) => {
        //@ts-ignore
        if(linkObj[elem].length === 0) {
          return false;
        } 
        return true;
      }).map((elem, ind) => {
        if(elem === "website") {
          return (
            <li key={ind} className="profile__list__item hide--mobile">
              <i className={`fa-solid fa-${elem}`} />
              {elem}
            </li>   
          );
        }
        return (
          <li key={ind} className="profile__list__item hide--mobile">
            <i className={`fa-brands fa-${elem}`} />
            {elem}
          </li>
        );
      })}
    </ul>
  );
};

export default ProfileMediaList;
