import { Action, AuthContextType, AuthReducer } from "../../custom-types";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ERROR_PAGE,
  CHECK_AUTH,
  REMOVE_AUTH,
} from "./cases";

const authReducer: AuthReducer<AuthContextType, Action> = function (
  prevState: AuthContextType,
  action: Action
) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...prevState,
        auth: true,
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
        auth: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
