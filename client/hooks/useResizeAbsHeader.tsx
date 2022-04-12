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

    function debouncer(func: Function, delay: number) {
      let debounceTimer: ReturnType<typeof setTimeout>;

      return function (this: any, ...args: any[]) {
        const ctx = this;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(ctx, args), delay);
      };
    }

    window.addEventListener("resize", debouncer(stylesOnOrientation, 500));

    return () => {
      window.removeEventListener("resize", debouncer(stylesOnOrientation, 500));
    };
  }, [active]);
}

export default useResizeAbsHeader;
