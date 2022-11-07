import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";
import {
  ACTIVE_DESIGN,
  GET_PROFILE,
  PROFILE_DATA,
  RESET_DESIGN,
  SET_LINK,
  STORE_LINK,
  DONE_LOAD,
  SET_CURSOR_DESIGNS,
  SET_AVATAR,
  SET_BANNER,
} from "./cases";

const profileReducer: ProfileReducer<ProfileContextInit, Action> = function (
  prevState,
  action
) {
  const { data } = action;

  switch (action.type) {
    case PROFILE_DATA:
      return {
        ...prevState,
        init: false,
        user: true,
        designLoad: false,
        designs: [...data.imgs],
        count: data.cursor,
        username: data.username,
        avatar: data.avatarUrl,
        banner: data.bannerUrl,
        discord: data.discord ? data.discord : "",
        twitter: data.twitter ? data.twitter : "",
        instagram: data.instagram ? data.instagram : "",
        facebook: data.facebook ? data.facebook : "",
        website: data.website ? data.website : "",    
      };
    case GET_PROFILE:
      return {
        ...prevState,
        init: false,
        user: false,
        username: data.username,
        discord: data.discord ? data.discord : "",
        twitter: data.twitter ? data.twitter : "",
        instagram: data.instagram ? data.instagram : "",
        facebook: data.facebook ? data.facebook : "",
        website: data.website ? data.website : "",
      };
    case SET_LINK:
      return {
        ...prevState,
        [data.name]: data.link,
      };
    case STORE_LINK:
      return {
        ...prevState,
        [data.option]: data.link,
      }
    case SET_AVATAR:
      
        return {
          ...prevState,
          avatar: data.avatar,
        }
    case SET_BANNER:
      return {
          ...prevState,
          banner: data.banner,
      }
    case ACTIVE_DESIGN:
      return {
        ...prevState,
        design: data,
        submit: true,
      };
    case RESET_DESIGN:
      if(data.designUrl.length === 0) {
        return {
          ...prevState,
          design: null,
          submit: false,
        };   
      } else {
        return {
          ...prevState,
          design: null,
          submit: false,
          designs: [...prevState.designs, data.designUrl],
        };
      }
    case SET_CURSOR_DESIGNS:
      return {
        ...prevState,
        designs: [...data.imgs],
        count: data.cursor,
      }
    case DONE_LOAD:
      return {
        ...prevState,
        designLoad: false,
      }
    default:
      return {
        ...prevState,
      };
  }
};

export default profileReducer;
