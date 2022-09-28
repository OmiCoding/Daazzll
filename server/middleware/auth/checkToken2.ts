import crypto from "crypto";
import fs from "fs";
import util from "util";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../storageInit";
import { RedisAuthToken } from "../../custom-types";
import { regenToken, signedToken } from "../../utils/functions/auth";
import "dotenv/config";
import prismaClient from "../../prismaClient";
import { handleJWT } from "../../utils/functions";
import { PUB_KEY_PATH, PRIV_KEY_PATH } from "../../serverConfig";

const readFile = util.promisify(fs.readFile);

export const checkToken2: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const publicKey = await readFile(PUB_KEY_PATH, "binary");

    const { access_token, refresh_token } = req.cookies;
    const { sid } = req.signedCookies;

    try {
      const accPayload: any = await handleJWT(access_token, publicKey);
      if (!accPayload) {
        if (sid) {
          await redisClient.del(sid);
        }
        req.user = undefined;

        console.log(1);
        console.log("jello?");
        return res.status(401).json({
          msg: "Unauthenticated.",
          clear: false,
        });
      }

      const redisData = await redisClient.GET(accPayload.tokenId);

      if (!redisData) {
        if (sid) {
          await redisClient.del(sid);
        }
        console.log(2);
        req.user = undefined;
        return res.status(401).json({
          msg: "Unauthenticated.",
          clear: false,
        });
      }

      const tokenObj: RedisAuthToken = JSON.parse(redisData);

      if (tokenObj.token !== access_token) {
        if (sid) {
          await redisClient.del(sid);
        }
        console.log(3);
        req.user = undefined;
        return res.status(401).json({
          msg: "Unauthenticated.",
          clear: false,
        });
      }
      return next();
    } catch (e: any) {
      try {
        // Needs proper typing
        const refPayload: any = await handleJWT(refresh_token, publicKey);

        if (!refPayload) {
          if (sid) {
            await redisClient.del(sid);
          }
          console.log(4);
          req.user = undefined;
          return res.status(401).json({
            msg: "Unauthenticated.",
            clear: false,
          });
        }

        const redisData = await redisClient.get(refPayload.tokenId);

        if (!redisData) {
          if (sid) {
            await redisClient.del(sid);
          }
          console.log(5);
          req.user = undefined;
          return res.status(401).json({
            msg: "Unauthenticated.",
            clear: false,
          });
        }

        const tokenObj: RedisAuthToken = JSON.parse(redisData);
        if (tokenObj.token !== refresh_token) {
          if (sid) {
            await redisClient.del(sid);
          }
          console.log(6);
          req.user = undefined;
          return res.status(401).json({
            msg: "Unauthenticated.",
            clear: false,
          });
        }

        const accessId = uuidv4();
        const refreshId = uuidv4();
        const uid = crypto.randomBytes(24).toString("base64");

        const account = await prismaClient.accounts.findFirst({
          where: {
            email: refPayload.email,
          },
          select: {
            id: true,
            email: true,
            username: true,
          },
        });

        if (!account) {
          if (sid) {
            await redisClient.del(sid);
          }
          console.log(7);
          req.user = undefined;
          return res.status(401).json({
            msg: "Unauthenticated.",
            clear: false,
          });
        }

        const newAccToken = await regenToken(
          {
            role: "user",
            tokenId: accessId,
            email: refPayload.email,
            username: refPayload.username,
          },
          PRIV_KEY_PATH,
          "2m",
          120
        );

        const newRefToken = await regenToken(
          {
            role: "user",
            tokenId: refreshId,
            email: refPayload.email,
            username: refPayload.username,
          },
          PRIV_KEY_PATH,
          "5m",
          300
        );

        await signedToken(
          {
            role: "user",
            userId: account.id,
            email: account.email,
            username: account.username,
          },
          uid,
          120
        );

        res.clearCookie("access_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
        });

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
        });

        res.clearCookie("sid", {
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: true,
          signed: true,
        });

        res.cookie("access_token", newAccToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 2 * 60 * 1000,
        });

        res.cookie("refresh_token", newRefToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 5 * 60 * 1000,
        });

        res.cookie("sid", uid, {
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: true,
          signed: true,
          maxAge: 2 * 60 * 1000,
        });

        // console.log(req.cookies);
        // console.log(req.user);
        console.log("came through");
        return next();
      } catch (e: any) {
        console.log(e);
        res.clearCookie("access_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
        });

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
        });

        res.clearCookie("sid", {
          path: "/",
          sameSite: "strict",
          httpOnly: true,
          secure: true,
          signed: true,
        });

        req.user = undefined;
        if (sid) {
          await redisClient.del(sid);
        }

        console.log(8);
        return res.status(401).json({
          msg: "Unauthenticated.",
          clear: false,
        });
      }
    }
  } catch (e) {
    return next(e);
  }
};
