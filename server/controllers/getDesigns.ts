import { RequestHandler, Request, Response, NextFunction } from "express";

export const getDesigns: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(200).json({});
};
