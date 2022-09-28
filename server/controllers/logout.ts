import { RequestHandler, Request, Response, NextFunction } from "express";

export const logout: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("access_token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("sid", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Ok",
    });
  } catch (e) {
    return next(e);
  }
};
