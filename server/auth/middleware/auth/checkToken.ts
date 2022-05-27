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

const { HOST } = process.env;

if(!HOST) {
  throw new Error("Host is not defined.");
}


const readFile = util.promisify(fs.readFile);

const checkToken: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.user)

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
              // console.log(req.cookies.access_token);
              // This is the acess_token Error
              if (e.name === "TokenExpiredError") {
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

                        req.user = undefined;

                        console.log("hello???")

                        return res.status(401).json({ msg: "Unauthenticated." });
                      } 
                      else {
                        return res.status(401).json({ msg: "Unauthenticated." });
                      }
                    }

                    console.log("hello?")
                    if (!decoded) {
                      return res.status(401).json({ msg: "Unauthenticated." })
                    }

                    let prop: string;
                    if (payload.username) {
                      prop = "username";
                    } else {
                      prop = "email";
                    }

                    const result: any = await redisClient.get(payload.userId);

                    if (!result) {
                      return res.status(401).json({ msg: "Unauthenticated." });
                    }

                    const tokenObj: RedisAuthToken = JSON.parse(result);

                    if (tokenObj.token !== req.cookies.refresh_token) {
                      return res.status(401).json({ msg: "Unauthenticated." });
                    } else {
                      const accessId = uuidv4();
                      const refreshId = uuidv4();

                      const accessToken = await regenToken(
                        {
                          role: "user",
                          userId: accessId,
                          [prop]:
                            prop === "username"
                              ? payload.username
                              : payload.email,
                        },
                        path.resolve("server/auth/keys/jwtRS256.key"),
                        "10m",
                        600
                      );

                      const refreshToken = await regenToken(
                        {
                          role: "user",
                          userId: refreshId,
                          [prop]:
                            prop === "username"
                              ? payload.username
                              : payload.email,
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

                      req.user = undefined;

                      req.user = {
                        role: "user",
                        userId: refreshId,
                        [prop]:
                          prop === "username"
                            ? payload.username
                            : payload.email,
                      };

                      return next();
                    }
                  }
                );
              } 
              else {
                return res.status(401).json({ msg: "Unauthenticated." });
              }
            } else {
              const result: any = await redisClient.get(payload.userId);
              if (!result) {
                return res.status(401).json({ msg: "Unauthenticated." });
              }

              const tokenObj = JSON.parse(result);
              // If 
              if (tokenObj.token !== req.cookies.access_token) {
                return res.status(401).json({ msg: "Unauthenticated." })
              } else {
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

                  req.user = undefined;

                  return res.status(401).json({ msg: "Unauthenticated." })
                } else {
                  return res.status(401).json({ msg: "Unauthenticated." })
                }
              }

              if (!decoded) {
                return res.status(401).json({ msg: "Unauthenticated." })
              }

              let prop: string;
              if (payload.username) {
                prop = "username";
              } else {
                prop = "email";
              }

              const result: any = await redisClient.get(payload.userId);

              if (!result) {
                return res.status(401).json({ msg: "Unauthenticated." })
              }

              const tokenObj: RedisAuthToken = JSON.parse(result);

              if (tokenObj.token !== req.cookies.refresh_token) {
                return res.status(401).json({ msg: "Unauthenticated." })
              } else {
                const accessId = uuidv4();
                const refreshId = uuidv4();

                const accessToken = await regenToken(
                  {
                    role: "user",
                    userId: accessId,
                    [prop]:
                      prop === "username" ? payload.username : payload.email,
                  },
                  path.resolve("server/auth/keys/jwtRS256.key"),
                  "10m",
                  600
                );

                const refreshToken = await regenToken(
                  {
                    role: "user",
                    userId: refreshId,
                    [prop]:
                      prop === "username" ? payload.username : payload.email,
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

                req.user = undefined;

                req.user = {
                  role: "user",
                  userId: refreshId,
                  [prop]:
                    prop === "username" ? payload.username : payload.email,
                };

                return next();
              }
            }
          );
        } else {
          return res.status(401).json({ msg: "Unauthenticated." })
        }
      }
    } else {
      return res.status(401).json({ msg: "Unauthenticated." });
    }
  } catch (e) {
    return next(e);
  }
};

export default checkToken;
