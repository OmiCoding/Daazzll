import React, { useRef } from "react";
import useAsideMenu from "../../hooks/aside/useAsideMenu";
import AsideNav from "./AsideNav";

import "../../styles/header/header-nav.css";
import "../../styles/aside/aside.css";

function Aside() {
  const asideRef = useRef<HTMLDivElement>(null);

  useAsideMenu(asideRef);

  return (
    <div ref={asideRef} className="aside-wrapper">
      <div className="aside-bg">
        <aside className="aside">
          <div className="acc-btn-wrapper">
            <div className="icon-wrapper">
              <i className="fa-solid fa-user user-icon" />
            </div>
            <p className="login-title">My profile</p>
            <button></button>
          </div>
          <AsideNav />
        </aside>
      </div>
    </div>
  );
}

export default Aside;
