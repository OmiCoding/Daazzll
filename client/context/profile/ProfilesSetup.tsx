import React from "react";
import { ContextChildren } from "../../custom-types";
import useGetProfile from "../../hooks/profile/useGetProfile";

const ProfilesSetup: React.FC<ContextChildren> = function ({ children }) {
  useGetProfile();

  return children;
};

export default ProfilesSetup;
