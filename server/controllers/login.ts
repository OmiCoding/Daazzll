import crypto from "crypto";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { genToken, signedToken } from "../utils/functions/auth";
import prismaClient from "../prismaClient";
import { PRIV_KEY_PATH } from "../serverConfig";

export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email_user, password } = req.body;
    let propName: string;

    if (/[@\.]/.test(email_user)) {
      propName = "email";
    } else {
      propName = "username";
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

    const { id, username, email } = result;

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
      PRIV_KEY_PATH,
      "10m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        tokenId: refreshId,
        email: result.email,
        username: result.username,
      },
      PRIV_KEY_PATH,
      "30m",
      1800
    );

    const uid = crypto.randomBytes(24).toString("base64");

    await signedToken(
      {
        role: "user",
        userId: id,
        email: email,
        username: username,
      },
      uid,
      600
    );

    res.cookie("access_token", accessToken, {
      path: "/",
      secure: true,
      maxAge: 10 * 60 * 1000, // 10min
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/",
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
    });

    return res.status(200).json({ msg: "Ok" });
  } catch (e) {
    return next(e);
  }
};
