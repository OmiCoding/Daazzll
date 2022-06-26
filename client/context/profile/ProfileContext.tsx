import { createContext } from "react";
import { ProfileContextInit } from "../../custom-types";

const ProfileContext = createContext<ProfileContextInit>({
  init: true,
  user: false,
  descActive: false,
  username: "",
  pitch: "",
});

export default ProfileContext;
