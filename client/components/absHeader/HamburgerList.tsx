import React from "react";
import { Link } from "react-router-dom";

type Props = {
  active: boolean;
};

const HamburgerList = React.forwardRef<HTMLDivElement, Props>(
  ({ active }, ref) => {
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
            <div className="hb-nav__item__svg-wrapper"></div>
              <Link to="/feed" className="hb-nav__item__link">
                Feed
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
  }
);

export default HamburgerList;
