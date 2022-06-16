import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.stack) {
    console.error(err.stack);
  } else {
    console.error(err);
  }
  return res.status(500).redirect("/");
};
