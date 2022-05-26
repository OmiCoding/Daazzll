import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useAuthCheck from "../../hooks/auth/useAuthCheck";
// import useCheckSession from "../../hooks/useCheckSession";

interface ProviderProps {
  children: ReactElement<any, any>;
}

const UnlockContext: React.FC<ProviderProps> = function ({ children }) {
  const location = useLocation();
  const { auth } = useAuth();

  useAuthCheck();

  return !auth ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    children
  );
};

export default UnlockContext;
