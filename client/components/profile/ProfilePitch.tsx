import React, { MouseEvent } from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface PitchProps {
  username: string;
  pitch: string;
  descActive: boolean;
  handleDesc: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ProfilePitch: React.FC<PitchProps> = function ({
  username,
  pitch,
  descActive,
  handleDesc,
}) {
  return (
    <section className="profile-pitch">
      <div className="flex-wrapper--split">
        <ProfileMediaContainer />
        <h2 className="profile__title">
          {username}
          <i className="fa-solid fa-circle-check" />
        </h2>
      </div>
      <div
        className={`profile-desc-wrapper ${
          descActive ? "pitch__desc--more" : "pitch__desc--less"
        }`}
      >
        <p className="pitch__desc">
          {pitch.length !== 0
            ? pitch
            : `
            Some cool description for your profile goes here, don't be shy!
            Represent yourself 😎, we want to hear from you as this text gets even
            longer. I will continue to extend this description to fill up the
            empty space that is here, don't mind me.
          `}
        </p>
      </div>
      <button onClick={(e) => handleDesc(e)} className="desc-btn">
        {descActive ? "See less" : "See more"}
        <i className={`fa-solid fa-angle-${descActive ? "up" : "down"}`} />
      </button>
    </section>
  );
};

export default ProfilePitch;
