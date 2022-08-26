import debounce from "lodash.debounce";
import { MutableRefObject, useMemo, useEffect } from "react";

type HeaderRef = MutableRefObject<HTMLHeadElement | null>;

function useHideHeader(headerRef: HeaderRef, active: boolean) {
  const dbScroll = useMemo(() => {
    function scroll() {
      const curr = headerRef.current;
      if (!curr) return;

      console.log(curr);
      if (window.scrollY >= 900) {
        curr.classList.add(".header--hide");
      }
    }

    return debounce(scroll, 500);
  }, [headerRef]);

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
