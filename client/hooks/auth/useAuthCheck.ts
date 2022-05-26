import { useLayoutEffect, useCallback } from "react";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useAuthCheck = function() {
  const { dispatch, auth } = useAuth();
  const check = useCallback(() => {
    const accessToken = Cookies.get("access_token");
    fetch("https://daazzll.local:8433/checkauth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.status)
      .then((res) => {
        if (res === 200) {
          if(dispatch && !auth) {
            dispatch({
              type: "CHECK_AUTH",
            });
            sessionStorage.setItem("hallpass", JSON.stringify({ pass: true }));
          } 
        } else {
          sessionStorage.removeItem("hallpass");
          if(dispatch && auth) {
            dispatch({
              type: "REMOVE_AUTH"
            })
          }
        }
        
      })
      .catch((err) => {
        if(dispatch) {
          dispatch({
            type: "ERROR_PAGE",
          });
        }
      });
  }, [dispatch, auth])
  
  useLayoutEffect(() => {
    check();
  }, [check])


}



export default useAuthCheck