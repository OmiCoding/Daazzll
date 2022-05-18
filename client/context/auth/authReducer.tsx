import { AuthAction, AuthContextType, AuthReducer } from "../../custom-types";
import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  ERROR_PAGE,
  CHECK_AUTH,
} from "./cases";

const authReducer: AuthReducer<AuthContextType, AuthAction> = function (
  prevState: AuthContextType,
  action: AuthAction
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
    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
