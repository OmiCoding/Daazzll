import { Dispatch, SetStateAction, useEffect, MutableRefObject } from "react";

function useResetActive(
  setActive: Dispatch<SetStateAction<boolean>>,
  headerElem: MutableRefObject<HTMLDivElement | null>,
  headWrapElem: MutableRefObject<HTMLDivElement | null>,
  hbWrapElem: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    function resetState() {
      console.log("Hello???");
      if (window.innerWidth >= 1280) {
        console.log("goodbye");
        if (
          !headerElem.current ||
          !headWrapElem.current ||
          !hbWrapElem.current
        ) {
          return;
        }

        headerElem.current.classList.remove(
          "header-wrapper-hb--open",
          "header-wrapper--down"
        );
        headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
        hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
        return setActive(false);
      } else {
        return;
      }
    }

    function debouncer(func: () => void, delay: number) {
      let debouncerTimer: ReturnType<typeof setTimeout>;

      return function (this: any, ...args: []) {
        let ctx = this;

        clearTimeout(debouncerTimer);

        debouncerTimer = setTimeout(() => func.apply(ctx, args), delay);
      };
    }

    window.addEventListener("resize", debouncer(resetState, 500));

    return () => {
      window.removeEventListener("resize", debouncer(resetState, 500));
    };
  }, [setActive]);
}

export default useResetActive;
