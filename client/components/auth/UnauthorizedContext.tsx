import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useAuthCheck from "../../hooks/auth/useAuthCheck";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const UnauthorizedContext: React.FC<ProviderProps> = function ({ children }) {
  const location = useLocation();
  const { auth } = useAuth();

  useAuthCheck();

  if (auth) {
    return <Navigate to="/profile" state={{ from: location }} replace />;
  }

  return children;
};

export default UnauthorizedContext;
