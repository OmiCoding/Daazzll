import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthCheck from "../../hooks/useAuthCheck";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const UnlockContext: React.FC<ProviderProps> = function ({ children }) {
  const location = useLocation();
  const { auth } = useAuth();

  useAuthCheck();

  // if (!auth) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  return children;
};

export default UnlockContext;
