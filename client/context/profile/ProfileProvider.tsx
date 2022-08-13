import React, { ReactNode, useReducer, useCallback } from "react";
import Cookies from "js-cookie";

import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";

import ProfileContext from "./ProfileContext";
import profileReducer from "./profileReducer";
import { GET_PROFILE, PROFILE_DATA, SET_LINK } from "./cases";

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
    discord: "",
    twitter: "",
    facebook: "",
    instagram: "",
    website: "",
  });

  const getProfileData = useCallback(() => {
    const accessToken = Cookies.get("access_token");
    fetch("/profileData", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.msg === "Unauthenticated.") return;
        dispatch({
          type: PROFILE_DATA,
          data: res,
        });
      })
      .catch((err) => {
        console.log(state);
        console.error(err);
      });
  }, []);

  const getProfile = useCallback((username: string) => {
    const accessToken = Cookies.get("access_token");
    fetch(`/profile/${username}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_PROFILE,
          data: res,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  const setLink = function (name: string, link: string) {
    dispatch({
      type: SET_LINK,
      data: {
        name,
        link,
      },
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileData,
        getProfile,
        setLink,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
