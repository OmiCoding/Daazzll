import React, { ReactNode, useReducer, useCallback, useContext } from "react";
import Cookies from "js-cookie";

import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";

import ProfileContext from "./ProfileContext";
import profileReducer from "./profileReducer";
import { useNavigate } from "react-router";
import { GET_PROFILE, PROFILE_DATA, SET_CURSOR_DESIGNS, SET_LINK, SET_AVATAR, SET_BANNER, STORE_LINK } from "./cases";
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
    avatar: "",
    banner: "",
    activeImg: "",
    design: null,
    designLoad: true,
    designs: [],
    count: 0,
    submit: false,
  });

  const navigate = useNavigate();
  const { count } = state;
  const { setAuth, resetAuth } = useContext(AuthContext);

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
        let profileData: any;
        let designData: any;

        try {
          profileData = await fetch("/profile/profileData", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          })
        } catch(e) {
          console.error(e);
        }

        let { msg, username, avatarUrl, bannerUrl, social } = await profileData.json();
  
        if (msg === "Unauthenticated") return;
  
        if (setAuth) {
          setAuth(username);
        }

        try {
          designData = await fetch(`/profile/designs?cursor=${count}`, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          })
        } catch(e) {
          console.error(e);
        }
              
        const { imgs, cursor } = await designData.json();

        if(!social) {
          social = {};
        }

        dispatch({
          type: PROFILE_DATA,
          data: {
            username,
            imgs,
            cursor,
            avatarUrl,
            bannerUrl,
            website: social.website,
            discord: social.discord,
            instagram: social.instagram,
            twitter: social.twitter,
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

  const submitPhoto = async function(file: File, modal: string) {
    const formData = new FormData();
    try {
      if (modal === "banner") {
        formData.append("banner", file);
      } else {
        formData.append("avatar", file);
      }

      try {
        const data = await fetch(
          `/profile/upload?uploadType=${
            modal === "banner" ? "banners" : "avatars"
          }`,
          {
            method: "POST",
            mode: "cors",
            credentials: "include",
            body: formData,
          }
        )

        const { imageUrl } = await data.json();

        if(modal === "avatars") {
          dispatch({
            type: SET_AVATAR,
            data: {
              avatar: imageUrl,
            }
          })
        } else {
          dispatch({
            type: SET_BANNER,
            data: {
              banner: imageUrl,
            }
          })
        }

        
      } catch(e) {
        console.error(e);
        return;
      }
    } catch(e) {
      console.error(e);
      return;
    }
  };

  const setLink = function (name: string, link: string) {
    dispatch({
      type: SET_LINK,
      data: {
        name,
        link,
      },
    });
  };

  const storeLink = async function(url: string, option: string) {
    try {
      const lcOption = option.toLowerCase();
      const data = await fetch("/profile/link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          option: lcOption,
          url,
        }),
      })
  
      const link = await data.json();
  
      const item = link;
      if(item[lcOption]) {
        dispatch({
          type: STORE_LINK,
          data: {
            link: item[lcOption],
            option: lcOption,
          }
        })
      }
    } catch(e) {
      console.error(e);
    }
    
   
  }

  const activeDesign = function (file: File) {
    return dispatch({
      type: "ACTIVE_DESIGN",
      data: file,
    });
  };

  const resetDesign = function (designUrl: string) {
    return dispatch({
      type: "RESET_DESIGN",
      data: {
        designUrl,
      }
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
  }, [count]);

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        getProfileData,
        getProfile,
        submitPhoto,
        setLink,
        activeDesign,
        resetDesign,
        setDesigns,
        storeLink,
        doneLoad,
        dispatch,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
