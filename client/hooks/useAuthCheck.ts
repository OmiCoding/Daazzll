import { useLayoutEffect } from "react";
import useAuth from "./useAuth";


const useAuthCheck = function() {
  const { checkAuth, auth } = useAuth();
  useLayoutEffect(() => {
    if(checkAuth && !auth) {
      checkAuth(); 
    }
    return () => {

    }
  }, [checkAuth, auth])
}


export default useAuthCheck