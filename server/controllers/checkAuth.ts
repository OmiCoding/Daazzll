import { RequestHandler, Request, Response, NextFunction } from "express";

export const checkAuth: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("checkAuth");
    return res.status(200).json({ msg: "Ok", clear: true });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
