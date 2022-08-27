import React, { useState, useRef, useMemo } from "react";
import debounce from "lodash.debounce";
import HeaderContent from "../header/HeaderContent";
import "../../styles/header/header.css";

import useHideHeader from "../../hooks/header/useHideHeader";
import useResizeHeader from "../../hooks/general/useResizeHeader";

function Header() {
  const [active, setActive] = useState(false);

  const headerRef = useRef<HTMLHeadElement>(null);

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

  const handleClick = function () {
    const curr = headerRef.current;

    if (!curr) return;
    if (!active) {
      window.removeEventListener("scroll", dbScroll);
    }

    return setActive(!active);
  };

  useHideHeader(active, headerRef, setActive, dbScroll);
  useResizeHeader(active, setActive);

  return (
    <header ref={headerRef} className="header">
      <div className="header-wrapper">
        <HeaderContent handleClick={handleClick} active={active} />
      </div>
    </header>
  );
}

export default Header;
