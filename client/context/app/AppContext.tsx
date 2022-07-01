import { createContext } from "react";
import { AppContextInit } from "../../custom-types";

const AppContext = createContext<AppContextInit>({
  modalActive: false,
  modal: "",
});

export default AppContext;
