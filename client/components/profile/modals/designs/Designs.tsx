import React from "react";
import { CSSTransition } from "react-transition-group";

import useApp from "../../../../hooks/general/useApp";
import DesignsContent from "./DesignsContent";
import "../../../../styles/profile/design-modal.css";

const Designs = function () {
  const { modalActive, design } = useApp();

  return (
    <CSSTransition
      in={modalActive}
      appear={true}
      timeout={300}
      classNames="mdlAnim"
      unmountOnExit
    >
      <div className="modal-wrapper-3">
        <DesignsContent design={design} />
      </div>
    </CSSTransition>
  );
};

export default Designs;
