import { Request, Response, NextFunction } from "express";



function deleteSession(req: Request, res: Response, next: NextFunction) {
  req.session.destroy((err) => { 
    return res.send("Ok.")
  })
}


export default deleteSession