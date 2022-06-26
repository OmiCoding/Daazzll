import { Action, ProfileContextInit, ProfileReducer } from "../../custom-types";
import { GET_PROFILE, PROFILE_DATA } from "./cases";

const profileReducer: ProfileReducer<ProfileContextInit, Action> = function (
  prevState,
  action
) {
  switch (action.type) {
    case PROFILE_DATA:
      const { username } = action.data;
      return {
        ...prevState,
        init: false,
        username: username,
        user: true,
      };
    case GET_PROFILE:
      return {
        ...prevState,
        init: false,
        user: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default profileReducer;
