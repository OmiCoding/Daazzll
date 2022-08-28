import { HeaderReducer, HeaderState } from "../../custom-types";

import { ACTIVE, RESET } from "./types";

const headerReducer: HeaderReducer = function (prevState, action): HeaderState {
  switch (action.type) {
    case ACTIVE:
      return {
        ...prevState,
        active: !prevState.active,
      };

    case RESET:
      return {
        ...prevState,
        active: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default headerReducer;
