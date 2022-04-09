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
      if (!headerWrap) {
        return;
      }

      if (!hamburgerBtn) {
        return;
      }

      if (prevPos === 0) {
        headerWrap.classList.remove("header-wrapper--down");
      }

      if (window.scrollY > prevPos) {
        // scroll absolute header drops down.
        if (window.scrollY > 100) {
          headerWrap.classList.add("header-wrapper--down");
        }
        if (hamburgerBtn.disabled) {
          hamburgerBtn.disabled = !hamburgerBtn.disabled;
        }
      } else {
        if (document.documentElement.style.overflowY === "hidden") {
          return;
        }
        headerWrap.classList.remove("header-wrapper--down");
        if (!hamburgerBtn) {
          return;
        }

        hamburgerBtn.disabled = !hamburgerBtn.disabled;
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

    document.addEventListener("scroll", scrollDebounce(moveHeader, 1000));

    return () => {
      document.removeEventListener("scroll", scrollDebounce(moveHeader, 1000));
    };
  }, []);
}

export default scrollHeader;
