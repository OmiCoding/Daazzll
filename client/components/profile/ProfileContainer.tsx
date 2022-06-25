import React, { MouseEvent, useState } from "react";
import BannerContainer from "./BannerContainer";
import ProfileHeader from "./ProfileHeader";
import ProfilePitch from "./ProfilePitch";
import useGetProfile from "../../hooks/profile/useGetProfile";
import { ProfileState } from "../../custom-types";

const ProfileContainer: React.FC = function () {
  const [state, setState] = useState<ProfileState>({
    init: true,
    user: false,
    descActive: false,
    username: "",
    pitch: "",
  });

  const { init, user, username, pitch, descActive } = state;

  const handleDesc = function (e: MouseEvent<HTMLButtonElement>) {
    return setState({
      ...state,
      descActive: !descActive,
    });
  };

  useGetProfile(init, setState);

  return (
    <div className="page-wrapper">
      <section className="profile-page">
        <ProfileHeader />
        <BannerContainer user={user} />
        <ProfilePitch
          user={user}
          username={username}
          pitch={pitch}
          descActive={descActive}
          handleDesc={handleDesc}
        />
      </section>
    </div>
  );
};

export default ProfileContainer;
