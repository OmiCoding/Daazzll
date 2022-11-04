import React from "react";
import { CSSTransition } from "react-transition-group";
import useApp from "../../../../hooks/general/useApp";

import MediaLinksForm from "./MediaLinksForm";

const MediaLinks = function () {
  const { closeModal, modalActive } = useApp();
  return (
    <div className="bg-modal-2">
      <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
      >
        <div className="modal-wrapper-2 medialinks-wrapper">
          <div className="mdl-btn-wrapper">
            <button className="mdl__cls-btn" onClick={(e) => closeModal!(e)}>
              Close
            </button>
          </div>
          <div className="ml-split-wrapper">
            <MediaLinksForm />
          </div>
        </div>
    </CSSTransition>
    </div>
  );
};

export default MediaLinks;
