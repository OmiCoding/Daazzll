import React from "react";
import ProfileProvider from "../../context/profile/ProfileProvider";
import ProfileSetup from "../../context/profile/ProfileSetup";
import UnlockContext from "../auth/UnlockContext";
import ProfileContainer from "./ProfileContainer";

const ProfileContext = function () {
  return (
    <UnlockContext>
      <ProfileProvider>
        <ProfileSetup>
          <ProfileContainer />
        </ProfileSetup>
      </ProfileProvider>
    </UnlockContext>
  );
};

export default ProfileContext;
