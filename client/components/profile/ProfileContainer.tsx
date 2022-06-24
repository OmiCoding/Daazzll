import React, { useState } from "react";
import BannerContainer from "./BannerContainer";
import ProfileHeader from "./ProfileHeader";
import ProfilePitch from "./ProfilePitch";
import useGetProfile from "../../hooks/profile/useGetProfile";
import { ProfileState } from "../../custom-types";

const ProfileContainer: React.FC = function () {
  const [state, setState] = useState<ProfileState>({
    init: true,
    username: "",
    pitch: "",
    userId: null,
  });

  const { init, username, pitch } = state;

  useGetProfile(init, setState);

  return (
    <div className="page-wrapper">
      <section className="profile-page">
        <ProfileHeader />
        <BannerContainer />
        <ProfilePitch username={username} pitch={pitch} />
      </section>
    </div>
  );
};

export default ProfileContainer;
