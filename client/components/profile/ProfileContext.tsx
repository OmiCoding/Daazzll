import React, { ReactElement } from "react";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const ProfileContext: React.FC<ProviderProps> = function ({ children }) {
  return children;
};
