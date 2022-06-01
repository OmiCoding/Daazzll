import { Request, Response, RequestHandler, NextFunction } from "express";

export const assignUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  
  return next();
};
