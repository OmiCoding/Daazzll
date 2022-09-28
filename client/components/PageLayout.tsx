import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Aside from "./aside/Aside";
import Header from "./header/Header";
import Footer from "./footer/Footer";

import "../styles/global.css";
import "../styles/wrappers.css";
import useApp from "../hooks/general/useApp";
const PageLayout: React.FC = function () {
  const { dispatch } = useApp();

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: "GET_LOCATION",
        data: window.location.pathname,
      });
    }
  }, [dispatch]);

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
