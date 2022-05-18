import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const UnauthorizedContext: React.FC<ProviderProps> = function ({ children }) {
  const { auth } = useAuth();

  if (auth) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default UnauthorizedContext;
