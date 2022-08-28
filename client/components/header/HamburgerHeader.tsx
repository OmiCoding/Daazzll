import React, { useContext } from "react";
import HeaderContext from "../../context/header/HeaderContext";
import { HeaderProps } from "../../custom-types";

import HamburgerIcon from "./HamburgerIcon";

const HamburgerHeader: React.FC<HeaderProps> = function ({ handleHB }) {
  const { active } = useContext(HeaderContext);

  return (
    <div className="hamburger-wrapper">
      <button onClick={() => handleHB()} className="hamburger-button" />
      <HamburgerIcon active={active} />
    </div>
  );
};

export default HamburgerHeader;
