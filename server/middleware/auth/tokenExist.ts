import { RequestHandler, Request, Response, NextFunction } from "express";

export const tokenExist: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers.authorization) {
    const Token = req.headers.authorization;
    if (Token === "undefined") {
      return res.status(401).json({
        msg: "Unauthenticated.",
      });
    }
    return next();
  } else {
    return res.status(400).json({
      msg: "Bad request.",
    });
  }
};
