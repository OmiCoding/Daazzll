import React, { useState } from "react";
import Modal from "../modal/Modal";
import BannerContainer from "./BannerContainer";
import ProfileHeader from "./ProfileHeader";
import ProfilePitch from "./ProfilePitch";
import ProfileModal from "./ProfileModal";
import useProfile from "../../hooks/profile/useProfile";
import useApp from "../../hooks/general/useApp";

const ProfileContainer: React.FC = function () {
  const [active, setActive] = useState(false);

  const { user, username, pitch } = useProfile();
  const { modalActive, modal } = useApp();

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
        <ProfileModal modalType={modal} modalActive={modalActive} />
      </Modal>
    </>
  );
};

export default ProfileContainer;
