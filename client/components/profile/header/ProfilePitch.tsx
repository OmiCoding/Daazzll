import React, { Dispatch, SetStateAction } from "react";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface PitchProps {
  username: string;
  pitch: string;
  user: boolean;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const ProfilePitch: React.FC<PitchProps> = function ({
  user,
  username,
  pitch,
  active,
  setActive,
}) {
  return (
    <section className="profile-pitch">
      <div className="max-wrapper">
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
            active ? "profile-desc-wrapper--more" : "profile-desc-wrapper--less"
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
        <div className="desc-btn-wrapper">
          <button onClick={() => setActive(!active)} className="desc-btn">
            {active ? "Show Less" : "Show more"}
            <i className={`fa-solid fa-angle-${active ? "up" : "down"}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePitch;
