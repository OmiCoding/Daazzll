import React from "react";
import HeaderNav from "./HeaderNav";
import "../../styles/header/header.css";

function HeaderContent() {
  return (
    <div className="header-flex-wrapper">
      <div className="logo-wrapper">
        <h1 className="logo-title">Daazzll</h1>
      </div>
      <HeaderNav />
    </div>
  );
}

export default HeaderContent;
