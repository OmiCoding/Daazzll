import React, { ReactNode, useReducer } from "react";
import Cookies from "js-cookie";

import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";

import ProfileContext from "./ProfileContext";
import profileReducer from "./profileReducer";
import { GET_PROFILE, PROFILE_DATA } from "./cases";

interface ProviderProps {
  children: ReactNode;
}

const ProfileProvider: React.FC<ProviderProps> = function ({ children }) {
  const [state, dispatch] = useReducer<
    ProfileReducer<ProfileContextInit, Action>
  >(profileReducer, {
    init: true,
    user: false,
    descActive: false,
    username: "",
    pitch: "",
  });

  function getProfileData() {
    const accessToken = Cookies.get("access_token");
    fetch("/profile_data", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch({
          type: PROFILE_DATA,
          data: res,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getProfile() {
    const accessToken = Cookies.get("access_token");
    fetch("/profiles/:username", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        dispatch({
          type: GET_PROFILE,
          data: res,
        });
      })
      .catch((err) => console.error(err));
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileData,
        getProfile,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;