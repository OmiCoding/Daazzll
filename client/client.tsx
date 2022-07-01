import React from "react";
import { hydrate, render } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import App from "./app-web";

loadableReady(() => {
  const root = document.getElementById("root");

  // React v18 this needs to be changed.
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
