import React, { Dispatch, SetStateAction, useEffect } from "react";

function useResetState(setActive: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    function resetState() {
      if (window.innerWidth > 1280) {
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
