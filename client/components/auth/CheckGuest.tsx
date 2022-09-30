import React from "react";
import { ContextChildren } from "../../custom-types";
import useGuestCheck from "../../hooks/auth/useGuestCheck";

const CheckGuest: React.FC<ContextChildren> = function ({ children }) {
  useGuestCheck();
  return children;
};

export default CheckGuest;
