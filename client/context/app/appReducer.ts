import { Action, AppContextInit } from "../../custom-types";
import { CLOSE_MODAL, MODAL, GET_LOCATION } from "./cases";

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
    case GET_LOCATION:
      return {
        ...prevState,
        location: action.data,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default appReducer;
