import React, { useContext, useRef, useMemo } from "react";
import debounce from "lodash.debounce";
import HeaderContext from "../../context/header/HeaderContext";
import useHideHeader from "../../hooks/header/useHideHeader";
import useResetActive from "../../hooks/header/useResetActive";

import HeaderContent from "../header/HeaderContent";
import "../../styles/header/header.css";

function Header() {
  const { active, setActive } = useContext(HeaderContext);

  const headerRef = useRef<HTMLHeadElement>(null);

  function handleHB() {
    if (!headerRef) return;
    const curr = headerRef.current;

    if (!curr) return;
    if (!setActive) return;
    if (!active) {
      window.removeEventListener("scroll", dbScroll);
    }

    if (!active) {
      curr.classList.add()
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "visible";
      document.body.style.overflowY = "visible";
    }

    return setActive();
  }

  const dbScroll = useMemo(() => {
    let scrollPos = 0;

    function scroll() {

      const curr = headerRef.current;
      let scrollDir = "";
      if (!curr) return;
      if (scrollPos - window.scrollY < 0) {
        scrollDir = "scrollDown";
        scrollPos = window.scrollY;
      } else {
        scrollDir = "scrollUp";
        scrollPos = window.scrollY;
      }

      if (window.scrollY === 0 && scrollDir === "scrollUp") {
        curr.classList.remove("header--hide", "header--shadow");
      }

      if (window.scrollY >= 50 && scrollDir === "scrollDown") {
        curr.classList.add("header--hide");
        curr.classList.remove("header--shadow");
      }

      if (window.scrollY >= 50 && scrollDir === "scrollUp") {
        curr.classList.add("header--shadow");
        curr.classList.remove("header--hide");
      }
    }

    return debounce(scroll, 500);
  }, [headerRef]);

  useHideHeader(headerRef, dbScroll);
  useResetActive();

  return (
    <header ref={headerRef} className="header">
      <div className="header-wrapper">
        <HeaderContent handleHB={handleHB} />
      </div>
    </header>
  );
}

export default Header;
