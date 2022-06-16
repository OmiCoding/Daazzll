import { RequestHandler, Request, Response, NextFunction } from "express";


export const tokenExist: RequestHandler = function(req: Request, res: Response, next: NextFunction) {
  // res.set("Access-Control-Allow-Origin", "https://daazzll.local:8080")
  // res.set("Access-Control-Allow-Headers", "Authorization");
  if(req.headers.authorization) {
    const Token = req.headers.authorization;
    if(Token === "undefined") {
      return res.status(401).json({
        msg: "Unauthenticated request"
      })
    }
    return next();
  } else {
    return res.status(400).json({
      msg: "Bad request."
    })
  }
}