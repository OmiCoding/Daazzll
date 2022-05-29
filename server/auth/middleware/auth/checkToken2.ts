import fs from "fs";
import util from "util";
import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../storageInit";
import { RedisAuthToken } from "../../custom-types";
import { regenToken } from "../../utils/functions/auth";
import "dotenv/config";
import { redisStore } from "../../../auth/storageInit";
import { handleSession } from "../../utils/functions/handleSession";
import prismaClient from "../../../api/prismaClient";
import { handleJWT } from "../../utils/functions";


const { HOST } = process.env;


if(!HOST) {
  throw new Error("Host is not defined.");
}


const readFile = util.promisify(fs.readFile);


export const checkToken2: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
  try {
    const publicKey = await readFile( path.resolve("server/auth/keys/jwtRS256.key.pub"),
    "binary");
    const { access_token, refresh_token } = req.cookies;
    const expiredStr = "TokenExpiredError";

    // may need to add handleSession logic
    if(!req.cookies) return res.status(401).json({ msg: "Unauthenticated." });
    if(!access_token) return res.status(401).json({ msg: "Unauthenticated." });
    if(!refresh_token) return res.status(401).json({ msg: "Unauthenicated." });

   
    try {
      // Needs proper typing
      const accPayload: any = await handleJWT(access_token, publicKey);

      if(!accPayload) {
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });
      } 

      const redisData = await redisClient.get(accPayload.tokenId);
      
      if(!redisData) {
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const tokenObj: RedisAuthToken = JSON.parse(redisData);

      if(tokenObj.token !== refresh_token) {
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const accessId = uuidv4();
      const refreshId = uuidv4();

      const newAccToken = await regenToken({
        role: "user",
        tokenId: accessId,
        email: accPayload.email,
        username: accPayload.username,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "5m",
      3000
      )

      const newRefToken = await regenToken({
        role: "user",
        tokenId: refreshId,
        email: accPayload.email,
        username: accPayload.username,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "5m",
      3000
      )

      res.clearCookie("access_token", {
        path: "/",
        sameSite: true,
        secure: true,
      })

      res.clearCookie("refresh_token", {
        path: "/",
        sameSite: true,
        secure: true,
      })

      const account = await prismaClient.accounts.findFirst({
        where: {
          email: accPayload.email,
        },
        select: {
          id: true,
          email: true,
          username: true,
        }
      })

      if(!account) {
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      await handleSession("ADD", redisStore, {
        role: "user",
        userId: account.id,
        email: accPayload.email,
        username: accPayload.username,
      });

      res.cookie("access_token", newAccToken, {
        path: "/",
        sameSite: "strict",
        secure: true,
        expires: new Date(new Date().getTime() + 5 * 60000),
      })

      res.cookie("refresh_token", newRefToken, {
        path: "/",
        sameSite: "strict",
        secure: true,
        expires: new Date(new Date().getTime() + 5 * 60000),
      })

      return res.status(200).json({ msg: "Ok" });


    } catch(e: any) {
      if(e.name !== expiredStr) {
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });
      }
      try {
        // Needs proper typing
        const refPayload: any = await handleJWT(refresh_token, publicKey); 
        
        if(!refPayload) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const redisData = await redisClient.get(refPayload.tokenId);

        if(!redisData) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." })
        }

        const tokenObj: RedisAuthToken = JSON.parse(redisData);

        if(tokenObj.token !== refresh_token) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." });
        } 

        const accessId = uuidv4();
        const refreshId = uuidv4();

        const newAccToken = await regenToken({
          role: "user",
          tokenId: accessId,
          email: refPayload.email,
          username: refPayload.username,
        },
        path.resolve("server/auth/keys/jwtRS256.key"),
        "5m",
        3000
        )

        const newRefToken = await regenToken({
          role: "user",
          tokenId: refreshId,
          email: refPayload.email,
          username: refPayload.username,
        },
        path.resolve("server/auth/keys/jwtRS256.key"),
        "5m",
        3000
        )

        res.clearCookie("access_token", {
          path: "/",
          sameSite: true,
          secure: true,
        })

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: true,
          secure: true,
        })

        const account = await prismaClient.accounts.findFirst({
          where: {
            email: refPayload.email,
          },
          select: {
            id: true,
            email: true,
            username: true,
          }
        })

        if(!account) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        await handleSession("ADD", redisStore, {
          role: "user",
          userId: account.id,
          email: refPayload.email,
          username: refPayload.username,
        });

        res.cookie("access_token", newAccToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          expires: new Date(new Date().getTime() + 5 * 60000),
        })

        res.cookie("refresh_token", newRefToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          expires: new Date(new Date().getTime() + 5 * 60000),
        })

        return res.status(200).json({ msg: "Ok" });

      } catch(e: any) {
        if(e.name !== expiredStr) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        res.clearCookie("access_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        })

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
        })
        
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });  
      }
    }
  } catch(e) {
    return next(e);
  }
}