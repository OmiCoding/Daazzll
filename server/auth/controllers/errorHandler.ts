import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  return res.status(500).json({ msg: "Something has gone wrong..." });
};

export default errorHandler;
