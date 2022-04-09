import React from "react";
import HomeNav from "./HomeNav";
import SignInLoginBtns from "./SignInLoginBtns";

const HomeHeader: React.FC = function () {
  return (
    <div className="home-nav-wrapper">
      <div className="max-wrapper">
        <HomeNav />
        <SignInLoginBtns />
      </div>
    </div>
  );
};

export default HomeHeader;
