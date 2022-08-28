import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./aside/Aside";
import HeaderProvider from "../context/header/HeaderProvider";
import Header from "./header/Header";

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
    </>
  );
};

export default PageLayout;
