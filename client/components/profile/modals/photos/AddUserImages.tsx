import React, {
  useState,
  useRef,
  FormEvent,
  MouseEvent,
  ChangeEvent,
} from "react";
import { CSSTransition } from "react-transition-group";
import useApp from "../../../../hooks/general/useApp";
import SwitchWrapper from "./SwitchWrapper";
import ProfileSection from "./ProfileSection";
import BannerSection from "./BannerSection";

import "../../../../styles/profile/addprofimage.css";
import "../../../../styles/wrappers.css";
import Cookies from "js-cookie";

interface UserImageState {
  profFile: File | null;
  bannerFile: File | null;
}

const AddUserImages = function () {
  const { handleModal, closeModal, modal, modalActive } = useApp();

  const line = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<UserImageState>({
    profFile: null,
    bannerFile: null,
  });

  const { profFile, bannerFile } = state;

  function handleSwitch(e: MouseEvent<HTMLButtonElement>) {
    if (handleModal!) {
      if (modal !== "banner") {
        handleModal(e, "banner");
      } else {
        handleModal(e, "user-photo");
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (!files) return;
    if (files.length === 0) return;

    console.log(files[0]);
    if (name === "profile") {
      setState({
        ...state,
        profFile: files[0],
      });
    } else {
      setState({
        ...state,
        bannerFile: files[0],
      });
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const accessToken = Cookies.get("access_token");
    if (modal === "user-photo") {
      // fetch("/profile/signature?type=profile", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
    }
  }

  return (
    <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
    >
      <div className="modal-wrapper-2 api-wrapper">
        <div className="mdl-btn-wrapper">
          <button className="mdl__cls-btn" onClick={(e) => closeModal!(e)}>
            Close
          </button>
        </div>
        <SwitchWrapper handleSwitch={handleSwitch} />
        <div className="relative-wrapper-1">
          <ProfileSection
            uploaded={profFile ? true : false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
          <BannerSection
            uploaded={bannerFile ? true : false}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddUserImages;
