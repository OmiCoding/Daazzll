import React from "react";
import { hydrate, render } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import App from "./app-web";
import AppProvider from "./context/app/AppProvider";

loadableReady(() => {
  const root = document.getElementById("root");

  // React v18 this needs to be changed.
  if (root && root.innerHTML !== "") {
    hydrate(
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>,
      root
    );
  } else {
    render(
      <AppProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </AppProvider>,
      root
    );
  }
});
