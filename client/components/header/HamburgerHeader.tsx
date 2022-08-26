import React from "react";

import HamburgerIcon from "./HamburgerIcon";

type Props = {
  active: boolean;
  handleClick: () => void;
};

const HamburgerHeader: React.FC<Props> = ({ active, handleClick }) => {
  return (
    <div className="hamburger-wrapper">
      <button onClick={handleClick} className="hamburger-button" />
      <HamburgerIcon active={active} />
    </div>
  );
};

export default HamburgerHeader;
