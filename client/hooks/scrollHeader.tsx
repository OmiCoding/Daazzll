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
      const elem = document.querySelector(".header-wrapper");

      if (!elem) {
        return;
      }

      if (prevPos === 0) {
        elem.classList.remove("header-wrapper--down");
      }

      if (window.scrollY > prevPos) {
        if (window.scrollY > 100) {
          elem.classList.add("header-wrapper--down");
        }
      } else {
        elem.classList.remove("header-wrapper--down");
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
