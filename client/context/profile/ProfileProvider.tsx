import React, { ReactNode, useReducer, useCallback, useContext } from "react";
import Cookies from "js-cookie";

import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";

import ProfileContext from "./ProfileContext";
import profileReducer from "./profileReducer";
import { useNavigate } from "react-router";
import { GET_PROFILE, PROFILE_DATA, SET_LINK } from "./cases";
import AuthContext from "../auth/AuthContext";

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
    design: null,
    designLoad: true,
  });

  const { setAuth, resetAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const getProfileData = useCallback(() => {
    fetch("/checkauth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then((data) => data.json())
      .then((res) => {
        if (!res.clear) {
          fetch("/logout", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((res) => {
              sessionStorage.removeItem("hallpass");
              sessionStorage.removeItem("username");
              if (resetAuth) {
                resetAuth();
              }
              return navigate("/login");
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          fetch("/profile/profileData", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((data) => data.json())
            .then((res) => {
              if (res.msg === "Unauthenticated.") return;

              if (setAuth) {
                setAuth(res.username);
              }
              dispatch({
                type: PROFILE_DATA,
                data: res,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [navigate, resetAuth]);

  const getProfile = useCallback((username: string) => {
    const accessToken = Cookies.get("access_token");
    console.log(accessToken);
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

  const activeDesign = function (file: File) {
    return dispatch({
      type: "ACTIVE_DESIGN",
      data: file,
    });
  };

  const resetDesign = function () {
    return dispatch({
      type: "RESET_DESIGN",
    });
  };

  const doneLoad = function() {
    return dispatch({
      type: "DONE_LOAD",
    })
  }

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileData,
        getProfile,
        setLink,
        activeDesign,
        resetDesign,
        doneLoad,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
