import loadable from "@loadable/component";
import React from "react";
import Loading from "../components/general/Loading";

const Profiles = loadable(
  () => import("../components/profile/ProfilesContext"),
  {
    fallback: <Loading />,
  }
);
export default Profiles;
