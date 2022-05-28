import { RequestHandler, Request, Response, NextFunction } from "express";

export const checkAuth: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
  try {

    return res.status(200).json({
      msg: "Ok."
    })
  } catch(e) {
    console.log(e);
    next(e);
  }
}