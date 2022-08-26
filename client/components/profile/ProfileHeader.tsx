import React from "react";
import HamburgerHeader from "../header/HamburgerHeader";

const ProfileHeader: React.FC = function () {
  return (
    <header className="profile-header">
      <div className="max-wrapper">
        <div className="profile-hb-flex-wrapper">
          <div className="logo-wrapper">
            <h1 className="logo-title">Daazzll</h1>
          </div>
          {/* <div className="hamburger-wrapper">
            <HamburgerHeader id="profile-hamburger-btn" />
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
