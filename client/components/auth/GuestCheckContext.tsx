import React from "react";
import { ContextChildren } from "../../custom-types";
import CheckGuest from "./CheckGuest";

const GuestCheckContext: React.FC<ContextChildren> = function ({ children }) {
  return <CheckGuest>{children}</CheckGuest>;
};

export default GuestCheckContext;
