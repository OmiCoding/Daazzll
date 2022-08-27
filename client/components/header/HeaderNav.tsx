import React from "react";
import { Link } from "react-router-dom";
import HamburgerHeader from "./HamburgerHeader";
import { HeaderProps } from "../../custom-types";
import "../../styles/header/header-nav.css";

const arr = ["Home", "Feed", "Explore", "Login", "Register"];

const HeaderNav: React.FC<HeaderProps> = function ({ active, handleClick }) {
  return (
    <nav className="header-nav">
      <ul className="nav__list nl--desktop">
        {arr.map((elem, i) => {
          if (i < 3) {
            return (
              <li key={elem} className="nav__list__items pad-1 nl--desktop ">
                <Link to="/" className="items__link">
                  {elem}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={elem} className="nav__list__items pad-1--lr nl--desktop">
                <button className="nav-btn">{elem}</button>
              </li>
            );
          }
        })}
      </ul>
      <HamburgerHeader handleClick={handleClick} active={active} />
    </nav>
  );
};

export default HeaderNav;
