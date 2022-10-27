import React, { useRef, useMemo, useLayoutEffect } from "react";
import debounce from "lodash.debounce";
import { CSSTransition } from "react-transition-group";

import MediaLinks from "./medialinks/MediaLinks";
import useApp from "../../../hooks/general/useApp";
import AddUserImages from "./photos/AddUserImages";
import Modal from "../../modal/Modal";

import "../../../styles/modal.css";
import "../../../styles/profile/medialinks.css";
import Designs from "./designs/Designs";

const ProfileModal: React.FC = function () {
  const bgElem = useRef<HTMLDivElement>(null);
  const pfModal = useRef<HTMLDivElement>(null);
  let modalItem;

  const { modal, modalActive } = useApp();

  console.log(modal)

  if (modal === "media-links") {
    modalItem = <MediaLinks />;
  } else if (modal === "user-photo" || modal === "banner") {
    modalItem = <AddUserImages />;
  } else if (modal === "design") {
    modalItem = <Designs />;
  }

  const debounceResize = useMemo(() => {
    // This event type may need to be changed.
    function resizeModal(event: Event) {
      if (window.outerWidth >= 1280) {
      }
    }

    return debounce(resizeModal, 600);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [modalActive, debounceResize]);

  return (
    <CSSTransition
      in={modalActive}
      timeout={200}
      classNames="modalBg"
      appear={true}
      unmountOnExit
    >
      <Modal>
        <div ref={bgElem} className="bg-modal-1">
          <div className="pf-modal-wrapper">
            <div className="pf-modal">{modalItem}</div>
          </div>
        </div>
      </Modal>
    </CSSTransition>
  );
};

export default ProfileModal;
