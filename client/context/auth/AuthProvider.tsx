import React, { ReactNode, useReducer, useCallback } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import {
  Action,
  AuthContextInit,
  AuthReducer,
  LoginBody,
  RegisterBody,
} from "../../custom-types";
import {
  REGISTER_USER,
  LOGIN_USER,
  ERROR_PAGE,
  RESET_AUTH,
  SET_AUTH,
} from "./cases";

interface ProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<ProviderProps> = function ({ children }) {
  const authInit = {
    auth: false,
    username: "",
  };
  if (window && window.app) {
    if (window.app.auth) {
      authInit.auth = window.app.auth.auth;
      authInit.username = window.app.auth.username;
    }
  }
  const [state, dispatch] = useReducer<AuthReducer<AuthContextInit, Action>>(
    authReducer,
    authInit
  );

  const register = function (body: RegisterBody) {
    fetch("/register", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.username) {
          dispatch({
            type: REGISTER_USER,
            data: {
              username: res.username,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR_PAGE,
        });
      });
  };

  const login = function (body: LoginBody) {
    fetch("/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.username) {
          // probably want to use some sort of encryption
          dispatch({
            type: LOGIN_USER,
            data: {
              username: res.username,
            },
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: ERROR_PAGE,
        });
      });
  };

  const logout = async function () {
    await fetch("/logout", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: RESET_AUTH,
    });
  };

  const resetAuth = useCallback(() => {
    return dispatch({
      type: RESET_AUTH,
    });
  }, [dispatch]);

  const setAuth = useCallback(
    (userN: string) => {
      return dispatch({
        type: SET_AUTH,
        data: userN,
      });
    },
    [dispatch]
  );

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        dispatch,
        resetAuth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
