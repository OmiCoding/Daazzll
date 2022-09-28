import React from "react";
import GuestCheckContext from "../auth/GuestCheckContext";
import RegisterContainer from "./RegisterContainer";

const RegisterContext = function () {
  return (
    <GuestCheckContext>
      <RegisterContainer />
    </GuestCheckContext>
  );
};

export default RegisterContext;
