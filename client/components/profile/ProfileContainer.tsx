import React, { useState } from "react";
import loadable from "@loadable/component";
import ProfileHeader from "./header/ProfileHeader";
import AddDesignSection from "./design/AddDesignSection";
import DesignSubmit from "./design/DesignSubmit";
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
          <ProfileHeader
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
