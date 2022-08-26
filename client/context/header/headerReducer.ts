import { HeaderReducer, HeaderState } from "../../custom-types";

import { ACTIVE } from "./types";

const headerReducer: HeaderReducer = function (prevState, action): HeaderState {
  switch (action.type) {
    case ACTIVE:
      return {
        ...prevState,
        active: !prevState.active,
      };

    default:
      return {
        ...prevState,
      };
  }
};

export default headerReducer;
