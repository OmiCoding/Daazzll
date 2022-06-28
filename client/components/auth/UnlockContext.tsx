import React, { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useAuthCheck from "../../hooks/auth/useAuthCheck";
import { ContextChildren } from "../../custom-types";

const UnlockContext: React.FC<ContextChildren> = function ({ children }) {
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
