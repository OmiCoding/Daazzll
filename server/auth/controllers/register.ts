import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import prismaClient from "../prismaClient";
import { redisStore } from "../storageInit";
import { genToken } from "../utils/functions/auth";


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