import { RequestHandler, Request, Response, NextFunction } from "express";
import { validEmail, loginPass } from "../validation";

export const checkDeleteUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      let check: string | boolean;

      check = validEmail(email);

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

      return next();
    } else {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }
  } else {
    return res.status(400).json({
      msg: "Bad request.",
    });
  }
};
