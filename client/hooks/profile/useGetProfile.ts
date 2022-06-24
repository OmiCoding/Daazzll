import Cookies from "js-cookie";
import { useEffect, Dispatch, SetStateAction } from "react";
import { ProfileState } from "../../custom-types";

const useGetProfile = function (
  init: boolean,
  setState: Dispatch<SetStateAction<ProfileState>>
) {
  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (init) {
      fetch("/medialinks", {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
          if (res.msg === "Unauthenticated") return;

          setState((prevState) => {
            return {
              ...prevState,
              username: res.username,
              init: false,
            };
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [init, setState]);
};

export default useGetProfile;
