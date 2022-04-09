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
        <ul className="">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerList;
