import React from "react";
import HeaderNav from "./HeaderNav";
import "../../styles/header/header.css";

interface Props {
  handleClick: () => void;
  active: boolean;
}

const HeaderContent: React.FC<Props> = function ({ handleClick, active }) {
  return (
    <div className="header-flex-wrapper">
      <div className="logo-wrapper">
        <h1 className="logo-title">Daazzll</h1>
      </div>
      <HeaderNav handleClick={handleClick} active={active} />
    </div>
  );
};

export default HeaderContent;
