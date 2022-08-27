import { useEffect, MutableRefObject, Dispatch, SetStateAction } from "react";

type HeaderRef = MutableRefObject<HTMLHeadElement | null>;
type SetActive = Dispatch<SetStateAction<boolean>>;

function useHideHeader(
  active: boolean,
  headerRef: HeaderRef,
  setActive: SetActive,
  dbScroll: any
) {
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
