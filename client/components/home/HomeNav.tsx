import React from "react";
import { Link } from "react-router-dom";
import SvgCompass from "../../../svgs/compass-13.svg";

const HomeNav: React.FC = function () {
  return (
    <nav className="home__nav">
      <ul className="home__list">
        <li className="home__list__item">
          <SvgCompass />
        </li>
        <li className="home__list__item"></li>
        <li className="home__list__item"></li>
        <li className="home__list__item"></li>
      </ul>
    </nav>
  );
};

export default HomeNav;
