import { useContext, useEffect, MutableRefObject } from "react";

import HeaderContext from "../../context/header/HeaderContext";

type HeaderRef = MutableRefObject<HTMLHeadElement | null>;

function useHideHeader(headerRef: HeaderRef, dbScroll: any) {
  const { active } = useContext(HeaderContext);

  useEffect(() => {
    if (!active) {
      window.addEventListener("scroll", dbScroll);
    }

    if (active) {
    }
    return () => {
      window.removeEventListener("scroll", dbScroll);
    };
  }, [headerRef, dbScroll, active]);
}

export default useHideHeader;
