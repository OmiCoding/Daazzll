import React, { useContext, useState } from "react";
import ProfileContext from "../../context/profile/ProfileContext";
import Modal from "../modal/Modal";
import BannerContainer from "./BannerContainer";
import ProfileHeader from "./ProfileHeader";
import ProfilePitch from "./ProfilePitch";
import TestModal from "./TestModal";

const ProfileContainer: React.FC = function () {
  const [active, setActive] = useState(false);

  const { user, username, pitch } = useContext(ProfileContext);

  return (
    <>
      <div className="page-wrapper">
        <section className="profile-page">
          <ProfileHeader />
          <BannerContainer user={user} />
          <ProfilePitch
            user={user}
            username={username}
            pitch={pitch}
            setActive={setActive}
            active={active}
          />
        </section>
      </div>
      <Modal>
        <TestModal></TestModal>
      </Modal>
    </>
  );
};

export default ProfileContainer;
