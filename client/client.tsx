import React from "react";
import { hydrate, render } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/auth/AuthProvider";
import App from "./app-web";
import AppProvider from "./context/app/AppProvider";
import HeaderProvider from "./context/header/HeaderProvider";

loadableReady(() => {
  const root = document.getElementById("root");
  if (root && root.innerHTML !== "") {
    hydrate(
      <AppProvider>
        <HeaderProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </HeaderProvider>
      </AppProvider>,
      root
    );
  } else {
    render(
      <AppProvider>
        <HeaderProvider>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </HeaderProvider>
      </AppProvider>,
     root
    );
  }
});
