import React from "react";
import HomeHeader from "./HomeHeader";
import PlayBtnSvg from "../../../svgs/playbtn-final.svg";

const HomeSection: React.FC = function () {
  return (
    <section className="home">
      <HomeHeader />
      <PlayBtnSvg />
    </section>
  );
};

export default HomeSection;
