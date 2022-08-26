import debounce from "lodash.debounce";
import { MutableRefObject, useMemo, useEffect } from "react";

type HeaderRef = MutableRefObject<HTMLHeadElement | null>;

function useHideHeader(headerRef: HeaderRef, active: boolean) {
  const dbScroll = useMemo(() => {
    function scroll() {
      console.log(window.scrollY);
    }

    return debounce(scroll, 500);
  }, []);

  if (!active) {
  }
  useEffect(() => {
    window.addEventListener("scroll", dbScroll);
    return () => {
      window.removeEventListener("scroll", dbScroll);
    };
  }, [headerRef, dbScroll]);
}

export default useHideHeader;
