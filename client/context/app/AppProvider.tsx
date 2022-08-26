import React, { MouseEvent, ReactNode, useReducer } from "react";
import { Action, AppContextInit, AppReducer } from "../../custom-types";

import AppContext from "./AppContext";
import appReducer from "./appReducer";
import { CLOSE_MODAL, MODAL } from "./cases";

interface AppProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProps> = function ({ children }) {
  const [state, dispatch] = useReducer<AppReducer<AppContextInit, Action>>(
    appReducer,
    {
      modal: "",
      modalActive: false,
      absHeader: false,
    }
  );

  function handleModal(event: MouseEvent<HTMLButtonElement>, modal: string) {
    return dispatch({
      type: MODAL,
      data: modal,
    });
  }

  function closeModal(event?: MouseEvent<HTMLButtonElement>) {
    if (!event) {
      return dispatch({
        type: CLOSE_MODAL,
      });
    }
    return dispatch({
      type: CLOSE_MODAL,
    });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
