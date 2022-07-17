import React from "react";
import UnauthSetup from "../auth/UnauthSetup";
import RegisterContainer from "./RegisterContainer";

const RegisterContext = function () {
  return (
    <UnauthSetup>
      <RegisterContainer />
    </UnauthSetup>
  );
};

export default RegisterContext;
