import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";
import { GET_PROFILE, PROFILE_DATA } from "./cases";

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
      return {
        ...prevState,
        init: false,
        user: false,
        username: data.username,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default profileReducer;
