import React, {
  useMemo,
  useEffect,
  useRef,
  Dispatch,
  MouseEvent,
  SetStateAction,
} from "react";
import { NavLink } from "react-router-dom";

import debounce from "lodash.debounce";

interface ListProps {
  list: string;
  setList: Dispatch<SetStateAction<string>>;
  handleList: (e: MouseEvent<HTMLAnchorElement>, str: string) => void;
}

const NavList: React.FC<ListProps> = function ({ list, setList, handleList }) {
  const bgElem = useRef<HTMLDivElement>(null);

  const debouncer = useMemo(() => {
    const resize = function () {
      const curr = bgElem.current;
      if (!curr) return;

      const listItems =
        document.querySelectorAll<HTMLLIElement>(".design__list-item");
      if (window.innerWidth >= 320) {
        if (list === "Gifs") {
          curr.style.left = "" + listItems[0].offsetLeft + "px";
        } else if (list === "Shorts") {
          curr.style.left = "" + listItems[1].offsetLeft + "px";
        } else if (list === "Videos") {
          curr.style.left = "" + listItems[2].offsetLeft + "px";
        }
      }
    };

    return debounce(resize, 100);
  }, [list]);

  useEffect(() => {
    const curr = bgElem.current;
    if (!curr) return;

    const listItems =
      document.querySelectorAll<HTMLLIElement>(".design__list-item");

    for (let i = 0; i < listItems.length; i++) {
      if (list === listItems[i].innerText) {
        curr.style.left = "" + listItems[i].offsetLeft + "px";
        curr.style.width = "" + listItems[i].clientWidth + "px";
      }
    }
    window.addEventListener("resize", debouncer);

    return () => {
      window.removeEventListener("resize", debouncer);
    };
  }, [list, debouncer]);

  return (
    <nav className="design-nav">
      <ul className="design__nav-list">
        <div ref={bgElem} className="bg-active-link" />
        <li className="design__list-item">
          <NavLink
            to="#gifs"
            className={`${
              list === "Gifs"
                ? "design-link design-link--active"
                : "design-link design-link--unactive"
            }`}
            onClick={(e) => handleList(e, "Gifs")}
          >
            Gifs
          </NavLink>
        </li>
        <li className="design__list-item">
          <NavLink
            to="#shorts"
            className={`${
              list === "Shorts"
                ? "design-link design-link--active"
                : "design-link design-link--unactive"
            }`}
            onClick={(e) => handleList(e, "Shorts")}
          >
            Shorts
          </NavLink>
        </li>
        <li className="design__list-item">
          <NavLink
            to="#videos"
            className={`${
              list === "Videos"
                ? "design-link design-link--active"
                : "design-link design-link--unactive"
            }`}
            onClick={(e) => handleList(e, "Videos")}
          >
            Videos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavList;
