import React from "react";
import { ContextChildren } from "../../custom-types";
import GuestCheckContext from "../auth/GuestCheckContext";
import LoginContainer from "./LoginContainer";

const LoginContext: React.FC<ContextChildren> = function () {
  return (
    <GuestCheckContext>
    <LoginContainer />
    </GuestCheckContext>
  );
};

export default LoginContext;
