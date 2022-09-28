import React from "react";

import ProfileProvider from "../../context/profile/ProfileProvider";
import ProfileSetup from "../../context/profile/ProfileSetup";

import ProfileContainer from "./ProfileContainer";

const ProfileContext = function () {
  return (
    <ProfileProvider>
      <ProfileSetup>
        <ProfileContainer />
      </ProfileSetup>
    </ProfileProvider>
  );
};

export default ProfileContext;
