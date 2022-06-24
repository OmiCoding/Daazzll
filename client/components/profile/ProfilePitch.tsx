import React from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface PitchProps {
  username: string;
  pitch: string;
}

const ProfilePitch: React.FC<PitchProps> = function ({ username, pitch }) {
  return (
    <section className="profile-pitch">
      <div className="flex-wrapper--split">
        <ProfileMediaContainer />
        <h2 className="profile__title">
          {username}
          <i className="fa-solid fa-circle-check" />
        </h2>
      </div>
    </section>
  );
};

export default ProfilePitch;
