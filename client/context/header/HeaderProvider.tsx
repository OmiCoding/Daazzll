import React, { useReducer } from "react";
import { ContextChildren } from "../../custom-types";

import HeaderContext from "./HeaderContext";

import headerReducer from "./headerReducer";

interface HeaderProps ={
  
}

const HeaderProvider: React.FC<> = function ({ children }) {
  const [state, dispatch] = useReducer(headerReducer, {
    active: false,
  });

  function setActive() {
    return dispatch({
      type: "ACTIVE",
    });
  }

  return (
    <HeaderContext.Provider
      value={{
        ...state,
        setActive,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export default HeaderProvider;
