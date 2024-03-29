import { Action, AppContextInit } from "../../custom-types";
import { CLOSE_MODAL, MODAL, GET_LOCATION, RESIZE } from "./cases";

const appReducer = function (prevState: AppContextInit, action: Action) {
  const { data } = action;
  switch (action.type) {
    case CLOSE_MODAL:
      return {
        ...prevState,
        modalActive: false,
        modal: "",
      };
    case MODAL:
      if(data.modal === "design") {
        return {
          ...prevState,
          modal: data.modal,
          modalActive: true,
          design: data.design,
        };        
      }
      return {
        ...prevState,
        modal: data.modal,
        modalActive: true,
      };
    case GET_LOCATION:
      return {
        ...prevState,
        location: action.data,
      };
    case RESIZE:
      return {
        ...prevState,
        resize: data.device,
      }
    default:
      return {
        ...prevState,
      };
  }
};

export default appReducer;
