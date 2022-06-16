import { whiteSpace, longStr, specChar } from "../../utils/functions/regex";
import { validCheck } from "../../custom-types";


export const validUser: validCheck = function (user: string) {

if (whiteSpace(user)) {
    return "No whitespace characters allowed.";
  }

  if (longStr(user)) {
    return "This username has exceeded the limit of characters.";
  }

  if (specChar(user)) {
    return "No special characters are allowed. Ex: @#!$%^&*()";
  }

  return false;
};
