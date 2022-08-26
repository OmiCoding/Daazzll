import debounce from "lodash.debounce";
import { useMemo, useEffect, Dispatch, SetStateAction } from "react";

const useResizeHeader = function (
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
) {
  const debouncer = useMemo(() => {
    const resize = function () {
      if (!active) return;
      if (window.innerWidth >= 1280 && active === true) {
        setActive(() => {
          return !active;
        });
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
