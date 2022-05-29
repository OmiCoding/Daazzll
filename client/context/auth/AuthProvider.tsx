import React, { ReactNode, useReducer } from "react";
import {
  AuthAction,
  AuthContextType,
  AuthReducer,
  LoginBody,
  RegisterBody,
} from "../../custom-types";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import { REGISTER_USER, LOGIN_USER, ERROR_PAGE } from "./cases";

interface ProviderProps {
  children: ReactNode;
}
interface sessionObj {
  pass: boolean;
}

// Change the fetch url's for production

const AuthProvider: React.FC<ProviderProps> = function ({ children }) {
  const hp: any = sessionStorage.getItem("hallpass");
  let hpObj: sessionObj | null;

  hpObj = JSON.parse(hp) || null;

  const [state, dispatch] = useReducer<
    AuthReducer<AuthContextType, AuthAction>
  >(authReducer, {
    auth: hpObj ? hpObj.pass : false,
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

  const login = function (body: LoginBody) {
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

  // const checkAuth = function (cb: (pass: boolean) => void) {
  //   const accessToken = Cookies.get("access_token");

  // };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;