import { RequestHandler, Request, Response, NextFunction } from "express";
import { validEmail, validName, validUser, validPass } from "../validation";


export const checkRegister: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fName, lName, username, email, password, confirmPass } = req.body;

  let check: string | boolean | undefined;



  check = validName(fName);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }
  

  check = validName(lName);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }
  

  check = validEmail(email);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }


  check = validPass(password, confirmPass);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }


  check = validUser(username);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = undefined;

  return next();
};