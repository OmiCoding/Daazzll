import React from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

<<<<<<< HEAD
const ProfilePitch: React.FC = function () {
  return (
    <section className="profile-pitch">
      <ProfileMediaContainer />
=======
interface PitchProps {
  username: string;
  pitch: string;
}

const ProfilePitch: React.FC<PitchProps> = function ({ username, pitch }) {
  return (
    <section className="profile-pitch">
      <ProfileMediaContainer />
      <h2 className="">longusername</h2>
>>>>>>> main
    </section>
  );
};

export default ProfilePitch;
