import React from "react";
import SVGCompass from "../../../svgs/compass-14.svg";

const HBMenu: React.FC = function () {
  return (
    <nav className="home-hb__nav">
      <ul className="home-hb__list">
        <li className="home-hb__list__item">
          <SVGCompass />
          Home
        </li>
        <li className="home-hb__list__item">Explore</li>
        <li className="home-hb__list__item">Watch</li>
        <li className="home-hb__list__item">Wallet</li>
      </ul>
    </nav>
  );
};

export default HBMenu;
