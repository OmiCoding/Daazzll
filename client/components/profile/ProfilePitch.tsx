import React, { MouseEvent } from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface PitchProps {
  username: string;
  pitch: string;
  user: boolean;
  descActive: boolean;
  handleDesc: (e: MouseEvent<HTMLButtonElement>) => void;
}

const ProfilePitch: React.FC<PitchProps> = function ({
  user,
  username,
  pitch,
  descActive,
  handleDesc,
}) {
  return (
    <section className="profile-pitch">
      <div className="z-idx-wrapper-1">
        <div className="flex-wrapper--split">
          <ProfileMediaContainer user={user} />
          <h2 className="profile__title">
            {username}
            <i className="fa-solid fa-circle-check" />
          </h2>
        </div>
      </div>
      <div
        /* css class still being applied */
        className={
          descActive
            ? "profile-desc-wrapper--more"
            : "profile-desc-wrapper--less"
        }
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
