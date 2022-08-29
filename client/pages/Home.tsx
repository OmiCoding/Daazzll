import React from "react";
import HomeSection from "../components/home/HomeSection";
import AboutSection from "../components/home/AboutSection";

import "../styles/home/home.css";

const Home: React.FC = function () {
  return (
    <>
      <HomeSection />
      <AboutSection />
    </>
  );
};

export default Home;
