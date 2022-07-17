import loadable from "@loadable/component";
import React from "react";
import Loading from "../components/general/Loading";

const Register = loadable(
  () => import("../components/register/RegisterContext"),
  {
    fallback: <Loading />,
  }
);

export default Register;
