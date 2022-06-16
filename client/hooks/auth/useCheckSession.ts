import { useLayoutEffect } from "react"
import useAuth from "./useAuth";


function useCheckSession() {
  const { dispatch } = useAuth();
  useLayoutEffect(() => {
    const item = sessionStorage.getItem("hallpass");
    if(item && dispatch) {
      dispatch({
        type: "CHECK_AUTH"
      })
    }
    
  }, [dispatch]);
}



export default useCheckSession