import { createContext } from "react";
import { AppContextInit } from "../../custom-types";

const AppContext = createContext<AppContextInit>({
  modal: "",
  modalActive: false,
  absHeader: false,
  location: "",
  design: "",
});

export default AppContext;
