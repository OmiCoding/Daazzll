import React from "react";
import loadable, { LoadableComponent } from "@loadable/component";
import Loading from "../components/general/Loading";

const Login: LoadableComponent<any> = loadable(
  () => import("../components/login/LoginContext"),
  {
    fallback: <Loading />,
  }
);

export default Login;
