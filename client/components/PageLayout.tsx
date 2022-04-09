import React from "react";
import AbsHeader from "./absHeader/AbsHeader";
import { Outlet } from "react-router-dom";
import "../styles/global.css";
import "../styles/wrappers.css";

const PageLayout: React.FC = function () {
  return (
    <>
      <main className="main">
        <AbsHeader />
        <Outlet />
      </main>
    </>
  );
};

export default PageLayout;
