import React from "react";
import { Link } from "react-router-dom";
// import CardSvg from "./svgIcons/CardSvg";

type Props = {
  active: boolean;
};

// React.forwardRef requires a named function
const HamburgerList = React.forwardRef<HTMLDivElement, Props>(function HBList(
  { active },
  ref
) {
  return (
    <div
      ref={ref}
      className={
        active
          ? "hamburger-nav-wrapper hamburger-nav-wrapper--appear"
          : "hamburger-nav-wrapper"
      }
    >
      <div className="sign-log-wrapper">
        <button className=""></button>
        <button className=""></button>
      </div>
      <nav className="hamburger-nav">
        <ul className="hamburger-nav-list">
          <li className="hb-nav__list__item">
            <div className="hb-nav__item__svg-wrapper"></div>
            <Link to="/" className="hb-nav__item__link">
              Home
            </Link>
          </li>
          <li className="hb-nav__list__item">
            {/* <CardSvg /> */}
            <Link to="/watch" className="hb-nav__item__link">
              Watch
            </Link>
          </li>
          <li className="hb-nav__list__item">
            <div className="hb-nav__item__svg-wrapper"></div>
            <Link to="/market" className="hb-nav__item__link">
              Market
            </Link>
          </li>
          <li className="hb-nav__list__item">
            <div className="hb-nav__item__svg-wrapper"></div>
            <Link to="/contact" className="hb-nav__item__link">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
});

export default HamburgerList;
