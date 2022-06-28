import { useEffect } from "react";
import useProfile from "./useProfile";

const useGetProfile = function () {
  const { getProfile } = useProfile();

  useEffect(() => {
    if (getProfile) {
      getProfile();
    }
  }, [getProfile]);
};

export default useGetProfile;
