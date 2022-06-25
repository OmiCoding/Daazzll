import React, { MouseEvent, useState } from "react";
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
    descActive: false,
  });

  const { init, username, pitch, descActive } = state;

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
        <BannerContainer />
        <ProfilePitch
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
