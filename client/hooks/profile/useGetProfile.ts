import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProfile from "./useProfile";

const useGetProfile = function () {
  const { username } = useParams();

  const { getProfile } = useProfile();

  useEffect(() => {
    if (getProfile) {
      if (username) {
        getProfile(username);
      }
    }
  }, [username, getProfile]);
};

export default useGetProfile;
