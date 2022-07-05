import React, { useRef, useMemo, useLayoutEffect } from "react";
import debounce from "lodash.debounce";

import MediaLinks from "./MediaLinks";

interface PFModalProps {
  modalType: string;
  active: boolean;
}

const ProfileModal: React.FC<PFModalProps> = function ({ modalType, active }) {
  const bgElem = useRef<HTMLDivElement>(null);
  let modalItem;

  if (modalType === "media-links") {
    modalItem = <MediaLinks />;
  } else if (modalType === "user-photo") {
    modalItem = "";
  } else if (modalType === "banner") {
    modalItem = "";
  } else if (modalType === "report") {
    modalItem = "";
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
    const rootElem = document.getElementById("root");

    // const modalCurr = modalRoot.current;
    // const appCurr = appRoot.current;
    // if (modalActive && modalRoot && modalCurr && appCurr) {
    //   modalCurr.classList.remove("display--none");
    //   modalCurr.style.overflow = "auto";
    //   appCurr.style.overflow = "hidden";
    // } else if (!modalActive && modalRoot && modalCurr && appCurr) {
    //   appCurr.style.overflow = "auto";
    //   modalCurr.style.overflow = "auto";
    // }

    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [active, debounceResize]);

  // add the height here on when active is true
  // find
  return (
    <div ref={bgElem} className="bg-modal-1">
      <div className="pf-modal-wrapper">
        <div className="pf-modal">{modalItem}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
