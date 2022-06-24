import { emptyStr, whiteSpace, longStr } from "../../utils/functions/regex"

import { validCheck } from "../../custom-types";

export const loginPass: validCheck = function (pass: string) {
  if (pass.length < 1) {
    return "Please enter a password.";
  }

  if (pass.length < 8) {
    return "Password length is too short. Minumum length is 8 characters.";
  }

  if (emptyStr(pass)) {
    return "Please enter a password.";
  }

  if (whiteSpace(pass)) {
    return "No white space allowed.";
  }

  if (longStr(pass)) {
    return "Password is too long.";
  }

  return false;
};
