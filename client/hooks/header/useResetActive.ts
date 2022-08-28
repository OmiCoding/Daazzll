import { useMemo, useEffect } from "react";
import debounce from "lodash.debounce";

function useResetActive() {
  const dbResize = useMemo(() => {
    function resize() {
      if (window.innerWidth < 1280) return;
    }
    return debounce(resize, 500);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", dbResize);
    return () => {
      window.removeEventListener("resize", dbResize);
    };
  }, [dbResize]);
}

export default useResetActive;
