import React, { useState } from "react";
import loadable from "@loadable/component";

import BannerContainer from "./BannerContainer";
import ProfilePitch from "./ProfilePitch";
import AddDesignSection from "./design/AddDesignSection";
import useProfile from "../../hooks/profile/useProfile";
import Loading from "../general/Loading";

const LoadableModal = loadable(() => import("./modals/ProfileModal"), {
  fallback: <Loading />,
});

const ProfileContainer: React.FC = function () {
  const [active, setActive] = useState(false);

  const { user, username, pitch } = useProfile();

  return (
    <>
      <div className="page-wrapper">
        <section className="profile-page">
          <BannerContainer user={user} />
          <ProfilePitch
            user={user}
            username={username}
            pitch={pitch}
            setActive={setActive}
            active={active}
          />
          <AddDesignSection />
        </section>
      </div>
      <LoadableModal />
    </>
  );
};

export default ProfileContainer;
