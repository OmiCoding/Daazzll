import React, { SyntheticEvent, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import HBMenu from "./HBMenu";

const HomeHamburger: React.FC = function () {
  const [active, setActive] = useState(false);

  const handleClick = function (e: SyntheticEvent) {
    return setActive(!active);
  };

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
