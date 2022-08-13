import React from "react";
import { CSSTransition } from "react-transition-group";

import useApp from "../../../../hooks/general/useApp";

const Designs = function () {
  const { closeModal, modalActive } = useApp();

  return (
    <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
    >
      <div className="modal-wrapper-2">
        <div className="mdl-btn-wrapper">
          <button className="mdl__cls-btn" onClick={(e) => closeModal!(e)}>
            Close
          </button>
        </div>
        <div className=""></div>
      </div>
    </CSSTransition>
  );
};

export default Designs;
