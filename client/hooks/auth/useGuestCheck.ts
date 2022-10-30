import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useGuestCheck = function () {
  const { dispatch, auth, username } = useAuth();
  const navigate = useNavigate();

  const check = useCallback(() => {
    fetch("/passGuest", {
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
          navigate(`/${username}`);
        }
      })
      .catch((err) => {
        console.error(err);
        if (dispatch) {
          dispatch({
            type: "ERROR_PAGE",
          });
        }
      });
  }, [dispatch, navigate, username]);

  useEffect(() => {
    if (window.app.auth) {
      navigate(`/${username}`);
    }


    if (auth) {
      check();
    }
  }, [navigate, check, auth, username]);
};

export default useGuestCheck;
