import { Request, Response, NextFunction, RequestHandler } from "express";

export const checkAccToken: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies.access_token) {
    return next();
  } else {
    return res.status(401).json({
      msg: "Unauthorized.",
    });
  }
};
