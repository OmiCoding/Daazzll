import { useContext } from "react";
import AuthContext from "../../context/auth/AuthContext";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;