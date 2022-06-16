import { RequestHandler } from "express";
import { redisClient } from "../storageInit";

export const setUserProp: RequestHandler = async function (req, res, next) {
  try {
    console.log(req);

    if (req.signedCookies["sid"]) {
      const uid = req.signedCookies["sid"];
      const redisData = await redisClient.get(uid);

      if (redisData) {
        req.user = JSON.parse(redisData);
        console.log("req.user:", req.user);
      } else {
        res.clearCookie("sid", {
          secure: true,
          sameSite: true,
          httpOnly: true,
          signed: true,
        });
        req.user = undefined;
      }
    }
    return next();
  } catch (e) {
    return next(e);
  }
};
