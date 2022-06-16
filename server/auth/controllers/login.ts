<<<<<<< HEAD
=======
import crypto from "crypto";
>>>>>>> main
import path from "path";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
<<<<<<< HEAD
import { genToken } from "../utils/functions/auth";
=======

import { genToken, signedToken } from "../utils/functions/auth";
>>>>>>> main

import { redisStore } from "../storageInit";
import prismaClient from "../prismaClient";
import { handleSession } from "../utils/functions";

<<<<<<< HEAD


=======
>>>>>>> main
export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email_user, password } = req.body;
    let propName: string;

<<<<<<< HEAD
    if(/[@\.]/.test(email_user)) {
      propName = "email"
    } else {
      propName = "username"
=======
    if (/[@\.]/.test(email_user)) {
      propName = "email";
    } else {
      propName = "username";
>>>>>>> main
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

<<<<<<< HEAD
    const { username, email } = result;
=======
    const { id, username, email } = result;
>>>>>>> main

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
        tokenId: accessId,
        email: result.email,
        username: result.username,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
<<<<<<< HEAD
      "5m",
      3000
=======
      "10m",
      600
>>>>>>> main
    );

    const refreshToken = await genToken(
      {
        role: "user",
        tokenId: refreshId,
        email: result.email,
        username: result.username,
      },
      path.resolve("server/auth/keys/jwtRS256.key"),
<<<<<<< HEAD
      "5m",
      3000
=======
      "30m",
      1800
    );

    const uid = crypto.randomBytes(24).toString("base64");
    console.log(uid);

    await signedToken(
      {
        role: "user",
        userId: id,
        email: email,
        username: username,
      },
      uid,
      600
>>>>>>> main
    );

    res.cookie("access_token", accessToken, {
      path: "/",
<<<<<<< HEAD
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 5 * 60000),
      // maxAge: 60000,
=======
      secure: true,
      maxAge: 10 * 60 * 1000, // 10min
>>>>>>> main
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/",
<<<<<<< HEAD
      sameSite: "strict",
      secure: true,
      expires: new Date(new Date().getTime() + 5 * 60000),
      // maxAge: 60000,
    });

    await handleSession("ADD", redisStore, {
      role: "user",
      userId: result.id,
      email: result.email,
      username: result.username, 
=======
      secure: true,
      maxAge: 30 * 60 * 1000, // 30min
    });

    res.cookie("sid", uid, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 10 * 60 * 1000, // 10min
>>>>>>> main
    });

    return res.status(200).json({ msg: "Ok" });
  } catch (e) {
    return next(e);
  }
};
