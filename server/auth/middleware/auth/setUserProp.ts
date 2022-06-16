import { RequestHandler } from "express";
import { redisClient } from "../../storageInit";

export const setUserProp: RequestHandler = async function (req, res, next) {
  try {
    console.log("tf");
    console.log(req.cookies);
    console.log(req.signedCookies["sid"]);
    if (req.signedCookies["sid"]) {
      const uid = req.signedCookies["sid"];
      const redisData = await redisClient.get(uid);

      if (redisData) {
        req.user = JSON.parse(redisData);
      } else {
        throw new Error("Something has gone wrong...");
      }
    }
    return next();
  } catch (e) {
    return next(e);
  }
};
