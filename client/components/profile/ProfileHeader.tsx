import React, { SyntheticEvent } from "react";
import HamburgerHeader from "../general/HamburgerHeader";

interface ProfileProps {
  active: boolean;
  handleClick: (e: SyntheticEvent) => void;
}

const ProfileHeader: React.FC<ProfileProps> = function ({
  active,
  handleClick,
}) {
  return (
    <header className="profile-header">
      <div className="max-wrapper">
        <div className="profile-hb-flex-wrapper">
          <div className="logo-wrapper">
            <h1 className="logo-title">Daazzll</h1>
          </div>
          <div className="hamburger-wrapper">
            <HamburgerHeader
              active={active}
              handleClick={handleClick}
              id="profile-hamburger-btn"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
