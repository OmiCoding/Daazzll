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

  const { user, username, pitch, design, resetDesign } = useProfile();

  const postDesign = function () {
    if (!design) return;
    const formData = new FormData();
    formData.append("design", design);

    console.log(formData, design);

    fetch("/profile/designs", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      body: formData,
    })
      .then((data) => data.json())
      .then((res) => {
        if (resetDesign) {
          resetDesign();
        }
      })
      .catch((err) => {
        console.error(err);
        if (resetDesign) {
          resetDesign();
        }
      });
  };

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
          <DesignSubmit postDesign={postDesign} />
        </section>
      </div>
      <LoadableModal />
    </>
  );
};

export default ProfileContainer;
