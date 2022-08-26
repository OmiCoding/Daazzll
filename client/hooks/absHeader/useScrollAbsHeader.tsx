import { useEffect } from "react";

function useScrollAbsHeader(active: boolean) {
  useEffect(() => {
    let prevPos = window.scrollY;

    if (prevPos > 150) {
      const headerElem = document.querySelector(".header-wrapper");

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

    const debouncer = (func: any, delay: number) => {
      let debounceTimer: ReturnType<typeof setTimeout>;

      // the event listener calls this inner function
      // the event listener context is given to this inner function, and arguments that are passed to it
      return function (this: any, ...args: []) {
        // this will clear out the setTimeout each time the listener calls the inner function.
        clearTimeout(debounceTimer);

        // the setTimeout is scoped within the eventlistener scope
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
      };

      // the last call of this debouncer will be what is used.
    };

    window.addEventListener("scroll", debouncer(moveHeader, 500));

    return () => {
      window.removeEventListener("scroll", debouncer(moveHeader, 500));
    };
  }, [active]);
}

export default useScrollAbsHeader;
