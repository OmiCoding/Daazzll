import { useEffect, MutableRefObject, Dispatch, SetStateAction } from "react";

function useResizeAbsHeader(
  active: boolean,
  headerElem: MutableRefObject<HTMLDivElement | null>,
  headWrapElem: MutableRefObject<HTMLDivElement | null>,
  hbWrapElem: MutableRefObject<HTMLDivElement | null>,
  debounceMemo: any,
  setActive: Dispatch<SetStateAction<boolean>>
) {
  useEffect(() => {
    console.log();
    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    if (!headerElem.current || !headWrapElem.current || !hbWrapElem.current) {
      return;
    }
    if (active) {
      if (orientation === "landscape") {
        if (window.innerWidth <= 1280) {
          headerElem.current.classList.add("header-wrapper--ls");
          headWrapElem.current.classList.add("header-hb-flex-wrapper--ls");
          hbWrapElem.current.classList.add("hamburger-nav-wrapper--ls");
        }
      }
    }

    // When the browser reaches a width of 1280
    // Check here
    if (active && window.innerWidth >= 1280 && orientation === "landscape") {
      document.documentElement.classList.remove("html-hb");
      headerElem.current.classList.remove(
        "header-wrapper-hb--open",
        "header-wrapper--down",
        "header-wrapper--ls"
      );
      headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
      hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
      return setActive((prevState) => {
        return !prevState;
      });
    }

    window.addEventListener("resize", debounceMemo);

    return () => {
      window.removeEventListener("resize", debounceMemo);
    };
  }, [active, setActive, debounceMemo]);
}

export default useResizeAbsHeader;
