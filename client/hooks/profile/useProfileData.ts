import { useEffect } from "react";

import useProfile from "./useProfile";

const useProfileData = function () {
  const { getProfileData } = useProfile();

  useEffect(() => {
    if (getProfileData) {
      getProfileData();
    }

    return;
  }, [getProfileData]);
};

export default useProfileData;
