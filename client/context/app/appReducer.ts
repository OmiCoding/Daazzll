import { Action, AppContextInit } from "../../custom-types";
import { CLOSE_MODAL, MODAL } from "./cases";

const appReducer = function (prevState: AppContextInit, action: Action) {
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...prevState,
        modalActive: false,
        modal: "",
      };
    case MODAL:
      return {
        ...prevState,
        modal: action.data,
        modalActive: true,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default appReducer;
