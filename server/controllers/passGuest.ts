import { NextFunction, Request, Response } from "express";

export const passGuest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user) {
      return res.status(403).json({
        clear: false,
      });
    }

    if (req.cookies) {
      return res.status(403).json({
        clear: false,
      });
    }

    return res.status(200).json({
      clear: true,
    });
  } catch (e) {
    return next();
  }
};
