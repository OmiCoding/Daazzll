import React from "react";
import HomeSection from "../components/home/HomeSection";
import AboutSection from "../components/home/AboutSection";

import "../styles/home/home.css";
import "../styles/home/general.css";
import useGuestCheck from "../hooks/auth/useGuestCheck";

const Home: React.FC = function () {
  useGuestCheck();

  return (
    <>
      <HomeSection />
      <AboutSection />
    </>
  );
};

export default Home;
