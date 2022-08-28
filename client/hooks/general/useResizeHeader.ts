import debounce from "lodash.debounce";
import { useMemo, useEffect } from "react";

const useResizeHeader = function (
  active: boolean,
  setActive: () => void | undefined
) {
  const debouncer = useMemo(() => {
    const resize = function () {
      if (!active) return;
      if (window.innerWidth >= 1280 && active === true) {
        setActive();
      }
    };
    return debounce(resize, 100);
  }, [active, setActive]);

  useEffect(() => {
    window.addEventListener("resize", debouncer);

    return () => {
      window.removeEventListener("resize", debouncer);
    };
  }, [active, debouncer]);
};

export default useResizeHeader;
