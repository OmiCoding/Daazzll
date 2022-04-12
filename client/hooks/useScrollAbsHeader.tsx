import { useEffect } from "react";

function scrollHeader() {
  useEffect(() => {
    let prevPos = window.scrollY;

    if (prevPos > 150) {
      let headerElem = document.querySelector(".header-wrapper");

      if (headerElem) {
        headerElem.classList.add("header-wrapper--down");
      }
    }

    function moveHeader() {
      const headerWrap = document.querySelector(".header-wrapper");
      const hamburgerBtn = document.getElementById(
        "abs-header-hamburger-btn"
      ) as HTMLButtonElement | null;

      const activeNavList = document.querySelector(
        ".hamburger-nav-wrapper--appear"
      );

      const scrollPos = window.scrollY;

      if (!headerWrap) {
        return;
      }

      if (!hamburgerBtn) {
        return;
      }

      if (prevPos === 0) {
        headerWrap.classList.remove("header-wrapper--down");
      }

      if (scrollPos > prevPos) {
        // scroll absolute header drops down.
        if (scrollPos > 150) {
          headerWrap.classList.remove("header-wrapper--down");
        }
        if (!hamburgerBtn.disabled) {
          hamburgerBtn.disabled = !hamburgerBtn.disabled;
        }
      } else if (scrollPos < prevPos) {
        if (activeNavList) {
          return;
        }

        if (scrollPos < 150) {
          headerWrap.classList.remove("header-wrapper--down");
          hamburgerBtn.disabled = true;
          prevPos = scrollPos;
          return;
        }
        headerWrap.classList.add("header-wrapper--down");
        hamburgerBtn.disabled = false;
      } else if (scrollPos > 150 && scrollPos === prevPos) {
        headerWrap.classList.add("header-wrapper--down");
      }

      prevPos = window.scrollY;
    }

    const scrollDebounce = (func: Function, delay: number) => {
      let debounceTimer: ReturnType<typeof setTimeout>;

      return function (this: any, ...args: any[]) {
        const context = this;

        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
      };
    };

    document.addEventListener("scroll", scrollDebounce(moveHeader, 500));

    return () => {
      document.removeEventListener("scroll", scrollDebounce(moveHeader, 500));
    };
  }, []);
}

export default scrollHeader;
