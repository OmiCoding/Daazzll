import { useContext } from "react";
import AppContext from "../../context/app/AppContext";

const useApp = function () {
  return useContext(AppContext);
};

export default useApp;
