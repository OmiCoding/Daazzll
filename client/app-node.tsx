import React from "react";
import { StaticRouter } from "react-router-dom/server";
import App from "./app-web";

// @ts-ignore
const AppSSR: React.FC = function ({ url }) {
  return (
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
};

export default AppSSR;
