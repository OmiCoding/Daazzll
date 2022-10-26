import React, { useEffect, useRef, useMemo } from "react";
import { debounce } from "lodash";
import { CSSTransition } from "react-transition-group";

import useApp from "../../../../hooks/general/useApp";
import DesignsContent from "./DesignsContent";
import "../../../../styles/profile/design-modal.css";

const Designs = function () {
  const { closeModal, modalActive, design } = useApp();


  const wrapElem = useRef<HTMLDivElement>(null);

  const handleResize = useMemo(() => {
    function dbResize() {
      const currElem = wrapElem.current;
      console.log(window.innerWidth);

      if (window.innerWidth < 1280 && modalActive) {
        if (currElem) {
          currElem.style.top = "0";
        }
      } else if (window.innerWidth > 1280) {
        if (currElem) {
          currElem.style.top = "0";
        }
      }
    }
    return debounce(dbResize, 500);
  }, [modalActive]);

  useEffect(() => {
    const currElem = wrapElem.current;
    if (currElem && window.innerWidth > 1280) {
      currElem.style.top = "" + window.scrollY + "px";
    }

    window.addEventListener("resize", handleResize);
    return () => {
      if (currElem) {
        currElem.style.top = "0";
      }

      window.removeEventListener("resize", handleResize);
    };
  }, [wrapElem, handleResize]);

  return (
    <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
    >
      <div ref={wrapElem} className="modal-wrapper-3">
        {/* <div className="mdl-btn-wrapper">
          <button className="mdl__cls-btn" onClick={(e) => closeModal!(e)}>
            Close
          </button>
        </div> */}
        <DesignsContent design={design} />
      </div>
    </CSSTransition>
  );
};

export default Designs;
