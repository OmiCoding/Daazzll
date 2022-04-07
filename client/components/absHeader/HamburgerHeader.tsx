import React, { SyntheticEvent } from "react";
import HamburgerIcon from "./HamburgerIcon";

type handleClick = (e: SyntheticEvent) => void;

const HamburgerHeader: React.FC<{ handleClick: handleClick }> = function ({
  handleClick,
}) {
  return (
    <div className="hamburger-wrapper">
      <button onClick={handleClick} className="hamburger-button" />
      <HamburgerIcon />
    </div>
  );
};

export default HamburgerHeader;
