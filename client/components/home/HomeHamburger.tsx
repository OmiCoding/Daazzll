import React, { useState } from "react";
import useResizeHeader from "../../hooks/general/useResizeHeader";
import HamburgerIcon from "./HamburgerIcon";
import HBMenu from "./HBMenu";

const HomeHamburger: React.FC = function () {
  const [active, setActive] = useState(false);

  const handleClick = function () {
    return setActive(!active);
  };

  useResizeHeader(active, setActive);

  return (
    <div className="home-hb-wrapper">
      <button onClick={handleClick} className="hamburger-button" />
      <HamburgerIcon active={active} />
      <div className="home-hb-menu">
        <HBMenu />
      </div>
    </div>
  );
};

export default HomeHamburger;
