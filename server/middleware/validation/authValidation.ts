import { validCheck } from "../../custom-types";
import {
  whiteSpace,
  longStr,
  specChar,
  emptyStr,
} from "../../utils/helpers/regex";

export const validEmail: validCheck = function (email: string) {
  if (emptyStr(email)) return "Please give us your email.";

  if (whiteSpace(email)) return "Please give a valid email.";

  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  if (!regex.test(email)) {
    return "Invalid email.";
  }

  return false;
};

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

export const validPhone: validCheck = function (phoneNum: string) {
  // This only applies for US phone numbers.
  if (phoneNum.length !== 12) {
    return "Please put in a valid phone number.";
  } else {
    const phoneArr = phoneNum.split("-");
    const smallRegex = /\d{3}/;
    const largeRegex = /\d{4}/;

    for (let i = 0; i < phoneArr.length; i++) {
      const numSet = phoneArr[i];
      if (numSet.length === 3 && !smallRegex.test(numSet)) {
        return "Please put in a valid phone number.";
      } else if (numSet.length === 4 && !largeRegex.test(numSet)) {
        return "Please put in a valid phone number.";
      }

      if (numSet.length === 3) continue;
      else if (i === 2 && numSet.length === 4) continue;

      if (i === 2 && numSet.length !== 4)
        return "Please put in a valid phone number.";
      else if (numSet.length !== 3)
        return "Please put in a valid phone number.";
    }

    return false;
  }
};

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
