import React, { ReactNode, useReducer } from "react";
import Cookies from "js-cookie";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
import {
  Action,
  AuthContextType,
  AuthReducer,
  LoginBody,
  RegisterBody,
} from "../../custom-types";
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
  const user: any = sessionStorage.getItem("username");
  let hpObj: sessionObj | null;

  hpObj = JSON.parse(hp) || null;

  const [state, dispatch] = useReducer<AuthReducer<AuthContextType, Action>>(
    authReducer,
    {
      auth: hpObj ? hpObj.pass : false,
      username: user ? user : "",
    }
  );

  // let BUILD_HOST: string;
  // if (!process.env.BUILD_HOST) {
  //   if (process.env.BUILD === "test") {
  //     BUILD_HOST = "https://daazzll.dev/";
  //   } else {
  //     BUILD_HOST = "https://daazzll.dev:8433/";
  //   }
  // }

  const register = function (body: RegisterBody, cb: () => void) {
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
          sessionStorage.setItem("username", res.username);
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

  const logout = function () {
    fetch("/auth/logout", {
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
