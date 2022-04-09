import React, { SyntheticEvent, useState } from "react";
import "../../styles/wrappers.css";
import "../../styles/absHeader.css";
import HamburgerHeader from "./HamburgerHeader";
import HeaderNav from "./HeaderNav";
import scrollHeader from "../../hooks/scrollHeader";
import HamburgerList from "./HamburgerList";

const AbsHeader: React.FC = function () {
  const [active, setActive] = useState(false);

  function handleClick(e: SyntheticEvent) {
    const pathList = document.querySelector(".hamburger-menu")?.children;

    const htmlElem = document.documentElement;

    if (!pathList) {
      return;
    }
    // for (let i = 0; i < pathList.length; i++) {
    //   if (pathList[i].classList[1]) {
    //     pathList[i].classList.remove(`hm__path-${i + 1}--animate`);
    //     continue;
    //   } else {
    //     pathList[i].classList.add(`hm__path-${i + 1}--animate`);
    //     continue;
    //   }
    // }

    if (htmlElem.style.overflowY === "hidden") {
      htmlElem.style.overflowY = "auto";
      // headerWrap.classList.remove("header-wrapper--down");
    } else {
      htmlElem.style.overflowY = "hidden";
      // headerWrap.classList.add("header-wrapper--down");
    }

    setActive(!active);
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
          <HamburgerHeader active={active} handleClick={handleClick} />
          <HamburgerList active={active} />
        </div>
      </div>
    </div>
  );
};

export default AbsHeader;
