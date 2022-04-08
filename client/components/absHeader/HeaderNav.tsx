import React from "react";
import { Link } from "react-router-dom";

const HeaderNav: React.FC = function () {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list__items">
          <Link to="/" className="items__link">
            Home
          </Link>
        </li>
        <li className="nav__list__items">
          <Link to="/feed" className="items__link">
            Feed
          </Link>
        </li>
        <li className="nav__list__items">
          <Link to="/about" className="items__link">
            Market
          </Link>
        </li>
        <li className="nav__list__items">
          <Link to="/contact" className="items__link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
