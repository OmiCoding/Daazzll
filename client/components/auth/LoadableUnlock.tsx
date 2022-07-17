import React from "react";
import loadable from "@loadable/component";
import Loading from "../general/Loading";

const LoadableUnlock = loadable(
  () => {
    return import("./UnlockSetup");
  },
  {
    fallback: <Loading />,
  }
);

export default LoadableUnlock;
