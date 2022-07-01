import React, { useRef, useMemo, useLayoutEffect } from "react";
import debounce from "lodash.debounce";

import MediaLinks from "./MediaLinks";

interface PFModalProps {
  modalType: string;
  modalActive: boolean;
}

const ProfileModal: React.FC<PFModalProps> = function ({
  modalType,
  modalActive,
}) {
  const modalRoot = useRef(document.getElementById("modal-root"));
  const appRoot = useRef(document.getElementById("root"));

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
    const modalCurr = modalRoot.current;
    const appCurr = appRoot.current;
    if (modalActive && modalRoot && modalCurr && appCurr) {
      modalCurr.classList.remove("display--none");
      modalCurr.style.overflow = "auto";
      appCurr.style.overflow = "hidden";
    } else if (!modalActive && modalRoot && modalCurr && appCurr) {
    }

    window.addEventListener("resize", debounceResize);

    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, [modalActive, debounceResize]);

  return (
    <div className="bg-modal-1">
      <div className="pf-modal-wrapper">
        <div className="pf-modal">{modalItem}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
