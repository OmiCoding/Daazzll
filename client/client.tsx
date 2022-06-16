import React from "react";
import { hydrate, render } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import App from "./app-web";

<<<<<<< HEAD
loadableReady(() => {
  const root = document.getElementById("root");
=======
// const renderMethod = module.hot?

loadableReady(() => {
  const root = document.getElementById("root");

>>>>>>> main
  if (root && root.innerHTML !== "") {
    hydrate(
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>,
      root
    );
  } else {
    render(
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>,
      root
    );
  }
});
