import React, { useReducer, ReactNode } from "react";

import HeaderContext from "./HeaderContext";

import headerReducer from "./headerReducer";

interface HeaderProps {
  children: ReactNode;
}

const HeaderProvider: React.FC<HeaderProps> = function ({ children }) {
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
};

export default HeaderProvider;
