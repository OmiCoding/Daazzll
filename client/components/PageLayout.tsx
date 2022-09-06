import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./aside/Aside";
import Header from "./header/Header";
import Footer from "./footer/Footer";

import "../styles/global.css";
import "../styles/wrappers.css";

const PageLayout: React.FC = function () {
  return (
    <>
      <Header />
      <Aside />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
