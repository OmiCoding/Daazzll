<<<<<<< HEAD
=======
import crypto from "crypto";
>>>>>>> main
import fs from "fs";
import util from "util";
import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../storageInit";
import { RedisAuthToken } from "../../custom-types";
<<<<<<< HEAD
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
    if(!refresh_token) return res.status(401).json({ msg: "Unauthenticated." });

    console.log("hello?")
=======
import { regenToken, signedToken } from "../../utils/functions/auth";
import "dotenv/config";
import { redisStore } from "../../../auth/storageInit";
import { handleSession } from "../../utils/functions/handleSession";
import prismaClient from "../../prismaClient";
import { handleJWT } from "../../utils/functions";

const { HOST } = process.env;

if (!HOST) {
  throw new Error("Host is not defined.");
}

const readFile = util.promisify(fs.readFile);

export const checkToken2: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const publicKey = await readFile(
      path.resolve("server/auth/keys/jwtRS256.key.pub"),
      "binary"
    );

    const { access_token, refresh_token } = req.cookies;
    const { sid } = req.signedCookies;
    const expiredStr = "TokenExpiredError";
    if (!req.cookies || !access_token || !refresh_token || !sid) {
      return res.status(401).json({ msg: "Unauthenticated." });
    }

>>>>>>> main
    try {
      // Needs proper typing

      const accPayload: any = await handleJWT(access_token, publicKey);

<<<<<<< HEAD

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
        console.log(e.name)
        await handleSession("DELETE", redisStore);
=======
      if (!accPayload) {
        console.log(1);
        await redisClient.del(sid);
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const redisData = await redisClient.GET(accPayload.tokenId);

      if (!redisData) {
        console.log(2);
        await redisClient.del(sid);
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }

      const tokenObj: RedisAuthToken = JSON.parse(redisData);

      if (tokenObj.token !== access_token) {
        console.log(3);
        await redisClient.del(sid);
        req.user = undefined;
        return res.status(401).json({ msg: "Unauthenticated." });
      }
      return next();

      // const accessId = uuidv4();
      // const refreshId = uuidv4();

      // const newAccToken = await regenToken({
      //   role: "user",
      //   tokenId: accessId,
      //   email: accPayload.email,
      //   username: accPayload.username,
      // },
      // path.resolve("server/auth/keys/jwtRS256.key"),
      // "5m",
      // 3000
      // )

      // const newRefToken = await regenToken({
      //   role: "user",
      //   tokenId: refreshId,
      //   email: accPayload.email,
      //   username: accPayload.username,
      // },
      // path.resolve("server/auth/keys/jwtRS256.key"),
      // "5m",
      // 3000
      // )

      // res.clearCookie("access_token", {
      //   path: "/",
      //   sameSite: true,
      //   secure: true,
      // })

      // res.clearCookie("refresh_token", {
      //   path: "/",
      //   sameSite: true,
      //   secure: true,
      // })

      // const account = await prismaClient.accounts.findFirst({
      //   where: {
      //     email: accPayload.email,
      //   },
      //   select: {
      //     id: true,
      //     email: true,
      //     username: true,
      //   }
      // })

      // if(!account) {
      //   await handleSession("DELETE", redisStore);
      //   return res.status(401).json({ msg: "Unauthenticated." });
      // }

      // await handleSession("ADD", redisStore, {
      //   role: "user",
      //   userId: account.id,
      //   email: accPayload.email,
      //   username: accPayload.username,
      // });

      // res.cookie("access_token", newAccToken, {
      //   path: "/",
      //   sameSite: "strict",
      //   secure: true,
      //   expires: new Date(new Date().getTime() + 5 * 60000),
      // })

      // res.cookie("refresh_token", newRefToken, {
      //   path: "/",
      //   sameSite: "strict",
      //   secure: true,
      //   expires: new Date(new Date().getTime() + 5 * 60000),
      // })

      // return res.status(200).json({ msg: "Ok" });
    } catch (e: any) {
      if (e.name !== expiredStr) {
        await redisClient.del(sid);
        req.user = undefined;
>>>>>>> main
        return res.status(401).json({ msg: "Unauthenticated." });
      }
      try {
        // Needs proper typing
<<<<<<< HEAD
        const refPayload: any = await handleJWT(refresh_token, publicKey); 
        
        if(!refPayload) {
          await handleSession("DELETE", redisStore);
=======
        const refPayload: any = await handleJWT(refresh_token, publicKey);

        if (!refPayload) {
          await redisClient.del(sid);
          req.user = undefined;
>>>>>>> main
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const redisData = await redisClient.get(refPayload.tokenId);

<<<<<<< HEAD
        if(!redisData) {
          await handleSession("DELETE", redisStore);
          return res.status(401).json({ msg: "Unauthenticated." })
=======
        if (!redisData) {
          await redisClient.del(sid);
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
        }

        const tokenObj: RedisAuthToken = JSON.parse(redisData);

<<<<<<< HEAD
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
=======
        if (tokenObj.token !== refresh_token) {
          await redisClient.del(sid);
          req.user = undefined;
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        const accessId = uuidv4();
        const refreshId = uuidv4();
        const uid = crypto.randomBytes(24).toString("base64");
>>>>>>> main

        const account = await prismaClient.accounts.findFirst({
          where: {
            email: refPayload.email,
          },
          select: {
            id: true,
            email: true,
            username: true,
<<<<<<< HEAD
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
=======
          },
        });

        if (!account) {
          await redisClient.del(sid);
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
          path.resolve("server/auth/keys/jwtRS256.key"),
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
          path.resolve("server/auth/keys/jwtRS256.key"),
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
>>>>>>> main
        });

        res.cookie("access_token", newAccToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          expires: new Date(new Date().getTime() + 5 * 60000),
<<<<<<< HEAD
        })
=======
        });
>>>>>>> main

        res.cookie("refresh_token", newRefToken, {
          path: "/",
          sameSite: "strict",
          secure: true,
          expires: new Date(new Date().getTime() + 5 * 60000),
<<<<<<< HEAD
        })

        return res.status(200).json({ msg: "Ok" });

      } catch(e: any) {
        if(e.name !== expiredStr) {
          await handleSession("DELETE", redisStore);
=======
        });

        res.cookie("sid", uid, {
          path: "/",
          sameSite: true,
          secure: true,
          signed: true,
          maxAge: 600,
        });

        return res.status(200).json({ msg: "Ok" });
      } catch (e: any) {
        if (e.name !== expiredStr) {
          await redisClient.del(sid);
          req.user = undefined;
>>>>>>> main
          return res.status(401).json({ msg: "Unauthenticated." });
        }

        res.clearCookie("access_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
<<<<<<< HEAD
        })
=======
        });
>>>>>>> main

        res.clearCookie("refresh_token", {
          path: "/",
          sameSite: "strict",
          secure: true,
          httpOnly: true,
<<<<<<< HEAD
        })
        
        await handleSession("DELETE", redisStore);
        return res.status(401).json({ msg: "Unauthenticated." });  
      }
    }
  } catch(e) {
    return next(e);
  }
}
=======
        });

        res.clearCookie("sid", {
          path: "/",
          sameSite: true,
          httpOnly: true,
          secure: true,
          signed: true,
        });

        await redisClient.del(sid);
        req.user = undefined;

        return res.status(401).json({ msg: "Unauthenticated." });
      }
    }
  } catch (e) {
    return next(e);
  }
};
>>>>>>> main
