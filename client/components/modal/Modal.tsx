import React, { useEffect, useRef } from "react";
import useApp from "../../hooks/general/useApp";
import { createPortal } from "react-dom";

interface ModalContext {
  children: React.ReactNode;
}

const Modal: React.FC<ModalContext> = function ({ children }) {
  const childElem = useRef(document.createElement("div"));
  const modalRoot = useRef(document.getElementById("modal-root"));

  const { modalActive } = useApp();

  useEffect(() => {
    const currChild = childElem.current;
    const currRoot = modalRoot.current;

    currChild.classList.add("modal-wrapper");

    if (modalRoot && currRoot) {
      currRoot.append(currChild);
    }

    if (modalActive && currRoot) {
      currRoot.classList.add("display--block");
      document.body.style.overflowY = "hidden";
    } else {
      if (currRoot && !modalActive) {
        currRoot.classList.remove("display--block");
        currChild.style.height = "auto";
        document.body.style.overflowY = "auto";
      }
    }

    return () => {
      currRoot?.removeChild(currChild);
      currRoot?.classList.remove("display--block");
      currChild.style.height = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [modalActive]);

  return createPortal(children, childElem.current);
};

export default Modal;
