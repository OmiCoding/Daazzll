import { validName, validEmail, validUser, validPass } from "./accValidation";

type MsgObj = {
  [keyStr: string]: string;
};

export const checkRegister = function (
  fName: string,
  lName: string,
  email: string,
  username: string,
  password: string,
  confirmPass: string
): MsgObj | false {
  let check: string | boolean = validName(fName);
  const warnings: MsgObj = {};

  if (check) {
    warnings["fName"] = check;
  }

  check = validName(lName);

  if (check) {
    warnings["lName"] = check;
  }

  check = validEmail(email);

  if (check) {
    warnings["email"] = check;
  }
  check = validUser(username);
  if (check) {
    warnings["username"] = check;
  }

  check = validPass(password, confirmPass);

  if (check) {
    warnings["password"] = check;
  }

  if (Object.keys(warnings).length === 0) {
    return false;
  } else {
    return warnings;
  }
};
