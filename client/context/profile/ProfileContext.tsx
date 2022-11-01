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
  avatar: "",
  banner: "",
  activeImg: "",
  design: null,
  designLoad: true,
  designs: [],
  count: 0,
  submit: false,
});

export default ProfileContext;
