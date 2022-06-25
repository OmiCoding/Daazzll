import { createContext } from "react";
import { AuthContextType } from "../../custom-types";

const AuthContext = createContext<AuthContextType>({
  auth: false,
  username: "",
});

export default AuthContext;
