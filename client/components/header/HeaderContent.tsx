import React from "react";
import HeaderNav from "./HeaderNav";
import "../../styles/header/header.css";
import { HeaderProps } from "../../custom-types";

const HeaderContent: React.FC<HeaderProps> = function ({ handleHB }) {
  return (
    <div className="header-flex-wrapper">
      <div className="logo-wrapper">
        <h1 className="logo-title">Daazzll</h1>
      </div>
      <HeaderNav handleHB={handleHB} />
    </div>
  );
};

export default HeaderContent;
