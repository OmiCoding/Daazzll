import { Request, Response, NextFunction, RequestHandler } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { genToken } from "../utils/functions/auth";
import { RedisStore, redisClient } from "../storageInit";
import "dotenv/config";

const prismaClient = new PrismaClient();
const redisStore = new RedisStore({ client: redisClient, prefix: "sess1:" });

const { HOST } = process.env;

if(!HOST) {
  throw new Error("Host environment is undefined.")
}

export const deleteUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.delete({
      where: {
        id: acc.id,
      },
    });

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

    req.user = undefined;

    return res.status(200).json({
      msg: "Ok"
    })
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email_user, password } = req.body;
    let propName: string;

    if(/[@\.]/.test(email_user)) {
      propName = "email"
    } else {
      propName = "username"
    }

    const result: any = await prismaClient.accounts.findFirst({
      where: {
        [propName]: email_user,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!result) {
      return res.status(400).json({
        msg: `No account found with that ${propName}`,
      });
    }

    const { username, email } = result;

    const verify = await compare(password, result.pass);

    if (!verify) {
      return res.status(400).json({
        msg: "Invalid password.",
      });
    }

    const accessId = uuidv4();
    const refreshId = uuidv4();

    const accessToken = await genToken(
      {
        role: "user",
        userId: accessId,
        [propName]: email_user,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "3m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        userId: refreshId,
        [propName]: email_user,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "3m",
      1800
    );

    res.cookie("access_token", accessToken, {
      path: "/",
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 3 * 60000),
      // maxAge: 60000,
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/",
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 3 * 60000),
      // maxAge: 60000,
    });

    if(redisStore.all) {
      redisStore.all(function(err, sessions: any) {
        if(err) {
          console.error(err);
          return res.status(500).json({ msg: "Something has gone wrong..." });
        }

        if(sessions) {
          const session = sessions[0];
          session.user = {
            role: "user",
            email: email,
            username: username,
            userId: result.id,
          }

          // must make a variable to store the session id
          const sessionId = session.id;
          redisStore.set(sessionId, session, function(err) {
            if(err){
              console.error(err);
              return res.status(500).json({ msg: "Something has gone wrong..." })
            }
            return res.status(200).json({
              msg: "Ok",
            })
          })

        } else {
          console.error("No session was found...");
          return res.status(500).json({
            msg: "Something has gone wrong..."
          })
        }
      })
    } else {
      console.error("The redis store all method is undefined...");
      return res.status(500).json({
        msg: "Something has gone wrong..."
      })
    }
  } catch (e) {
    return next(e);
  }
};

export const logout: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.cookies) {
      if (req.cookies.access_token) {
        res.clearCookie("access_token", {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }
      if (req.cookies.refresh_token) {
        res.clearCookie("refresh_token", {
          path: "/",
          secure: true,
          sameSite: "strict",
        });
      }

      req.user = undefined;

      return res.status(200).json({
        msg: "Ok"
      });
    } else {
      req.user = undefined;
      return res.status(200).json({
        msg: "Ok"
      });
    }
  } catch (e) {
    return next(e);
  }
};

export const register: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, fName, lName, password } = req.body;

    const accessId = uuidv4();
    const refreshId = uuidv4();

    const foundAcc = await prismaClient.accounts.findUnique({
      where: {
        email_username: {
          username: username,
          email: email,
        }
      }
    });

    if (foundAcc) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const hashedPass = await hash(password, 10);

    const result = await prismaClient.accounts.create({
      data: {
        role: "user",
        fName,
        lName,
        username,
        email,
        pass: hashedPass,
      }, 
      select: {
        id: true,
      }
    });


    const accessToken = await genToken(
      {
        role: "user",
        userId: accessId,
        email: email,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "10m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        userId: refreshId,
        email: email,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
      "30d",
      1800
    );

    if (!accessToken || !refreshToken)
      return res.status(400).json({ msg: "Bad request." });

    res.cookie("access_token", accessToken, {
      path: "/",
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 3 * 60000),
    });
    res.cookie("refresh_token", refreshToken, {
      path: "/",
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 3 * 60000),
    });

    if(redisStore.all) {
      // Implement the correct typing for this
      redisStore.all(function(err, sessions: any) {
        if(err){
          console.error(err);
          return res.status(500).json({ msg: "Something has gone wrong..." })
        }
        if(sessions) {
          const session = sessions[0]

          session.user = {
            role: "user",
            email: email,
            username: username,
            userId: result.id, 
          }

          
          const sessionId = session.id;

          redisStore.set(sessionId, session, function(err) {
            if(err){
              console.error(err);
              return res.status(500).json({ msg: "Something has gone wrong..." })
            }

            return res.status(200).json({
              msg: "Ok"
            })
          })
        } else {
          console.error("No session was found...");
          return res.status(500).json({
            msg: "Something has gone wrong..."
          })
        }
      })
    } else {
      console.error("The redis store all method is undefined...");
      return res.status(500).json({
        msg: "Something has gone wrong..."
      })
    }


    return res.status(200).json({
      msg: "Ok"
    })
  } catch (e) {
    return next(e);
  }
};

export const setToken: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({
      msg: "Ok",
    });
  } catch (e) {
    return next(e);
  }
};

export const updateUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fName, lName, username, email, password } = req.body;

    const updateObj: any = {};

    if (fName) {
      updateObj.fName = fName;
    }
    if (lName) {
      updateObj.lName = lName;
    }
    if (username) {
      updateObj.username = username;
    }

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.update({
      where: {
        email_username: {
          email: acc.email,
          username: acc.username,
        },
      },
      data: {
        ...updateObj,
      },
    });

    return res.status(200).json({
      msg: "User successfully updated.",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const checkAuth: RequestHandler = async function(req: Request, res: Response, next: NextFunction) {
  try {
    if(redisStore)
    return res.status(200).json({
      msg: "Ok."
    })
  } catch(e) {
    console.log(e);
    next(e);
  }
}