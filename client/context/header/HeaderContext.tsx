import { createContext } from "react";
import { HeaderState } from "../../custom-types";

const HeaderContext = createContext<HeaderState>({
  active: false,
});

export default HeaderContext;
