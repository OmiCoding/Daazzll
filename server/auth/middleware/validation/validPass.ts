import { emptyStr, whiteSpace, longStr } from "../../utils/functions/regex";
import { validCheck } from "../../custom-types";


export const validPass: validCheck = function (
  pass: string,
  confirmPass: string
) {
  if (pass.length < 1 || confirmPass.length < 1) {
    return "Can not have an empty pass field.";
  }

  if (pass.length < 8) {
    return "Password length is too short. Minumum length is 8 characters.";
  }

  if (pass.length !== confirmPass.length) {
    return "Passwords do not match.";
  }

  if (pass !== confirmPass) {
    return "Passwords do not match.";
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
