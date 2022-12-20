import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerHeader from "./HamburgerHeader";
import "../../styles/header/header-nav.css";
import { HeaderProps } from "../../custom-types";
import HeaderContext from "../../context/header/HeaderContext";

import useAuth from "../../hooks/auth/useAuth";
import useApp from "../../hooks/general/useApp";

const arr = ["Login", "Register", "Logout"];

const HeaderNav: React.FC<HeaderProps> = function ({ handleHB }) {
  const { location } = useApp();
  const { auth, username, logout } = useAuth();

  const { resetActive } = useContext(HeaderContext);

  const navigate = useNavigate();

  function handleClick(url: string) {
    if (resetActive) {
      resetActive();
    }
    return navigate(`/${url}`);
  }

  async function handleLogout() {
    if (logout) {
      logout();
    }
    navigate("/login");
  }

  return (
    <nav className="header-nav">
      {arr.length > 0 ? (
        <ul className="nav__list nl--desktop">
          {arr.map((elem, i) => {
            if (!auth && elem !== "Logout") {
              return (
                <li
                  key={elem}
                  className="nav__list__items pad-1--lr nl--desktop"
                >
                  <button
                    onClick={() => handleClick(elem.toLowerCase())}
                    className="nav-btn"
                  >
                    {elem}
                  </button>
                </li>
              );
            }
            if (auth && elem === "Logout") {
              return (
                <li
                  key="logout"
                  className="nav_list_items pad-1--1r nl--desktop"
                >
                  <button className="nav-btn" onClick={() => handleLogout()}>
                    {elem}
                  </button>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        ""
      )}

      <HamburgerHeader handleHB={handleHB} />
    </nav>
  );
};

export default HeaderNav;
