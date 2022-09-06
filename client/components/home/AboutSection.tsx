import React from "react";
import CommunitySVG from "../../../svgs/community-02.svg";
import "../../styles/home/about.css";

const AboutSection: React.FC = function () {
  return (
    <section className="about">
      <div className="max-wrapper">
        <div className="hp-flex-wrapper">
          <div className="text-wrapper">
            <h2 className="about-title">
              Find a community of other artists like yourself
            </h2>
            <p className="about-desc">
              Be inspired, network and find artists with their own styles.
            </p>
          </div>
          <div className="svg-container">
            <div className="svg-wrapper-about">
              <CommunitySVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
