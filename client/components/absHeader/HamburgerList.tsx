import React from "react";
import { Link } from "react-router-dom";

const HamburgerList: React.FC<{ active: boolean }> = function ({ active }) {
  return (
    <div
      className={
        active
          ? "hamburger-nav-wrapper hamburger-nav-wrapper--appear"
          : "hamburger-nav-wrapper"
      }
    >
      <nav className="hamburger-nav">
        <ul className="hamburger-nav-list">
          <li className="hb-nav__list__item">
            <Link to="/">Home</Link>
          </li>
          <li className="hb-nav__list__item">
            <Link to="/feed">Feed</Link>
          </li>
          <li className="hb-nav__list__item">
            <Link to="/market">Market</Link>
          </li>
          <li className="hb-nav__list__item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerList;
