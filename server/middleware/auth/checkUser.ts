import { RequestHandler, Request, Response, NextFunction } from "express";

export const checkUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({
      msg: "Unauthorized.",
    });
  }
};
