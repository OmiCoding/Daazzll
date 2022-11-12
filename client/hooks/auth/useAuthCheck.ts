import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAuthCheck = function () {
  const { dispatch, auth } = useAuth();
  const navigate = useNavigate();

  const check = useCallback(() => {
    fetch("/checkauth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (!res.clear) {
          fetch("/logout", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((res) => {
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
