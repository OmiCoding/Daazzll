import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";
import { GET_PROFILE, PROFILE_DATA, SET_LINK } from "./cases";

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
        username: data.username,
      };
    case GET_PROFILE:
      const { discord, twitter } = data;

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

    default:
      return {
        ...prevState,
      };
  }
};

export default profileReducer;
