import fs from "fs";
import util from "util";
import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { redisClient } from "../../storageInit";
import { RedisAuthToken } from "../../custom-types";
import { regenToken } from "../../utils/functions/auth";
import "dotenv/config";
import { redisStore } from "../../../auth/storageInit";
import { handleSession } from "../../utils/functions/handleSession";
<<<<<<< HEAD
import prismaClient from "../../../api/prismaClient";

const { HOST } = process.env;

if(!HOST) {
  throw new Error("Host is not defined.");
}


const readFile = util.promisify(fs.readFile);



=======
import prismaClient from "../../prismaClient";

const { HOST } = process.env;

if (!HOST) {
  throw new Error("Host is not defined.");
}

const readFile = util.promisify(fs.readFile);

>>>>>>> main
export const checkToken: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
<<<<<<< HEAD

=======
>>>>>>> main
    const publicKey = await readFile(
      path.resolve("server/auth/keys/jwtRS256.key.pub"),
      "binary"
    );

    if (req.cookies) {
      if (req.cookies.access_token) {
        jwt.verify(
          req.cookies.access_token,
          publicKey,
          {
            algorithms: ["RS256"],
          },
          async function (e, decoded) {
            const payload: any = decoded;
            if (e) {
              if (e.name === "TokenExpiredError") {
                await jwt.verify(
                  req.cookies.refresh_token,
<<<<<<< HEAD
                  publicKey, 
=======
                  publicKey,
>>>>>>> main
                  {
                    algorithms: ["RS256"],
                  },
                  async function (e, decoded) {
                    const payload: any = decoded;

<<<<<<< HEAD
                    if (e) { 
=======
                    if (e) {
>>>>>>> main
                      if (e.name === "TokenExpiredError") {
                        res.clearCookie("refresh_token", {
                          path: "/",
                          sameSite: "strict",
                          secure: true,
                        });
                        res.clearCookie("access_token", {
                          path: "/",
                          sameSite: "strict",
                          secure: true,
                        });

                        await handleSession("DELETE", redisStore);

<<<<<<< HEAD
                        return res.status(401).json({ msg: "Unauthenticated." });
                      } 
                      else {
                        return res.status(401).json({ msg: "Unauthenticated." });
=======
                        return res
                          .status(401)
                          .json({ msg: "Unauthenticated." });
                      } else {
                        return res
                          .status(401)
                          .json({ msg: "Unauthenticated." });
>>>>>>> main
                      }
                    }

                    if (!decoded) {
                      await handleSession("DELETE", redisStore);

<<<<<<< HEAD
                      return res.status(401).json({ msg: "Unauthenticated." })
=======
                      return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
                    }

                    let prop: string;
                    if (payload.username) {
                      prop = "username";
                    } else {
                      prop = "email";
                    }

                    const result: any = await redisClient.get(payload.tokenId);

                    if (!result) {
                      await handleSession("DELETE", redisStore);

                      return res.status(401).json({ msg: "Unauthenticated." });
                    }

                    const tokenObj: RedisAuthToken = JSON.parse(result);

                    if (tokenObj.token !== req.cookies.refresh_token) {
<<<<<<< HEAD

=======
>>>>>>> main
                      await handleSession("DELETE", redisStore);

                      return res.status(401).json({ msg: "Unauthenticated." });
                    } else {
                      const accessId = uuidv4();
                      const refreshId = uuidv4();

                      const accessToken = await regenToken(
                        {
                          role: "user",
                          tokenId: accessId,
                          email: payload.email,
<<<<<<< HEAD
                          username: payload.username
=======
                          username: payload.username,
>>>>>>> main
                        },
                        path.resolve("server/auth/keys/jwtRS256.key"),
                        "10m",
                        600
                      );

                      const refreshToken = await regenToken(
                        {
                          role: "user",
                          tokenId: refreshId,
                          email: payload.email,
                          username: payload.username,
                        },
                        path.resolve("server/auth/keys/jwtRS256.key"),
                        "30m",
                        1800
                      );

                      res.clearCookie("refresh_token", {
                        path: "/",
                        sameSite: "strict",
                        secure: true,
                      });

                      res.clearCookie("access_token", {
                        path: "/",
                        sameSite: "strict",
                        secure: true,
                      });

                      res.cookie("refresh_token", refreshToken, {
                        path: "/",
                        sameSite: "strict",
                        secure: true,
                        expires: new Date(new Date().getTime() + 3 * 60000),
                        // maxAge: 60000,
                      });

                      res.cookie("access_token", accessToken, {
                        path: "/",
                        sameSite: "strict",
                        secure: true,
                        expires: new Date(new Date().getTime() + 3 * 60000),
                        // maxAge: 60000,
                      });

                      const account = await prismaClient.accounts.findFirst({
                        where: {
                          email: payload.email,
                        },
                        select: {
                          id: true,
                          email: true,
<<<<<<< HEAD
                          username: true
                        }
                      })
      
                      if(!account) {
=======
                          username: true,
                        },
                      });

                      if (!account) {
>>>>>>> main
                        res.clearCookie("accessToken", {
                          path: "/",
                          sameSite: "strict",
                          secure: true,
<<<<<<< HEAD
                        })
      
=======
                        });

>>>>>>> main
                        res.clearCookie("refreshToken", {
                          path: "/",
                          sameSite: "strict",
                          secure: true,
<<<<<<< HEAD
                        })
      
                        await redisClient.del(payload.tokenId);
      
                        await handleSession("DELETE", redisStore);
      
                        return res.status(401).json({ msg: "Unauthenticated" })
=======
                        });

                        await redisClient.del(payload.tokenId);

                        await handleSession("DELETE", redisStore);

                        return res.status(401).json({ msg: "Unauthenticated" });
>>>>>>> main
                      }

                      await handleSession("ADD", redisStore, {
                        role: "user",
<<<<<<< HEAD
                        userId: ""+account.id,
                        email: account.email,
                        username: account.username,
                      })
=======
                        userId: "" + account.id,
                        email: account.email,
                        username: account.username,
                      });
>>>>>>> main

                      return next();
                    }
                  }
                );
<<<<<<< HEAD
              } 
              else {
=======
              } else {
>>>>>>> main
                return res.status(401).json({ msg: "Unauthenticated." });
              }
            } else {
              const result: any = await redisClient.get(payload.tokenId);
              if (!result) {
<<<<<<< HEAD

=======
>>>>>>> main
                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." });
              }

              const tokenObj = JSON.parse(result);
<<<<<<< HEAD
              // If 
              if (tokenObj.token !== req.cookies.access_token) {

                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." })
              } else {

=======
              // If
              if (tokenObj.token !== req.cookies.access_token) {
                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." });
              } else {
>>>>>>> main
                // maybe put a handleSession here
                return next();
              }
            }
          }
        );
      } else {
        if (req.cookies.refresh_token) {
          const item: any = jwt.decode(req.cookies.refresh_token);
          jwt.verify(
            req.cookies.refresh_token,
            publicKey,
            {
              algorithms: ["RS256"],
            },
            async function (e, decoded) {
              const payload: any = decoded;
              if (e) {
                if (e.name === "TokenExpiredError") {
                  res.clearCookie("refresh_token", {
                    path: "/",
                    sameSite: "strict",
                    secure: true,
                  });
                  res.clearCookie("access_token", {
                    path: "/",
                    sameSite: "strict",
                    secure: true,
                  });

                  await handleSession("DELETE", redisStore);

<<<<<<< HEAD
                  return res.status(401).json({ msg: "Unauthenticated." })
                } else {
                  return res.status(401).json({ msg: "Unauthenticated." })
=======
                  return res.status(401).json({ msg: "Unauthenticated." });
                } else {
                  return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
                }
              }

              if (!decoded) {
<<<<<<< HEAD

                await handleSession("DELETE", redisStore)

                return res.status(401).json({ msg: "Unauthenticated." })
=======
                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
              }

              let prop: string;
              if (payload.username) {
                prop = "username";
              } else {
                prop = "email";
              }

              const result: any = await redisClient.get(payload.tokenId);

              if (!result) {
<<<<<<< HEAD

                await handleSession("DELETE", redisStore)

                return res.status(401).json({ msg: "Unauthenticated." })
=======
                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
              }

              const tokenObj: RedisAuthToken = JSON.parse(result);

              if (tokenObj.token !== req.cookies.refresh_token) {
<<<<<<< HEAD

                await handleSession("DELETE", redisStore)

                return res.status(401).json({ msg: "Unauthenticated." })
=======
                await handleSession("DELETE", redisStore);

                return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
              } else {
                const accessId = uuidv4();
                const refreshId = uuidv4();

                const accessToken = await regenToken(
                  {
                    role: "user",
                    tokenId: accessId,
                    email: payload.email,
                    username: payload.username,
                  },
                  path.resolve("server/auth/keys/jwtRS256.key"),
                  "10m",
                  600
                );

                const refreshToken = await regenToken(
                  {
                    role: "user",
                    tokenId: refreshId,
                    email: payload.email,
                    username: payload.username,
                  },
                  path.resolve("server/auth/keys/jwtRS256.key"),
                  "30m",
                  1800
                );

                res.clearCookie("refresh_token", {
                  path: "/",
                  sameSite: "strict",
                  secure: true,
                });

                res.clearCookie("access_token", {
                  path: "/",
                  sameSite: "strict",
                  secure: true,
                });

                res.cookie("refresh_token", refreshToken, {
                  path: "/",
                  sameSite: "strict",
                  secure: true,
                  expires: new Date(new Date().getTime() + 3 * 60000),
                  // maxAge: 60000,
                });

                res.cookie("access_token", accessToken, {
                  path: "/",
                  sameSite: "strict",
                  secure: true,
                  expires: new Date(new Date().getTime() + 3 * 60000),
                  // maxAge: 60000,
                });

                const account = await prismaClient.accounts.findFirst({
                  where: {
                    email: payload.email,
                  },
                  select: {
                    id: true,
                    email: true,
<<<<<<< HEAD
                    username: true
                  }
                })

                if(!account) {
=======
                    username: true,
                  },
                });

                if (!account) {
>>>>>>> main
                  res.clearCookie("accessToken", {
                    path: "/",
                    sameSite: "strict",
                    secure: true,
<<<<<<< HEAD
                  })
=======
                  });
>>>>>>> main

                  res.clearCookie("refreshToken", {
                    path: "/",
                    sameSite: "strict",
                    secure: true,
<<<<<<< HEAD
                  })

                  await redisClient.del(payload.tokenId);

                  await handleSession("DELETE", redisStore)

                  return res.status(401).json({ msg: "Unauthenticated" })
=======
                  });

                  await redisClient.del(payload.tokenId);

                  await handleSession("DELETE", redisStore);

                  return res.status(401).json({ msg: "Unauthenticated" });
>>>>>>> main
                }

                await handleSession("ADD", redisStore, {
                  role: "user",
<<<<<<< HEAD
                  userId: ""+account.id,
                  email: account.email,
                  username: account.username,
                })
=======
                  userId: account.id,
                  email: account.email,
                  username: account.username,
                });
>>>>>>> main

                return next();
              }
            }
          );
        } else {
<<<<<<< HEAD
          return res.status(401).json({ msg: "Unauthenticated." })
=======
          return res.status(401).json({ msg: "Unauthenticated." });
>>>>>>> main
        }
      }
    } else {
      return res.status(401).json({ msg: "Unauthenticated." });
    }
  } catch (e) {
    return next(e);
  }
};
