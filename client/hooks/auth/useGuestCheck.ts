import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useGuestCheck = function () {
  const { dispatch, auth, username } = useAuth();
  const navigate = useNavigate();

  const check = useCallback(() => {
    fetch("/checkGuest", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json()
      )
      .then((res) => {
        if (!res.clear) {
          navigate(`/${username}`);
        }
      })
      .catch((err) => {
        if (dispatch) {
          dispatch({
            type: "ERROR_PAGE",
          });
        }
      });
  }, [dispatch, navigate, username]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.app.auth) {
      navigate(`/${username}`);
    }

    console.log(auth);
    if (auth) {
      check();
    }
  }, [navigate, check, auth, username]);
};

export default useGuestCheck;
