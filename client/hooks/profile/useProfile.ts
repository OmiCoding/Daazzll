import { useContext } from "react";
import ProfileContext from "../../context/profile/ProfileContext";

const useProfile = function () {
  return useContext(ProfileContext);
};

export default useProfile;
