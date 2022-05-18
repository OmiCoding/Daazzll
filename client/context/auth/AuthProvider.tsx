import React, { ReactNode, useReducer } from "react";
import Cookies from "js-cookie";
import {
  AuthAction,
  AuthContextType,
  AuthReducer,
  LoginBody,
  RegisterBody,
} from "../../custom-types";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, ERROR_PAGE } from "./cases";

interface ProviderProps {
  children: ReactNode;
}

// Change the fetch url's for production

const AuthProvider: React.FC<ProviderProps> = function ({ children }) {
  const [state, dispatch] = useReducer<
    AuthReducer<AuthContextType, AuthAction>
  >(authReducer, {
    auth: false,
  });

  const register = function (body: RegisterBody, cb: () => void) {
    fetch("https://daazzll.local:8433/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        return data.status;
      })
      .then((res) => {
        if (res === 200) {
          dispatch({
            type: REGISTER_USER,
          });
          cb();
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR_PAGE,
        });
      });
  };

  const login = function (body: LoginBody, cb: () => void) {
    fetch("https://daazzll.local:8433/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.status)
      .then((res) => {
        if (res === 200) {
          dispatch({
            type: LOGIN_USER,
          });
          cb();
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR_PAGE,
        });
      });
  };

  const logout = function () {
    fetch("https://daazzll.local:8433/logout", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        // find a way to include the token here...
        // "Authorization": `Bearer ${}`,
      },
    });
  };

  const checkAuth = function () {
    let accessToken = Cookies.get("access_token");
    fetch("https://daazzll.local:8433/checkauth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((data) => data.status)
      .then((res) => {
        console.log(res);
        if (res === 200) {
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR_PAGE,
        });
      });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
