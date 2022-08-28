import { useEffect, useContext, RefObject } from "react";
import HeaderContext from "../../context/header/HeaderContext";

function useAsideMenu(asideRef: RefObject<HTMLDivElement>) {
  const { active } = useContext(HeaderContext);

  useEffect(() => {
    const curr = asideRef.current;
    if (curr) {
      if (active) {
        curr.classList.add("aside--active");
      } else {
        curr.classList.remove("aside--active");
      }
    }
  }, [active, asideRef]);
}

export default useAsideMenu;
