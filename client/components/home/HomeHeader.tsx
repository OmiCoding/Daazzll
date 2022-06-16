import React from "react";
import HomeHamburger from "./HomeHamburger";
import HomeNav from "./HomeNav";
import SignInLoginBtns from "./SignInLoginBtns";

const HomeHeader: React.FC = function () {
  return (
    <div className="home-nav-wrapper">
      <div className="max-wrapper">
        <div className="home-nav-flex-wrapper">
          <HomeNav />
          <SignInLoginBtns />
          <HomeHamburger />
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
