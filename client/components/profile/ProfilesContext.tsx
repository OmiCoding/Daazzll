import React, { ReactElement } from "react";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const ProfilesContext: React.FC<ProviderProps> = function ({ children }) {
  return children;
};

export default ProfilesContext;
