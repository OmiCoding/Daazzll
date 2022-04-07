import React from "react";
import AbsHeader from "./absHeader/AbsHeader";
import { Outlet } from "react-router-dom";
import "../styles/global.css";
import "../styles/wrappers.css";

const PageLayout: React.FC = function () {
  return (
    <>
      <div className="body-wrapper">
        <AbsHeader />
        <Outlet />
      </div>
    </>
  );
};

export default PageLayout;
