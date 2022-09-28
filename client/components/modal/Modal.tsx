import React, { useEffect, useRef } from "react";
import useApp from "../../hooks/general/useApp";
import { createPortal } from "react-dom";

interface ModalContext {
  children: React.ReactNode;
}

const Modal: React.FC<ModalContext> = function ({ children }) {
  const childElem = useRef(document.createElement("div"));
  const modalRoot = useRef(document.getElementById("modal-root"));
  const root = useRef(document.getElementById("root"));
  const { modalActive } = useApp();

  useEffect(() => {
    const currChild = childElem.current;
    const currMRoot = modalRoot.current;
    const currRoot = root.current;
    currChild.classList.add("modal-wrapper");

    if (modalRoot && currMRoot) {
      currMRoot.append(currChild);
    }

    if (modalActive && currMRoot && currRoot) {
      currMRoot.classList.add("display--block");
      // currMRoot.style.top = "" + window.scrollY + "px";
      currRoot.classList.add("root--active");
      // document.body.style.overflowY = "hidden";
    } else {
      if (currMRoot && !modalActive && currRoot) {
        // currRoot.style.top = "0px";
        currMRoot.classList.remove("display--block");
        currChild.style.height = "auto";
        document.body.style.overflowY = "auto";
        currRoot?.classList.remove("root--active");
      }
    }

    return () => {
      if (currRoot) {
        // currRoot.style.top = "0px";
      }
      currMRoot?.removeChild(currChild);
      currMRoot?.classList.remove("display--block");
      currChild.style.height = "auto";
      document.body.style.overflowY = "auto";
      currRoot?.classList.remove("root--active");
    };
  }, [modalActive]);

  return createPortal(children, childElem.current);
};

export default Modal;
