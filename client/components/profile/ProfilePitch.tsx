import React from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface PitchProps {
  username: string;
  pitch: string;
}

const ProfilePitch: React.FC<PitchProps> = function ({ username, pitch }) {
  return (
    <section className="profile-pitch">
      <ProfileMediaContainer />
      <h2 className="">{username}</h2>
    </section>
  );
};

export default ProfilePitch;
