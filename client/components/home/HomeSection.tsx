import React from "react";
import PlayBtnSvg from "../../../svgs/playbtn-final.svg";

const HomeSection: React.FC = function () {
  return (
    <section className="home">
      <div className="hp-flex-wrapper">
        <div className="text-wrapper"></div>
        <div className="svg-wrapper"></div>
      </div>
      <PlayBtnSvg />
    </section>
  );
};

export default HomeSection;
