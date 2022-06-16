import { emptyStr, whiteSpace, longStr, specChar } from "../../utils/functions/regex";
import { validCheck } from "../../custom-types";


export const validName: validCheck = function (name: string) {
  if (whiteSpace(name)) {
    return "No whitespace characters allowed.";
  }

  if (longStr(name)) {
    return "Name is too long.";
  }

  if (emptyStr(name)) {
    return "Please fill in a name.";
  }

  if (specChar(name)) {
    return "No special characters allowed.\n Ex: @#$%^!&*";
  }

  return false;
};
