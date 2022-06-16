import React, { SyntheticEvent } from "react";
import HamburgerIcon from "./HamburgerIcon";

type handleClick = (e: SyntheticEvent) => void;

type Props = {
  handleClick: handleClick;
  active: boolean;
  id: string;
};

const HamburgerHeader: React.FC<Props> = ({ handleClick, active, id }) => {
  return (
    <div className="hamburger-wrapper">
      <button id={id} onClick={handleClick} className="hamburger-button" />
      <HamburgerIcon active={active} />
    </div>
  );
};

export default HamburgerHeader;
