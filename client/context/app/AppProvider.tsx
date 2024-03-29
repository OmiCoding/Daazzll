import React, { useCallback, useReducer, MouseEvent, ReactNode } from "react";
import { Action, AppContextInit, AppReducer } from "../../custom-types";

import AppContext from "./AppContext";
import appReducer from "./appReducer";
import { CLOSE_MODAL, MODAL, GET_LOCATION, RESIZE } from "./cases";

interface AppProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProps> = function ({ children }) {
  const appInit = {
    modal: "",
    modalActive: false,
    absHeader: false,
    location: "",
    design: "",
    avatar: "",
    banner: "",
    resize: "",
  };

  if (window) {
    appInit.location = window.app ? window.app.url : "";
  }

  const [state, dispatch] = useReducer<AppReducer<AppContextInit, Action>>(
    appReducer,
    appInit
  );

  function handleModal(event: MouseEvent<HTMLButtonElement>, modal: string, modalData?: any) {
    if(modalData) {
      if (modalData.key === "design") {
        return dispatch({
          type: MODAL,
          data: {
            modal,
            design: modalData.url,
          }
        })
      }
    }
     
    return dispatch({
      type: MODAL,
      data: {
        modal,
        modalData,
      }
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

  function getLocation(path: string) {
    dispatch({
      type: GET_LOCATION,
      data: path,
    });
  }

  const handleResize = useCallback((device) => {
      dispatch({
        type: RESIZE,
        data: {
          device,
        }
      })
  }, [])
  
  

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        handleModal,
        closeModal,
        getLocation,
        handleResize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
