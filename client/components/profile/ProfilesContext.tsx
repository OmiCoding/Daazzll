import React from "react";
import ProfileProvider from "../../context/profile/ProfileProvider";
import ProfilesSetup from "../../context/profile/ProfilesSetup";
import ProfileContainer from "./ProfileContainer";

const ProfilesContext = function () {
  return (
    <ProfileProvider>
      <ProfilesSetup>
        <ProfileContainer />
      </ProfilesSetup>
    </ProfileProvider>
  );
};

export default ProfilesContext;
