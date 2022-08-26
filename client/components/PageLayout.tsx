import React from "react";
import { Outlet } from "react-router-dom";
import HeaderProvider from "../context/header/HeaderProvider";
import "../styles/global.css";
import "../styles/wrappers.css";
import Header from "./header/Header";

const PageLayout: React.FC = function () {
  return (
    <>
      <HeaderProvider>
        <Header />
      </HeaderProvider>
      <main className="main">
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;
