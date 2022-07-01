import { createContext } from "react";
import { AuthContextInit } from "../../custom-types";

const AuthContext = createContext<AuthContextInit>({
  auth: false,
  username: "",
});

export default AuthContext;
