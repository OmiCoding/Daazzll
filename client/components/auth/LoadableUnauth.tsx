import React from "react";
import loadable from "@loadable/component";
import Loading from "../general/Loading";

const LoadableUnath = loadable(
  () => {
    return import("./UnauthSetup");
  },
  {
    fallback: <Loading />,
  }
);

export default LoadableUnath;
