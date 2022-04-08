import React from "react";
import "../styles/wrappers.css";
import "../styles/home.css";

const Home: React.FC = function () {
  return (
    <div className="home-wrapper">
      <section className="home"></section>
      <section className="about"></section>
    </div>
  );
};

export default Home;
