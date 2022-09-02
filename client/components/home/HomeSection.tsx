import React from "react";
import PlayBtnSvg from "../../../svgs/playbtn-final.svg";
import "../../styles/home/showcase.css";

const HomeSection: React.FC = function () {
  return (
    <section className="home">
      <div className="max-wrapper">
        <div className="hp-flex-wrapper">
          <div className="text-wrapper">
            <h2 className="sc-title">
              Explore, create, and share your creations
            </h2>
            <p className="sc-desc">
              Daazzll is a platform to share your portfolio of work with the
              world.
            </p>
            <div className="sc-btn-wrapper">
              <button className="sc-btn">Join us</button>
            </div>
          </div>
          <div className="svg-container">
            <div className="svg-wrapper">
              <PlayBtnSvg />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
