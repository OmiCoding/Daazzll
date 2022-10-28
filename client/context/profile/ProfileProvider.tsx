import React, { ReactNode, useReducer, useCallback, useContext } from "react";
import Cookies from "js-cookie";

import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";

import ProfileContext from "./ProfileContext";
import profileReducer from "./profileReducer";
import { useNavigate } from "react-router";
import { GET_PROFILE, PROFILE_DATA, SET_CURSOR_DESIGNS, SET_LINK } from "./cases";
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
    designs: [],
    count: 0,
  });

  const { count,} = state;
  const { setAuth, resetAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // const getProfileData = useCallback(async () => {
  //   fetch("/checkauth", {
  //     method: "GET",
  //     mode: "cors",
  //     credentials: "include",
  //   })
  //     .then((data) => data.json())
  //     .then((res) => {
  //       if (!res.clear) {
  //         fetch("/logout", {
  //           method: "GET",
  //           mode: "cors",
  //           credentials: "include",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         })
  //           .then((data) => data.json())
  //           .then((res) => {
  //             sessionStorage.removeItem("hallpass");
  //             sessionStorage.removeItem("username");
  //             if (resetAuth) {
  //               resetAuth();
  //             }
  //             return navigate("/login");
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       } else {
  //         fetch("/profile/profileData", {
  //           method: "GET",
  //           mode: "cors",
  //           credentials: "include",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         })
  //           .then((data) => data.json())
  //           .then((res) => {
  //             if (res.msg === "Unauthenticated.") return;

  //             if (setAuth) {
  //               setAuth(res.username);
  //             }
  //             // dispatch({
  //             //   type: PROFILE_DATA,
  //             //   data: res,
  //             // });
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, [navigate, resetAuth]);

  const getProfileData = useCallback (async () => {
    try {
      const data = await fetch("/checkauth", {
        method: "GET",
        mode: "cors",
        credentials: "include"
      })
    
      const { clear } = await data.json();
    
      if (!clear) {
        sessionStorage.removeItem("hallpass");
        sessionStorage.removeItem("username");
        await fetch("/logout", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })
  
        if (resetAuth) {
          resetAuth();
        }
  
        return navigate("/login");
      } else {
        const data = await fetch("/profile/profileData", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })
  
        const { msg, username } = await data.json();
  
        if (msg === "Unauthenticated") return;
  
        if (setAuth) {
          setAuth(username);
        }

        const avatarData = await fetch("/profile/avatar", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })

        const bannerData = await fetch("/profile/banner", {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })

        const avatarUrl = await avatarData.json();
        const bannerUrl = await bannerData.json();

        const designData = await fetch(`/profile/designs?cursor=${count}`, {
          method: "GET",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          }
        })      
  
        const { imgs, cursor } = await designData.json();

        dispatch({
          type: PROFILE_DATA,
          data: {
            username,
            imgs,
            cursor,
            avatarUrl,
            bannerUrl,
          }
        })
      }
    } catch(e) {
      console.error(e);
    }
  }, [count, resetAuth, setAuth, navigate])

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

  const storeLink = function(url: string, option: string) {
    fetch("/profile/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        option: option.toLowerCase(),
        url,
      }),
    })
    //   .then((data) => data.json())
    //   .then((res) => {
    //     if (
    //       res.msg === "Link has been added to account!" &&
    //       res.name &&
    //       res.link
    //     ) {
    //       if (setLink) {
    //         return setLink(res.name, res.link);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

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

  const setDesigns = useCallback(async () => {
    try {
      const data = await fetch(`/profile/designs?cursor=${count}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      })
  
      const { imgs, cursor } = await data.json();

      if (imgs.length > 5 && 
        count !== cursor && 
        cursor !== null) {
          dispatch({
            type: SET_CURSOR_DESIGNS,
            data: {
              cursor,
              imgs,
            }
          })
      }
    } catch(e) {
      console.error(e);
    }
  }, [count]) 

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileData,
        getProfile,
        setLink,
        activeDesign,
        resetDesign,
        setDesigns,
        doneLoad,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
