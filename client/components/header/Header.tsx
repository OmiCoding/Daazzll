import React, { useContext, useRef } from "react";
import HeaderContent from "../header/HeaderContent";
import HeaderContext from "../../context/header/HeaderContext";

import "../../styles/header/header.css";

import useHideHeader from "../../hooks/header/useHideHeader";

function Header() {
  const { active } = useContext(HeaderContext);

  const headerRef = useRef<HTMLHeadElement>(null);

  useHideHeader(headerRef, active);

  return (
    <header ref={headerRef} className="header">
      <div className="header-wrapper">
        <HeaderContent />
      </div>
    </header>
  );
}

export default Header;
