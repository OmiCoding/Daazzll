import { Action, AppContextInit } from "../../custom-types";
import { ACTIVE_MODAL, MODAL } from "./cases";

const appReducer = function (prevState: AppContextInit, action: Action) {
  switch (action.type) {
    case ACTIVE_MODAL:
      return {
        ...prevState,
      };
    case MODAL:
      return {
        ...prevState,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default appReducer;
