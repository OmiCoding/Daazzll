import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import Cookies from "js-cookie";

const useAuthCheck = function () {
  const { dispatch, auth } = useAuth();
  const navigate = useNavigate();

  const check = useCallback(() => {
    const accessToken = Cookies.get("access_token");
    fetch("/checkauth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (!res.clear) {
          fetch("/logout", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((res) => {
              sessionStorage.removeItem("hallpass");
              sessionStorage.removeItem("username");
              if (dispatch) {
                dispatch({
                  type: "REMOVE_AUTH",
                });
              }
              return navigate("/login");
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        if (dispatch) {
          dispatch({
            type: "ERROR_PAGE",
          });
        }
      });
  }, [dispatch, navigate, auth]);

  useEffect(() => {
    check();
  }, [check, auth]);
};

export default useAuthCheck;
