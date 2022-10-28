import React, { useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useApp from "../../../../hooks/general/useApp";

import MediaLinksForm from "./MediaLinksForm";

const MediaLinks = function () {
  const { closeModal, modalActive } = useApp();

  const wrapElem = useRef<HTMLDivElement>(null);

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
      <div ref={wrapElem} className="modal-wrapper-2 medialinks-wrapper">
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
  );
};

export default MediaLinks;
