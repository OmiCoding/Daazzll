import React, {
  useState,
  useRef,
  useEffect,
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
import useProfile from "../../../../hooks/profile/useProfile";

interface UserImageState {
  profFile: File | null;
  bannerFile: File | null;
}

const AddUserImages = function () {
  const { handleModal, closeModal, modal, modalActive } = useApp();
  const { submitPhoto } = useProfile();

  const line = useRef<HTMLDivElement>(null);
  const wrapElem = useRef<HTMLDivElement>(null);

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
        handleModal(e, "avatar");
      }
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, files } = e.target;
    if (!files) return;
    if (files.length === 0) return;
    if (name === "avatar") {
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

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
    file: File | null
  ) {
    e.preventDefault();
    if (!file) return;
    let ext: string;

    if (file.type === "image/png") {
      if (modal === "banner") {
        if (bannerFile) {
          ext =
            "." +
            bannerFile.type.substring(
              bannerFile.type.length - 3,
              bannerFile.type.length
            );
        } else {
          return;
        }
      } else {
        if (profFile) {
          ext =
            "." +
            profFile.type.substring(
              profFile.type.length - 3,
              profFile.type.length
            );
        } else {
          return;
        }
      }
    } else if (file.type === "image/jpeg") {
      if (modal === "banner") {
        if (bannerFile) {
          ext = "." + bannerFile.name.split(".")[1];
        } else {
          return;
        }
      } else {
        if (profFile) {
          ext = "." + profFile.name.split(".")[1];
        } else {
          return;
        }
      }
    } else {
      return;
    }

   
    try {
      if(!submitPhoto) return;
      
      if(modal === "avatar") {
        if(!profFile) return;
        submitPhoto(profFile, "avatars", ext);
      } else {
        if(!bannerFile) return;
        submitPhoto(bannerFile, "banner", ext);
      }
     
      if (closeModal) {
        return closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const currElem = wrapElem.current;
    if (currElem && window.innerWidth > 1280) {
      currElem.style.top = "" + window.scrollY + "px";
    }

    return () => {
      if (currElem) {
        currElem.style.top = "0";
      }
    };
  }, [wrapElem]);

  return (
    <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
    >
      <div ref={wrapElem} id="wrapper" className="modal-wrapper-2 api-wrapper">
        <div className="mdl-btn-wrapper">
          <button className="mdl__cls-btn" onClick={(e) => closeModal!(e)}>
            Close
          </button>
        </div>
        <SwitchWrapper handleSwitch={handleSwitch} />
        <div className="relative-wrapper-1">
          <ProfileSection
            uploaded={profFile ? true : false}
            handleSubmit={(e) => handleSubmit(e, profFile)}
            handleChange={handleChange}
          />
          <BannerSection
            uploaded={bannerFile ? true : false}
            handleSubmit={(e) => handleSubmit(e, bannerFile)}
            handleChange={handleChange}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default AddUserImages;
