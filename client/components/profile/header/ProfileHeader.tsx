import React, { Dispatch, SetStateAction } from "react";
import ProfilePitch from "./ProfilePitch";
import BannerContainer from "./BannerContainer";
import ProfileMediaContainer from "./ProfileMediaContainer";

interface HeaderProps {
  user: boolean;
  username: string;
  pitch: string;
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
}

const ProfileHeader: React.FC<HeaderProps> = function ({
  user,
  username,
  pitch,
  active,
  setActive,
}) {
  return (
    <>
      <BannerContainer user={user} />
      <ProfilePitch
        user={user}
        username={username}
        pitch={pitch}
        setActive={setActive}
        active={active}
      />
    </>
  );
};

export default ProfileHeader;
