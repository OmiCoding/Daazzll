import { createContext } from "react";
import { ProfileContextInit } from "../../custom-types";

const ProfileContext = createContext<ProfileContextInit>({
  init: true,
  user: false,
  descActive: false,
  username: "",
  pitch: "",
  discord: "",
  facebook: "",
  twitter: "",
  instagram: "",
  website: "",
  design: null,
  designLoad: true,
});

export default ProfileContext;
