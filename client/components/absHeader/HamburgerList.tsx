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
        <nav className="hamburger-nav">
          <ul className="hamburger-nav-list">
            <li className="hb-nav__list__item">
              <Link to="/" className="hb-nav__item__link">
                Home
              </Link>
            </li>
            <li className="hb-nav__list__item">
              <Link to="/feed" className="hb-nav__list__link">
                Feed
              </Link>
            </li>
            <li className="hb-nav__list__item">
              <Link to="/market" className="hb-nav__list__link">
                Market
              </Link>
            </li>
            <li className="hb-nav__list__item">
              <Link to="/contact" className="hb-nav__list__link">
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
