import React, { SyntheticEvent, useEffect } from "react";
import "../../styles/wrappers.css";
import "../../styles/absHeader.css";
import HamburgerHeader from "./HamburgerHeader";
import HeaderNav from "./HeaderNav";
import scrollHeader from "../../hooks/scrollHeader";

const AbsHeader: React.FC = function () {
  function handleClick(e: SyntheticEvent) {
    const pathList = document.querySelector(".hamburger-menu")?.children;
    if (!pathList) {
      return;
    }
    for (let i = 0; i < pathList.length; i++) {
      if (pathList[i].classList[1]) {
        pathList[i].classList.remove(`hm__path-${i + 1}--animate`);
        continue;
      } else {
        pathList[i].classList.add(`hm__path-${i + 1}--animate`);
        continue;
      }
    }
  }

  scrollHeader();

  return (
    <div className="header-wrapper">
      <div className="max-wrapper">
        <div className="header-flex-wrapper">
          <div className="logo-wrapper">
            <h1 className="logo-title">Daazzll</h1>
          </div>
          <HeaderNav />
          <div className="btn-wrapper">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
          <HamburgerHeader handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default AbsHeader;
