import debounce from "lodash.debounce";
import { useMemo, useEffect, Dispatch, SetStateAction } from "react";
import { HeaderState } from "../../custom-types";

const useResizeHeader = function (
  active: boolean,
  setState: Dispatch<SetStateAction<HeaderState>>
) {
  const debouncer = useMemo(() => {
    const resize = function () {
      if (!active) return;
      if (window.innerWidth >= 1280 && active === true) {
        setState((prevState) => {
          return {
            ...prevState,
            active: false,
          };
        });
      }
    };
    return debounce(resize, 500);
  }, [active, setState]);

  useEffect(() => {
    window.addEventListener("resize", debouncer);

    return () => {
      window.removeEventListener("resize", debouncer);
    };
  }, [active, debouncer]);
};

export default useResizeHeader;
