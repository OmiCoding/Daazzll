import { RequestHandler, Request, Response, NextFunction } from "express";
import { validEmail, loginPass, validUser, validName } from "../validation";

export const checkUpdateUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body) {
      if (req.body.email && req.body.password) {
        const { fName, lName, password, email, username } = req.body;

        let check: string | boolean;

        if (password) {
          check = loginPass(password);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (fName) {
          check = validName(fName);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (lName) {
          check = validName(lName);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (email) {
          check = validEmail(email);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (username) {
          check = validUser(username);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
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
  } catch (e) {
    return next(e);
  }
};
