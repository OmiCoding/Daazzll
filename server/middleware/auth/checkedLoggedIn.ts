import { RequestHandler, Request, Response, NextFunction } from "express";

export const checkedLoggedIn: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies.access_token) {
    return res.status(403).json({ msg: "Bad request." });
  }
  return next();
};
