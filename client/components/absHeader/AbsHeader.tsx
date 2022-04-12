import React, { SyntheticEvent, useState, useRef, useEffect } from "react";
import "../../styles/wrappers.css";
import "../../styles/absHeader.css";
import HamburgerHeader from "./HamburgerHeader";
import HeaderNav from "./HeaderNav";
import useScrollAbsHeader from "../../hooks/useScrollAbsHeader";
import HamburgerList from "./HamburgerList";
import useResizeAbsHeader from "../../hooks/useResizeAbsHeader";

const AbsHeader: React.FC = function () {
  const [active, setActive] = useState(false);

  const headerElem = useRef<HTMLDivElement | null>(null);
  const headWrapElem = useRef<HTMLDivElement | null>(null);
  const hbWrapElem = useRef<HTMLDivElement | null>(null);

  function handleClick() {
    const htmlElem = document.documentElement;

    if (!headerElem.current || !headWrapElem.current || !hbWrapElem.current) {
      return;
    }

    if (!active) {
      htmlElem.classList.add("html-hb");
      headerElem.current.classList.add("header-wrapper-hb--open");
    } else {
      htmlElem.classList.remove("html-hb");
      headerElem.current.classList.remove("header-wrapper-hb--open");

      if (window.innerWidth > window.innerHeight) {
        headerElem.current.classList.remove("header-wrapper--ls");
        headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
        hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
      }
    }
    return setActive(!active);
  }

  useScrollAbsHeader();
  useResizeAbsHeader(active, headerElem, headWrapElem, hbWrapElem);

  return (
    <div ref={headerElem} className="header-wrapper">
      <div className="max-wrapper">
        <div ref={headWrapElem} className="header-hb-flex-wrapper">
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
          <HamburgerList ref={hbWrapElem} active={active} />
        </div>
      </div>
    </div>
  );
};

export default AbsHeader;
