import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { genToken } from "../utils/functions/auth";

import { redisStore } from "../storageInit";
import prismaClient from "../prismaClient";



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
