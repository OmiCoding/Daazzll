import React from "react";
import { hydrate } from "react-dom";
import { loadableReady } from "@loadable/component";
import { BrowserRouter } from "react-router-dom";

import App from "./app-web";

loadableReady(() => {
  const root = document.getElementById("root");
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    root
  );
});
