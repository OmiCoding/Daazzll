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
    const headerElem = document.querySelector(".header-wrapper");
    const htmlElem = document.documentElement;

    if (!headerElem) {
      return;
    }

    if (!active) {
      headerElem.classList.add("header-wrapper--ls");
      htmlElem.style.overflowY = "hidden";
    } else {
      headerElem.classList.remove("header-wrapper--ls");
      htmlElem.style.overflowY = "visible";
    }

    setActive(!active);
  }

  scrollHeader();

  return (
    <div className="header-wrapper">
      <div className="max-wrapper">
        <div className="header-hb-flex-wrapper">
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
          </div>
          <HamburgerList active={active} />
        </div>
      </div>
    </div>
  );
};

export default AbsHeader;
