import React from "react";
import { hydrate, render } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./app-web";

loadableReady(() => {
  const root = document.getElementById("root");
  if (root && root.innerHTML !== "") {
    hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
  } else {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
  }
});
