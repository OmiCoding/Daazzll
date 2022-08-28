import React from "react";

import { useNavigate } from "react-router-dom";

import "../../styles/aside/aside-nav.css";

function AsideNav() {
  const navigate = useNavigate();

  const handleClick = function (path: string) {
    return navigate(path);
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
