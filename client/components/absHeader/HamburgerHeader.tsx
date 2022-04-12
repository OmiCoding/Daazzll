import React, { SyntheticEvent } from "react";
import HamburgerIcon from "./HamburgerIcon";

type handleClick = (e: SyntheticEvent) => void;

type Props = {
  handleClick: handleClick;
  active: boolean;
};

const HamburgerHeader: React.FC<Props> = ({ handleClick, active }) => {
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
