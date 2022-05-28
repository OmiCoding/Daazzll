import { RequestHandler, Request, Response, NextFunction } from "express";

export const checkGuest: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    (req.cookies.access_token && req.cookies.refresh_token) ||
    req.cookies.refresh_token
  ) {
    return next();
  } else {
    return res.status(401).json({ msg: "Not authorized." });
  }
};
