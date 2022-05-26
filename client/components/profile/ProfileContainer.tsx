import React, { SyntheticEvent, useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";
import BannerContainer from "./BannerContainer";
import ProfileHeader from "./ProfileHeader";
import ProfilePitch from "./ProfilePitch";

const ProfileContainer: React.FC = function () {
  const [state, setState] = useState({
    active: false,
  });

  const { active } = state;

  const handleClick = function (e: SyntheticEvent) {
    setState({
      ...state,
      active: !active,
    });
  };

  const debouncer = useMemo(() => {
    const resize = function () {
      if (!active) return;
      if (window.innerWidth >= 1280 && active === true) {
        setState((prevState) => {
          return {
            ...prevState,
            active: false,
          };
        });
      }
    };
    return debounce(resize, 500);
  }, [active, setState]);

  useEffect(() => {
    window.addEventListener("resize", debouncer);

    return () => {
      window.removeEventListener("resize", debouncer);
    };
  }, [active, debouncer]);

  return (
    <div className="page-wrapper">
      <section className="profile-page">
        <ProfileHeader active={active} handleClick={handleClick} />
        <BannerContainer />
        <ProfilePitch />
      </section>
    </div>
  );
};

export default ProfileContainer;
