import React from "react";
import "../styles/wrappers.css";
import "../styles/home.css";
import HomeSection from "../components/home/HomeSection";
import AboutSection from "../components/home/AboutSection";

const Home: React.FC = function () {
  return (
    <>
      <HomeSection />
      <AboutSection />
    </>
  );
};

export default Home;
