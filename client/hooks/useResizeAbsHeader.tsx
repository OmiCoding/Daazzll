import React, { useEffect, MutableRefObject } from "react";

function useResizeAbsHeader(
  active: boolean,
  headerElem: MutableRefObject<HTMLDivElement | null>,
  headWrapElem: MutableRefObject<HTMLDivElement | null>,
  hbWrapElem: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    function stylesOnOrientation() {
      const orientation =
        window.innerWidth > window.innerHeight ? "landscape" : "portrait";

      if (!headerElem.current || !headWrapElem.current || !hbWrapElem.current) {
        return;
      }

      if (active) {
        if (orientation === "landscape") {
          console.log("howdy");
          headerElem.current.classList.add("header-wrapper--ls");
          headWrapElem.current.classList.add("header-hb-flex-wrapper--ls");
          hbWrapElem.current.classList.add("hamburger-nav-wrapper--ls");
        } else {
          headerElem.current.classList.remove("header-wrapper--ls");
          headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
          hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
        }
      }

      return;
    }

    window.addEventListener("resize", stylesOnOrientation);

    return () => {
      window.removeEventListener("resize", stylesOnOrientation);
    };
  }, [active]);
}

export default useResizeAbsHeader;
