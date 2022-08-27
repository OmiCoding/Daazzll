import { useMemo, useEffect, Dispatch, SetStateAction } from "react";
import debounce from "lodash.debounce";

type SetActive = Dispatch<SetStateAction<boolean>>;

function useResetActive(setActive: SetActive) {
  const dbResize = useMemo(() => {
    function resize() {
      if (window.scrollX < 1280) return;
      return setActive(false);
    }
    return debounce(resize, 500);
  }, [setActive]);

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", dbResize);
    };
  }, [setActive, dbResize]);
}

export default useResetActive;
