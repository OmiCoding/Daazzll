import React from "react";
import useAuthCheck from "../../hooks/auth/useAuthCheck";
import { ContextChildren } from "../../custom-types";

const UnlockContext: React.FC<ContextChildren> = function ({ children }) {
  useAuthCheck();
  return children;
};

export default UnlockContext;
