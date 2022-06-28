import React from "react";
import useProfileData from "../../hooks/profile/useProfileData";
import { ContextChildren } from "../../custom-types";

const ProfileSetup: React.FC<ContextChildren> = function ({ children }) {
  useProfileData();

  return children;
};

export default ProfileSetup;
