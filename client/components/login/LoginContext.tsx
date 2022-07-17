import React from "react";
import { ContextChildren } from "../../custom-types";
import UnauthSetup from "../auth/UnauthSetup";
import LoginContainer from "./LoginContainer";

const LoginContext: React.FC<ContextChildren> = function () {
  return (
    <UnauthSetup>
      <LoginContainer />
    </UnauthSetup>
  );
};

export default LoginContext;
