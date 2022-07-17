import React from "react";
import { ContextChildren } from "../../custom-types";
import UnauthorizedContext from "./UnauthorizedContext";

const UnauthSetup: React.FC<ContextChildren> = function ({ children }) {
  return <UnauthorizedContext>{children}</UnauthorizedContext>;
};

export default UnauthSetup;
