import { NextFunction, Request, RequestHandler, Response } from "express"

export const logout2: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie("access_token", {
            path: "/",
            sameSite: "strict",
            secure: true,
        })

        res.clearCookie("refresh_token", {
            path: "/",
            sameSite: "strict",
            secure: true,
        })

        res.clearCookie("sid", {
            path: "/",
            sameSite: "strict",
            httpOnly: true,
            secure: true,
            signed: true,
        })

        req.user = undefined;

        return res.status(200).json({
            msg: "Safe to logout."
        })
    } catch(e) {
        return next(e);
    }
}