import React, { SyntheticEvent } from "react";
import HamburgerIcon from "./HamburgerIcon";

type handleClick = (e: SyntheticEvent) => void;

const HamburgerHeader: React.FC<{ handleClick: handleClick; active: boolean }> =
  function ({ handleClick, active }) {
    return (
      <div className="hamburger-wrapper">
        <button
          id="abs-header-hamburger-btn"
          onClick={handleClick}
          className="hamburger-button"
        />
        <HamburgerIcon active={active} />
      </div>
    );
  };

export default HamburgerHeader;
