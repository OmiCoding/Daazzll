import { RequestHandler, Request, Response, NextFunction } from "express"


export const logout: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.cookies) {
      if (req.cookies.access_token) {
        res.clearCookie("access_token", {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }
      if (req.cookies.refresh_token) {
        res.clearCookie("refresh_token", {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }

      req.user = undefined;

      return res.status(200).json({
        msg: "Ok"
      });
    } else {
      req.user = undefined;
      return res.status(200).json({
        msg: "Ok"
      });
    }
  } catch (e) {
    return next(e);
  }
};