import React from "react";
import { ContextChildren } from "../../custom-types";
import UnlockContext from "./UnlockContext";

const UnlockSetup: React.FC<ContextChildren> = function ({ children }) {
  return <UnlockContext>{children}</UnlockContext>;
};

export default UnlockSetup;
