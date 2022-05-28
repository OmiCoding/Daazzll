import { RequestHandler, Request, Response, NextFunction } from "express";
import { validEmail, loginPass, validUser } from "../validation";


export const checkLogin: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email_user, password } = req.body;

  let check: string | boolean | undefined;

  if(/[@\.]/.test(email_user)) {
    check = validEmail(email_user);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }

    check = loginPass(password);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }
  } else {
    check = validUser(email_user);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }
  }

  return next();
};