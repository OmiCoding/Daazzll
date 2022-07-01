import React, { ReactNode, useReducer } from "react";
import { Action, AppContextInit, AppReducer } from "../../custom-types";

import AppContext from "./AppContext";
import appReducer from "./appReducer";

interface AppProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProps> = function ({ children }) {
  const [state, dispatch] = useReducer<AppReducer<AppContextInit, Action>>(
    appReducer,
    {
      modalActive: false,
      modal: "",
    }
  );

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
