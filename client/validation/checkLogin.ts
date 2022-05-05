import { loginPass, validUser, validEmail } from "./accValidation";

type WarnObj = {
  [keyString: string]: string;
}


const checkLogin = function(email_user: string, pass:string): WarnObj | false {
  let check = loginPass(pass);
  const warnObj: WarnObj = {}
  let propName: string;

  if(check) {
    warnObj["pass"] = check;
  }


  if(/[@\.]/.test(email_user)) {
    propName = "email"
  } else {
    propName = "username"
  }

  if(propName === "username") {
    check = validUser(email_user);

    if(check) {
      warnObj["acc"] = check;
      return warnObj;
    }
  } else {
    console.log(email_user)
    check = validEmail(email_user);

    if(check) {
      warnObj["acc"] = check;
      return warnObj
    }
  }  

  return false;
}

export default checkLogin;