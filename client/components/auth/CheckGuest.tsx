import React from "react";
import { ContextChildren } from "../../custom-types";
import useGuestCheck from "../../hooks/auth/useGuestCheck";

const CheckAuth: React.FC<ContextChildren> = function ({ children }) {
  useGuestCheck();
  return children;
};

export default CheckAuth;
