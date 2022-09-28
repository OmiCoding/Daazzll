import React from "react";
import loadable from "@loadable/component";
import Loading from "../general/Loading";

const LoadableUnauth = loadable(
  () => {
    return import("./GuestCheckContext");
  },
  {
    fallback: <Loading />,
  }
);

export default LoadableUnauth;
