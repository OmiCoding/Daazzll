import loadable from "@loadable/component";
import React from "react";
import Loading from "../components/general/Loading";

import "../styles/profile/profile.css";

const Profile = loadable(() => import("../components/profile/ProfileContext"), {
  fallback: <Loading />,
});
export default Profile;
