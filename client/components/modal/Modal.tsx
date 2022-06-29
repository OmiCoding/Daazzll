import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalContext {
  children: React.ReactNode;
}

const Modal: React.FC<ModalContext> = function ({ children }) {
  const el = useRef(document.createElement("div"));
  useEffect(() => {
    const current = el.current;
    const modalRoot = document.getElementById("modal-root");

    current.classList.add("modal-wrapper");

    if (modalRoot) {
      modalRoot.appendChild(current);
    }
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(current);
      }
    };
    // Appropriately add the dependency
  }, []);

  return createPortal(children, el.current);
};

export default Modal;
