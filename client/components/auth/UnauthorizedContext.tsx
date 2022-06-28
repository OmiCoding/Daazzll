import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useAuthCheck from "../../hooks/auth/useAuthCheck";
import { ContextChildren } from "../../custom-types";

const UnauthorizedContext: React.FC<ContextChildren> = function ({ children }) {
  const location = useLocation();
  const { auth, username } = useAuth();

  useAuthCheck();

  if (auth) {
    return (
      <Navigate
        to={`/profile/${username}`}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
};

export default UnauthorizedContext;
