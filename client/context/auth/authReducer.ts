import { Action, AuthContextInit, AuthReducer } from "../../custom-types";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ERROR_PAGE,
  CHECK_AUTH,
  REMOVE_AUTH,
  RESET_AUTH,
  SET_AUTH,
} from "./cases";

const authReducer: AuthReducer<AuthContextInit, Action> = function (
  prevState: AuthContextInit,
  action: Action
) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...prevState,
        auth: true,
        username: action.data.username,
      };
    case LOGIN_USER:
      return {
        ...prevState,
        auth: true,
        username: action.data.username,
      };
    case LOGOUT_USER:
      return {
        ...prevState,
        auth: false,
      };
    case ERROR_PAGE:
      return {
        ...prevState,
      };
    case CHECK_AUTH:
      return {
        ...prevState,
        auth: true,
      };
    case REMOVE_AUTH:
      return {
        ...prevState,
        username: "",
        auth: false,
      };
    case SET_AUTH:
      return {
        ...prevState,
        auth: true,
        username: action.data,
      };

    case RESET_AUTH:
      return {
        ...prevState,
        username: "",
        auth: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
