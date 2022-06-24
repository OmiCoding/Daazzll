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
          setState((prevState) => {
            return {
              ...prevState,
              init: false,
            };
          });
        })
        .catch((err) => {
          setState((prevState) => {
            return {
              ...prevState,
              init: false,
            };
          });
        });
    }
  }, [init, setState]);
};

export default useGetProfile;
