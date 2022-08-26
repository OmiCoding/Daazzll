import React, { useState, useRef, useMemo } from "react";
import debounce from "lodash.debounce";
import HamburgerHeader from "../general/HamburgerHeader";
import HeaderNav from "../header/HeaderNav";
import useScrollAbsHeader from "../../hooks/absHeader/useScrollAbsHeader";
import HamburgerList from "../general/HamburgerList";
import useResizeAbsHeader from "../../hooks/absHeader/useResizeAbsHeader";
import "../../styles/wrappers.css";
import "../../styles/absHeader.css";
import "../../styles/general.css";

const AbsHeader: React.FC = function () {
  const [active, setActive] = useState(false);

  const headerElem = useRef<HTMLDivElement | null>(null);
  const headWrapElem = useRef<HTMLDivElement | null>(null);
  const hbWrapElem = useRef<HTMLDivElement | null>(null);

  function handleClick() {
    const htmlElem = document.documentElement;

    if (!headerElem.current || !headWrapElem.current || !hbWrapElem.current) {
      return;
    }
    if (!active) {
      htmlElem.classList.add("html-hb");
      headerElem.current.classList.add("header-wrapper-hb--open");
    } else {
      htmlElem.classList.remove("html-hb");
      headerElem.current.classList.remove("header-wrapper-hb--open");

      if (window.innerWidth > window.innerHeight) {
        headerElem.current.classList.remove("header-wrapper--ls");
        headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
        hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
      }
    }
    return setActive(!active);
  }

  const debounceMemo = useMemo(() => {
    function handleResize() {
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
        } else {
          headerElem.current.classList.remove("header-wrapper--ls");
          headWrapElem.current.classList.remove("header-hb-flex-wrapper--ls");
          hbWrapElem.current.classList.remove("hamburger-nav-wrapper--ls");
        }
      }

      // When the browser reaches a width of 1280
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

      if (active && window.innerHeight >= 1280 && orientation === "portrait") {
        document.documentElement.classList.remove("html-hb");
        headerElem.current.classList.remove(
          "header-wrapper-hb--open",
          "header-wrapper--down"
        );
        return setActive((prevState) => {
          return !prevState;
        });
      }
      return;
    }
    return debounce(handleResize, 500);
  }, [active, setActive]);

  useScrollAbsHeader(active);
  useResizeAbsHeader(
    active,
    headerElem,
    headWrapElem,
    hbWrapElem,
    debounceMemo,
    setActive
  );

  return (
    <div ref={headerElem} className="header-wrapper">
      <div className="max-wrapper">
        <div ref={headWrapElem} className="header-hb-flex-wrapper">
          <div className="header-flex-wrapper">
            <div className="logo-wrapper">
              <h1 className="logo-title">Daazzll</h1>
            </div>
            <div className="header-nav-acc-wrapper">
              <HeaderNav />
              <div className="btn-wrapper">
                <button className="login-btn">Login</button>
                <button className="sign-in-btn">Sign In</button>
              </div>
            </div>
            <HamburgerHeader
              id={"abs-header-hamburger-btn"}
              active={active}
              setActive={setActive}
              handleClick={handleClick}
            />
          </div>
          <HamburgerList ref={hbWrapElem} active={active} />
        </div>
      </div>
    </div>
  );
};

export default AbsHeader;
