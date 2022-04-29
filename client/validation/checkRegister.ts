import { validName, validEmail, validUser, validPass } from "./accValidation";

type MsgObj = {
  [keyStr: string]: string;
};

const checkRegister = function (
  fName: string,
  lName: string,
  email: string,
  username: string,
  pass: string,
  confirmPass: string
): MsgObj | false {
  let check: string | boolean = validName(fName);
  let warnings: MsgObj = {};

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

  check = validPass(pass, confirmPass);

  if (check) {
    warnings["pass"] = check;
  }

  if (Object.keys(warnings).length === 0) {
    return false;
  } else {
    return warnings;
  }
};

export default checkRegister;
