import React, { useEffect, useMemo, useRef } from "react";
import { debounce } from "lodash";
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

  const handleResize = useMemo(() => {
    function resizeModal() {
      const currMRoot = modalRoot.current;

      if (modalActive && window.innerWidth < 1280) {
        if (currMRoot) {
          currMRoot.style.top = "" + window.scrollY + "px";
        }
      }
    }

    return debounce(resizeModal, 500);
  }, [modalActive]);

  useEffect(() => {
    const currChild = childElem.current;
    const currMRoot = modalRoot.current;
    const currRoot = root.current;
    currChild.classList.add("modal-wrapper");

    if (modalRoot && currMRoot) {
      if (currMRoot.style.top === "unset") {
        currMRoot.style.top = "0";
      }
      currMRoot.append(currChild);
    }

    if (modalActive && currMRoot && currRoot) {
      currMRoot.classList.add("display--block");
      currMRoot.style.top = "" + window.scrollY + "px";
      currRoot.classList.add("root--active");
      document.body.style.overflowY = "hidden";
    } else {
      if (currMRoot && !modalActive && currRoot) {
        currMRoot.classList.remove("display--block");
        currChild.style.height = "auto";
        document.body.style.overflowY = "auto";
        currRoot?.classList.remove("root--active");
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      if (currMRoot) {
        currMRoot.style.top = "unset";
      }
      currMRoot?.removeChild(currChild);
      currMRoot?.classList.remove("display--block");
      currChild.style.height = "auto";
      document.body.style.overflowY = "auto";
      currRoot?.classList.remove("root--active");
      window.removeEventListener("resize", handleResize);
    };
  }, [modalActive, handleResize]);

  return createPortal(children, childElem.current);
};

export default Modal;
