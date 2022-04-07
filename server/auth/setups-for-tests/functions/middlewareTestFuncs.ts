import { Request, Response, RequestHandler, NextFunction } from "express";

export const assignUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user = {
    role: "user",
    userId: "someId",
    email: "johndoe123@gmail.com",
  };

  return next();
};
