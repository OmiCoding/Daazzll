import { Request, Response, NextFunction, RequestHandler } from "express"

export const checkAccToken: RequestHandler = function(req: Request, res: Response, next: NextFunction) {
  try {

    const authHeader = req.headers.authorization;
    if(authHeader) {
      const accessToken = authHeader.split(" ")[1];
      if(accessToken === req.cookies.access_token) {
        return next();
      }

      return res.status(400).json({
        msg: "Bad request."
      })
    } else {
      return res.status(400).json({
        msg: "Bad request."
      })
    }
  } catch(e) {
    return next(e);
  }
}