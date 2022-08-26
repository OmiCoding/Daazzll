import React, { useContext } from "react";
import { Link } from "react-router-dom";
import HeaderContext from "../../context/header/HeaderContext";
import HamburgerHeader from "./HamburgerHeader";

const arr = ["Home", "Feed", "Explore", "Login", "Register"];

function NavList() {
  const { active, setActive } = useContext(HeaderContext);

  function handleClick() {
    if (setActive) {
      return setActive();
    }
  }

  return (
    <>
      <ul className="nav__list nl--desktop">
        {arr.map((elem, i) => {
          if (i < 3) {
            return (
              <li key={elem} className="nav__list__items pad-1 nl--desktop ">
                <Link to="/" className="items__link">
                  {elem}
                </Link>
              </li>
            );
          } else {
            return (
              <li key={elem} className="nav__list__items pad-1--lr nl--desktop">
                <button className="nav-btn">{elem}</button>
              </li>
            );
          }
        })}
      </ul>
      <HamburgerHeader handleClick={handleClick} active={active} />
    </>
  );
}

export default NavList;
