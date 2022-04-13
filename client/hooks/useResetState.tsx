import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  MutableRefObject,
} from "react";

function useResetState(
  setActive: Dispatch<SetStateAction<boolean>>,
  headerElem: MutableRefObject<HTMLDivElement | null>,
  headWrapElem: MutableRefObject<HTMLDivElement | null>,
  hbWrapElem: MutableRefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    function resetState() {
      if (window.innerWidth >= 1280) {
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

    function debouncer(func: Function, delay: number) {
      let debouncerTimer: ReturnType<typeof setTimeout>;

      return function (this: any, ...args: any[]) {
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

export default useResetState;
