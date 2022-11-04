import {useEffect, useMemo} from "react";
import debounce from "lodash.debounce";
import useApp from "./useApp";

const useResize = function() {
  const { resize, handleResize } = useApp();

  const listener = useMemo(() => {
    const debouncer = function() {
      console.log(resize);
      if(window.innerWidth < 1280 && resize !== "mobile") {
        if(handleResize) {
          handleResize("mobile");
        }
      } 
      if(window.innerWidth >= 1280 && resize !== "desktop") {
        if(handleResize) {
          handleResize("desktop");
        }
      }
    }
    return debounce(debouncer, 500);
  }, [resize, handleResize]);

  useEffect(() => {
    if(window.innerWidth < 1280 && resize !== "mobile") {
      if(handleResize) {
        handleResize("mobile");
      }
    } 
    if(window.innerWidth >= 1280 && resize !== "desktop") {
      if(handleResize) {
        handleResize("desktop");
      }
    }
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [resize, listener, handleResize]);
}

export default useResize;