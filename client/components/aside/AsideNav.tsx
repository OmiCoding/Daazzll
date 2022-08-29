import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import HeaderContext from "../../context/header/HeaderContext";

import "../../styles/aside/aside-nav.css";

function AsideNav() {
  const { setActive } = useContext(HeaderContext);
  const navigate = useNavigate();

  const handleClick = function (path: string) {
    navigate(path);
    if (setActive) {
      return setActive();
    }
  };

  return (
    <ul className="aside-nav">
      <li className="aside__list">
        <div className="al-icon-wrapper">
          <i className="fa-solid fa-house al-icon" />
        </div>
        <span className="al__links">Home</span>
        <button className="al__btns-abs" onClick={() => handleClick("/")} />
      </li>
      <li className="aside__list al--last">
        <div className="al-icon-wrapper">
          <i className="fa-solid fa-play al-icon" />
        </div>
        <span className="al__links">Feed</span>
        <button className="al__btns-abs" onClick={() => handleClick("/feed")} />
      </li>
    </ul>
  );
}

export default AsideNav;
