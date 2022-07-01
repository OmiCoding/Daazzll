import crypto from "crypto";
import fs from "fs";
import util from "util";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../storageInit";
import { RedisAuthToken } from "../../custome-types";
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
      // Needs proper typing

      const accPayload: any = await handleJWT(access_token, publicKey);

      if (!accPayload) {
        console.log(1);
        if (sid) {
          await redisClient.del(sid);
        }
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const redisData = await redisClient.GET(accPayload.tokenId);

      if (!redisData) {
        console.log(2);
        if (sid) {
          await redisClient.del(sid);
        }
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const tokenObj: RedisAuthToken = JSON.parse(redisData);

      if (tokenObj.token !== access_token) {
        console.log(3);
        if (sid) {
          await redisClient.del(sid);
        }
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }
      return next();
    } catch (e: any) {
      /* 
        Handling Refresh Tokens 
      
      */
      try {
        // Needs proper typing
        const refPayload: any = await handleJWT(refresh_token, publicKey);

        if (!refPayload) {
          console.log("refresh 2");
          if (sid) {
            await redisClient.del(sid);
          }
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const redisData = await redisClient.get(refPayload.tokenId);

        if (!redisData) {
          console.log("refresh 3");
          if (sid) {
            await redisClient.del(sid);
          }
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const tokenObj: RedisAuthToken = JSON.parse(redisData);

        if (tokenObj.token !== refresh_token) {
          console.log("refresh 4");
          if (sid) {
            await redisClient.del(sid);
          }
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
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
          console.log("refresh 5");
          if (sid) {
            await redisClient.del(sid);
          }
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const newAccToken = await regenToken(
          {
            role: "user",
            tokenId: accessId,
            email: refPayload.email,
            username: refPayload.username,
          },
          PRIV_KEY_PATH,
          "5m",
          3000
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
          3000
        );

        await signedToken(
          {
            role: "user",
            userId: account.id,
            email: account.email,
            username: account.username,
          },
          uid,
          600
        );

        res.clearCookie("access_token", {
          path: "/",
          sameSite: true,
          secure: true,
        });

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: true,
          secure: true,
        });

        res.clearCookie("sid", {
          path: "/",
          sameSite: true,
          httpOnly: true,
          secure: true,
          signed: true,
        });

        res.cookie("access_token", newAccToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 10 * 60 * 1000,
        });

        res.cookie("refresh_token", newRefToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 30 * 60 * 1000,
        });

        res.cookie("sid", uid, {
          path: "/",
          sameSite: true,
          httpOnly: true,
          secure: true,
          signed: true,
          maxAge: 10 * 60 * 1000,
        });

        console.log("passed.");

        return res.status(200).json({ msg: "Ok" });
      } catch (e: any) {
        console.log(e);
        console.log(req.cookies);
        res.clearCookie("access_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        });

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        });

        res.clearCookie("sid", {
          path: "/",
          sameSite: true,
          httpOnly: true,
          secure: true,
          signed: true,
        });

        if (sid) {
          await redisClient.del(sid);
        }
        req.user = undefined;

        console.log("failed.");

        return res.status(401).json({ msg: "Unauthenticated." });
      }
    }
  } catch (e) {
    return next(e);
  }
};
