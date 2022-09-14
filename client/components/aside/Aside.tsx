import React, { useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAsideMenu from "../../hooks/aside/useAsideMenu";
import AsideNav from "./AsideNav";

import "../../styles/header/header-nav.css";
import "../../styles/aside/aside.css";
import HeaderContext from "../../context/header/HeaderContext";

function Aside() {
  const { active, setActive } = useContext(HeaderContext);
  const navigate = useNavigate();
  const asideRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useAsideMenu(asideRef);

  function handleClick() {
    navigate("/login");
    if (setActive) {
      return setActive();
    }
  }

  useEffect(() => {
    const curr = bgRef.current;
    const awCurr = asideRef.current;
    if (active && curr && awCurr) {
      // const scrollY = window.scrollY;
      awCurr.classList.remove("aw--hide");
      curr.classList.remove("aside-bg--invis");
      curr.classList.add("aside-bg--active");
      // awCurr.style.top = `${scrollY}px`;
    } else {
      if (curr && awCurr) {
        curr.classList.remove("aside-bg--active");
        curr.classList.add("aside-bg--invis");
        awCurr.classList.add("aw--hide");
        // awCurr.style.top = "80px";
      }
    }
  }, [active]);

  return (
    <div ref={asideRef} className="aside-wrapper">
      <div className="aside-bg-wrapper">
        <div ref={bgRef} className="aside-bg aside-bg--invis" />
        <aside className="aside">
          <div className="acc-btn-wrapper">
            <div className="icon-wrapper">
              <i className="fa-solid fa-user user-icon" />
            </div>
            <p className="login-title">My profile</p>
            <button className="al__btns-abs" onClick={() => handleClick()} />
          </div>
          <AsideNav />
        </aside>
      </div>
    </div>
  );
}

export default Aside;
